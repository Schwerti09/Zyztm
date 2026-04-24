import { Router, Request, Response } from 'express';
import { eq, desc, sql } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';

const router = Router();

// Schema definitions will be added to db/schema later
// For now, using raw SQL queries

// GET /api/creators - List all active creators
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await db.execute(`
      SELECT 
        id, name, creator_code, display_name, avatar_url, bio, 
        social_links, is_verified, is_active, 
        total_revenue, total_code_uses,
        created_at
      FROM creators 
      WHERE is_active = true
      ORDER BY total_revenue DESC, total_code_uses DESC
    `);
    
    return res.json({ creators: result.rows });
  } catch (err) {
    console.error('Error fetching creators:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/creators/:id - Get creator details
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await db.execute({
      sql: `
        SELECT 
          id, name, creator_code, display_name, avatar_url, bio, 
          social_links, is_verified, is_active, 
          revenue_share_percentage, total_revenue, total_code_uses,
          created_at, updated_at
        FROM creators 
        WHERE id = $1 AND is_active = true
      `,
      args: [id]
    });
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Creator not found' });
    }
    
    return res.json({ creator: result.rows[0] });
  } catch (err) {
    console.error('Error fetching creator:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/creators/code/:code - Get creator by code
router.get('/code/:code', async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    
    const result = await db.execute({
      sql: `
        SELECT 
          id, name, creator_code, display_name, avatar_url, bio, 
          social_links, is_verified, is_active
        FROM creators 
        WHERE creator_code = $1 AND is_active = true
      `,
      args: [code.toUpperCase()]
    });
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Creator code not found' });
    }
    
    // Track code use
    const userId = req.query['userId'] as string | undefined;
    const session_id = req.query['sessionId'] as string | undefined;
    const ip_address = req.ip || req.socket.remoteAddress;
    const user_agent = req.get('user-agent');
    const referrer = req.get('referer');
    
    await db.execute({
      sql: `
        INSERT INTO creator_code_uses (creator_id, user_id, session_id, ip_address, user_agent, referrer)
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      args: [result.rows[0].id, userId, session_id, ip_address, user_agent, referrer]
    });
    
    // Update creator code uses count
    await db.execute({
      sql: `
        UPDATE creators 
        SET total_code_uses = total_code_uses + 1
        WHERE id = $1
      `,
      args: [result.rows[0].id]
    });
    
    return res.json({ creator: result.rows[0] });
  } catch (err) {
    console.error('Error fetching creator by code:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/creators/leaderboard - Get creator leaderboard
router.get('/leaderboard', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query['limit'] as string) || 10;
    const offset = parseInt(req.query['offset'] as string) || 0;
    
    const result = await db.execute({
      sql: `
        SELECT 
          id, name, creator_code, display_name, avatar_url,
          is_verified, total_revenue, total_code_uses,
          RANK() OVER (ORDER BY total_revenue DESC) as rank
        FROM creators 
        WHERE is_active = true
        ORDER BY total_revenue DESC
        LIMIT $1 OFFSET $2
      `,
      args: [limit, offset]
    });
    
    return res.json({ leaderboard: result.rows });
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/users/select-creator - User selects their support creator
router.post('/select-creator', async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      userId: z.string().uuid().optional(),
      email: z.string().email().optional(),
      creatorId: z.number().int().positive(),
    }).refine((d) => d.userId || d.email, { message: 'userId or email is required' });
    
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }
    
    const { userId, email, creatorId } = parsed.data;
    
    // Verify creator exists
    const creatorResult = await db.execute({
      sql: 'SELECT id FROM creators WHERE id = $1 AND is_active = true',
      args: [creatorId]
    });
    
    if (creatorResult.rows.length === 0) {
      return res.status(404).json({ error: 'Creator not found' });
    }
    
    // Use userId or resolve user by email
    let finalUserId = userId;
    if (!finalUserId && email) {
      const userResult = await db.execute({
        sql: 'SELECT id FROM users WHERE email = $1',
        args: [email]
      });
      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      finalUserId = userResult.rows[0].id;
    }
    
    // Insert or update user creator selection
    await db.execute({
      sql: `
        INSERT INTO user_creator_selection (user_id, creator_id, selected_at, updated_at)
        VALUES ($1, $2, NOW(), NOW())
        ON CONFLICT (user_id) 
        DO UPDATE SET 
          creator_id = $2,
          updated_at = NOW()
      `,
      args: [finalUserId, creatorId]
    });
    
    return res.json({ success: true, creatorId });
  } catch (err) {
    console.error('Error selecting creator:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users/creator - Get user's selected creator
router.get('/user-creator', async (req: Request, res: Response) => {
  try {
    const userId = req.query['userId'] as string | undefined;
    const email = req.query['email'] as string | undefined;
    
    if (!userId && !email) {
      return res.status(400).json({ error: 'userId or email is required' });
    }
    
    let finalUserId = userId;
    if (!finalUserId && email) {
      const userResult = await db.execute({
        sql: 'SELECT id FROM users WHERE email = $1',
        args: [email]
      });
      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      finalUserId = userResult.rows[0].id;
    }
    
    const result = await db.execute({
      sql: `
        SELECT c.id, c.name, c.creator_code, c.display_name, c.avatar_url, c.bio, c.social_links, c.is_verified
        FROM user_creator_selection ucs
        JOIN creators c ON c.id = ucs.creator_id
        WHERE ucs.user_id = $1 AND c.is_active = true
      `,
      args: [finalUserId]
    });
    
    if (result.rows.length === 0) {
      return res.json({ creator: null });
    }
    
    return res.json({ creator: result.rows[0] });
  } catch (err) {
    console.error('Error fetching user creator:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/creators - Register new creator (admin only)
router.post('/', async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      name: z.string().min(1).max(100),
      creator_code: z.string().min(2).max(20).toUpperCase(),
      display_name: z.string().max(100).optional(),
      avatar_url: z.string().url().optional(),
      bio: z.string().optional(),
      social_links: z.record(z.string()).optional(),
      is_verified: z.boolean().default(false),
      revenue_share_percentage: z.number().min(0).max(100).default(50),
    });
    
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }
    
    const data = parsed.data;
    
    const result = await db.execute({
      sql: `
        INSERT INTO creators 
        (name, creator_code, display_name, avatar_url, bio, social_links, is_verified, revenue_share_percentage)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, name, creator_code, display_name, is_verified, created_at
      `,
      args: [
        data.name,
        data.creator_code,
        data.display_name || null,
        data.avatar_url || null,
        data.bio || null,
        JSON.stringify(data.social_links || {}),
        data.is_verified,
        data.revenue_share_percentage
      ]
    });
    
    return res.status(201).json({ creator: result.rows[0] });
  } catch (err: any) {
    console.error('Error creating creator:', err);
    if (err.code === '23505') { // Unique violation
      return res.status(409).json({ error: 'Creator code already exists' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
