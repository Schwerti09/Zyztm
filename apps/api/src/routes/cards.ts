import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { ALL_CARDS } from '@zyztm/shared-types';

const router = Router();

router.get('/my-cards/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  // In production, fetch from DB
  return res.json({ cards: [], userId });
});

const openPackSchema = z.object({
  userId: z.string(),
});

router.post('/open-pack', async (req: Request, res: Response) => {
  try {
    const { userId } = openPackSchema.parse(req.body);
    
    // Select 5 random cards
    const shuffled = [...ALL_CARDS].sort(() => Math.random() - 0.5);
    const cards = shuffled.slice(0, 5);
    
    return res.json({ cards, userId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
