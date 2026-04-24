/**
 * Fortnite Nexus Creators API
 * Handles all creator-related requests for Netlify Functions
 *
 * Required env vars: DATABASE_URL
 */
import { neon } from '@neondatabase/serverless';

export const handler = async (event) => {
  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'DATABASE_URL env var not configured' }),
    };
  }

  const sql = neon(process.env.DATABASE_URL);
  const path = event.path.replace('/.netlify/functions/creators', '').replace('/api/creators', '');
  const method = event.httpMethod;

  try {
    // GET /creators - List all active creators
    if (method === 'GET' && (path === '' || path === '/')) {
      const rows = await sql`
        SELECT id, name, creator_code, display_name, avatar_url, bio, social_links, is_verified, is_active, total_revenue, total_code_uses, created_at
        FROM creators 
        WHERE is_active = true
        ORDER BY total_revenue DESC, total_code_uses DESC
      `;
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creators: rows }),
      };
    }

    // GET /creators/:id - Get creator details
    if (method === 'GET' && path.match(/^\/\d+$/)) {
      const id = path.replace('/', '');
      const rows = await sql`
        SELECT id, name, creator_code, display_name, avatar_url, bio, social_links, is_verified, is_active, revenue_share_percentage, total_revenue, total_code_uses, created_at, updated_at
        FROM creators 
        WHERE id = ${id} AND is_active = true
      `;
      if (rows.length === 0) {
        return { statusCode: 404, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Creator not found' }) };
      }
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creator: rows[0] }),
      };
    }

    // GET /creators/code/:code - Get creator by code
    if (method === 'GET' && path.startsWith('/code/')) {
      const code = path.replace('/code/', '').toUpperCase();
      const rows = await sql`
        SELECT id, name, creator_code, display_name, avatar_url, bio, social_links, is_verified, is_active
        FROM creators 
        WHERE creator_code = ${code} AND is_active = true
      `;
      if (rows.length === 0) {
        return { statusCode: 404, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Creator code not found' }) };
      }

      // Track code use
      const userId = event.queryStringParameters?.userId;
      const session_id = event.queryStringParameters?.sessionId;
      const ip_address = event.headers['client-ip'] || event.headers['x-forwarded-for'];
      const user_agent = event.headers['user-agent'];
      const referrer = event.headers['referer'];

      await sql`
        INSERT INTO creator_code_uses (creator_id, user_id, session_id, ip_address, user_agent, referrer)
        VALUES (${rows[0].id}, ${userId}, ${session_id}, ${ip_address}, ${user_agent}, ${referrer})
      `;

      // Update creator code uses count
      await sql`
        UPDATE creators 
        SET total_code_uses = total_code_uses + 1
        WHERE id = ${rows[0].id}
      `;

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creator: rows[0] }),
      };
    }

    // GET /creators/leaderboard - Get creator leaderboard
    if (method === 'GET' && path === '/leaderboard') {
      const limit = parseInt(event.queryStringParameters?.limit) || 10;
      const offset = parseInt(event.queryStringParameters?.offset) || 0;
      const rows = await sql`
        SELECT id, name, creator_code, display_name, avatar_url, is_verified, total_revenue, total_code_uses,
        RANK() OVER (ORDER BY total_revenue DESC) as rank
        FROM creators 
        WHERE is_active = true
        ORDER BY total_revenue DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leaderboard: rows }),
      };
    }

    // POST /creators/select-creator - User selects their support creator
    if (method === 'POST' && path === '/select-creator') {
      const body = JSON.parse(event.body);
      const { userId, email, creatorId } = body;

      if (!userId && !email) {
        return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'userId or email is required' }) };
      }

      // Verify creator exists
      const creatorRows = await sql`SELECT id FROM creators WHERE id = ${creatorId} AND is_active = true`;
      if (creatorRows.length === 0) {
        return { statusCode: 404, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Creator not found' }) };
      }

      let finalUserId = userId;
      if (!finalUserId && email) {
        const userRows = await sql`SELECT id FROM users WHERE email = ${email}`;
        if (userRows.length === 0) {
          return { statusCode: 404, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'User not found' }) };
        }
        finalUserId = userRows[0].id;
      }

      await sql`
        INSERT INTO user_creator_selection (user_id, creator_id, selected_at, updated_at)
        VALUES (${finalUserId}, ${creatorId}, NOW(), NOW())
        ON CONFLICT (user_id) 
        DO UPDATE SET creator_id = ${creatorId}, updated_at = NOW()
      `;

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, creatorId }),
      };
    }

    // GET /creators/user-creator - Get user's selected creator
    if (method === 'GET' && path === '/user-creator') {
      const userId = event.queryStringParameters?.userId;
      const email = event.queryStringParameters?.email;

      if (!userId && !email) {
        return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'userId or email is required' }) };
      }

      let finalUserId = userId;
      if (!finalUserId && email) {
        const userRows = await sql`SELECT id FROM users WHERE email = ${email}`;
        if (userRows.length === 0) {
          return { statusCode: 404, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'User not found' }) };
        }
        finalUserId = userRows[0].id;
      }

      const rows = await sql`
        SELECT c.id, c.name, c.creator_code, c.display_name, c.avatar_url, c.bio, c.social_links, c.is_verified
        FROM user_creator_selection ucs
        JOIN creators c ON c.id = ucs.creator_id
        WHERE ucs.user_id = ${finalUserId} AND c.is_active = true
      `;

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creator: rows[0] || null }),
      };
    }

    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Endpoint not found' }),
    };
  } catch (err) {
    console.error('Creators API error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
