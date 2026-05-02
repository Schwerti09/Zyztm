/**
 * Scheduled Weapon Database Sync
 * 
 * Automatically syncs weapon data from Fortnite API to Neon Database
 * Runs daily at 00:00 UTC
 */

import { neon } from '@neondatabase/serverless';

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

const sql = neon(process.env.DATABASE_URL!);

export const handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // Verify scheduled event
  if (event.headers['x-netlify-scheduled'] !== 'true') {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Unauthorized - scheduled event only' }),
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

    // Create weapons table if not exists
    await sql`
      CREATE TABLE IF NOT EXISTS weapons (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        rarity TEXT NOT NULL,
        damage NUMERIC NOT NULL,
        fire_rate NUMERIC NOT NULL,
        reload_time NUMERIC NOT NULL,
        mag_size INTEGER NOT NULL,
        dps NUMERIC NOT NULL,
        range NUMERIC NOT NULL,
        headshot_multiplier NUMERIC NOT NULL,
        tier TEXT NOT NULL,
        image_url TEXT,
        description TEXT,
        last_updated TIMESTAMP DEFAULT NOW()
      )
    `;

    // Upsert weapon data
    for (const weapon of weaponsData) {
      await sql`
        INSERT INTO weapons (id, name, type, rarity, damage, fire_rate, reload_time, mag_size, dps, range, headshot_multiplier, tier, image_url, description, last_updated)
        VALUES (
          ${weapon.id || weapon.name?.toLowerCase().replace(/\s+/g, '-')},
          ${weapon.name},
          ${weapon.type || 'AR'},
          ${weapon.rarity || 'Rare'},
          ${weapon.damage || 0},
          ${weapon.fireRate || weapon.fire_rate || 5},
          ${weapon.reloadTime || weapon.reload_time || 2.5},
          ${weapon.magSize || weapon.mag_size || 30},
          ${weapon.dps || (weapon.damage * weapon.fireRate) || 0},
          ${weapon.range || 50},
          ${weapon.headshotMultiplier || weapon.headshot_multiplier || 2.0},
          ${weapon.tier || 'B'},
          ${weapon.imageUrl || weapon.image_url || ''},
          ${weapon.description || ''},
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          type = EXCLUDED.type,
          rarity = EXCLUDED.rarity,
          damage = EXCLUDED.damage,
          fire_rate = EXCLUDED.fire_rate,
          reload_time = EXCLUDED.reload_time,
          mag_size = EXCLUDED.mag_size,
          dps = EXCLUDED.dps,
          range = EXCLUDED.range,
          headshot_multiplier = EXCLUDED.headshot_multiplier,
          tier = EXCLUDED.tier,
          image_url = EXCLUDED.image_url,
          description = EXCLUDED.description,
          last_updated = NOW()
      `;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: `Successfully synced ${weaponsData.length} weapons`,
        count: weaponsData.length,
      }),
    };
  } catch (error) {
    console.error('Weapon Sync Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to sync weapons',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
