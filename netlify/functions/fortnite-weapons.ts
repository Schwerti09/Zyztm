/**
 * Fortnite Weapons API
 * 
 * Fetches current weapon data from Fortnite API
 * Used for Weapon Database auto-sync
 */

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
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const apiKey = process.env.FORTNITE_TRACKER_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Fortnite Tracker API Key not configured' }),
      };
    }

    // Fetch weapon data from Fortnite Tracker API
    const response = await fetch('https://api.fortnitetracker.com/v1/fortnite/weapons', {
      headers: {
        'TRN-Api-Key': apiKey,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch weapons from Fortnite Tracker API' }),
      };
    }

    const weaponsData = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600', // Cache for 1 hour
      },
      body: JSON.stringify(weaponsData),
    };
  } catch (error) {
    console.error('Fortnite Weapons API Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to fetch weapons data',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
