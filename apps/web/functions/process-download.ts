/**
 * Process Download Request
 * Verifies token and returns signed download URL
 * 
 * Endpoint: POST /.netlify/functions/process-download
 * Body: { orderId: string, token: string }
 */

import type { Handler, HandlerEvent } from '@netlify/functions';
import { processDownload } from '../src/lib/order-service';

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { orderId, token } = body;

    if (!orderId || !token) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Fehlende Parameter',
          errorCode: 'INVALID_TOKEN',
        }),
      };
    }

    // Get IP address (anonymized)
    const ipAddress = event.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                      event.headers['client-ip'] || 
                      undefined;
    const userAgent = event.headers['user-agent'] || undefined;

    const result = await processDownload({
      orderId,
      token,
      ipAddress,
      userAgent,
    });

    return {
      statusCode: result.success ? 200 : 403,
      headers,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error('Process download error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: err instanceof Error ? err.message : 'Internal server error' 
      }),
    };
  }
};
