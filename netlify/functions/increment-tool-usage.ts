/**
 * Increment Tool Usage Function
 * Increments the usage counter for a tool
 */

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

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
    const { toolName, userId } = JSON.parse(event.body || '{}');

    if (!toolName || !userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Tool name and user ID are required' }),
      };
    }

    // Get user tier
    const userResult = await sql`
      SELECT tier FROM users WHERE id = ${userId}
    `;

    if (userResult.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    const user = userResult[0];

    // Premium users don't need tracking
    if (user.tier === 'pro' || user.tier === 'elite') {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, tracked: false }),
      };
    }

    // Increment usage using the SQL function
    const result = await sql`
      SELECT increment_tool_usage(${userId}::uuid, ${toolName}) as count
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        tracked: true,
        newCount: result[0].count,
      }),
    };
  } catch (error) {
    console.error('Usage increment error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to increment usage',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
