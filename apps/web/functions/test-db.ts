/**
 * Test Database Connection
 * Simple endpoint to verify Neon database is working
 */

import { getDb } from '../src/lib/db-client';

export const handler = async () => {
  try {
    const db = getDb();
    
    // Test simple query
    const result = await db`SELECT NOW() as current_time, version() as pg_version`;
    
    // Count products
    const productCount = await db`SELECT COUNT(*) as count FROM products`;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'connected',
        database: 'Neon PostgreSQL',
        current_time: result[0].current_time,
        pg_version: result[0].pg_version,
        products_count: productCount[0].count,
      }),
    };
  } catch (error) {
    console.error('Database connection error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'error',
        message: errorMessage,
      }),
    };
  }
};

export const config = {
  path: '/api/test-db',
  method: 'GET',
};
