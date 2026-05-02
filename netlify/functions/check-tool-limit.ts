/**
 * Check Tool Limit Function
 * Checks if user has reached daily usage limit for a tool
 */

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

const FREE_DAILY_LIMITS: Record<string, number> = {
  'sensitivity-converter': 10,
  'loadout-optimizer': 5,
  'stats-dashboard': 3,
  'drop-location-analyzer': 5,
  'build-trainer': 10,
  'meta-predictor': 1,
  'rotation-planner': 1,
  'keybind-optimizer': 3,
};

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

    // Premium users have unlimited access
    if (user.tier === 'pro' || user.tier === 'elite') {
      return {
        statusCode: 200,
        body: JSON.stringify({
          hasReachedLimit: false,
          remaining: Infinity,
          dailyLimit: Infinity,
        }),
      };
    }

    // Get daily limit for tool
    const dailyLimit = FREE_DAILY_LIMITS[toolName] || 3;

    // Get current usage
    const usageResult = await sql`
      SELECT COALESCE(usage_count, 0) as count
      FROM tool_usage
      WHERE user_id = ${userId}
      AND tool_name = ${toolName}
      AND usage_date = CURRENT_DATE
    `;

    const currentUsage = usageResult.length > 0 ? usageResult[0].count : 0;
    const remaining = dailyLimit - currentUsage;

    return {
      statusCode: 200,
      body: JSON.stringify({
        hasReachedLimit: currentUsage >= dailyLimit,
        remaining,
        dailyLimit,
        currentUsage,
      }),
    };
  } catch (error) {
    console.error('Limit check error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to check limit',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
