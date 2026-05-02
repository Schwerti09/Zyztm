/**
 * Auth Validate Function
 * Validates a JWT token and returns user data
 */

import { neon } from '@neondatabase/serverless';
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
  const authHeader = event.headers.authorization || event.headers.Authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
    };
  }

  const token = authHeader.substring(7);

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };

    // Fetch user data
    const result = await sql`
      SELECT id, email, username, tier, created_at
      FROM users
      WHERE id = ${decoded.userId}
    `;

    if (result.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    const user = result[0];

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: user.id,
        email: user.email,
        username: user.username,
        tier: user.tier,
        createdAt: user.created_at,
      }),
    };
  } catch (error) {
    console.error('Token validation error:', error);
    return {
      statusCode: 401,
      body: JSON.stringify({ 
        error: 'Invalid token',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
