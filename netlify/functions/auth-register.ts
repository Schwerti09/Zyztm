/**
 * Auth Register Function
 * Registers a new user and returns a JWT token
 */

import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const sql = neon(process.env.DATABASE_URL!);
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface HandlerEvent {
  headers: Record<string, string>;
  httpMethod: string;
  body?: string;
}

interface HandlerResponse {
  statusCode: number;
  body: string;
  headers?: Record<string, string>;
}

export const handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, password, username } = JSON.parse(event.body || '{}');

    if (!email || !password || !username) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email, password, and username are required' }),
      };
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email} OR username = ${username}
    `;

    if (existingUser.length > 0) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: 'User already exists' }),
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await sql`
      INSERT INTO users (email, password, username, tier)
      VALUES (${email}, ${hashedPassword}, ${username}, 'free')
      RETURNING id, email, username, tier, created_at
    `;

    const user = result[0];

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      statusCode: 201,
      body: JSON.stringify({
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          tier: user.tier,
          createdAt: user.created_at,
        },
      }),
    };
  } catch (error) {
    console.error('Register error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Registration failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
