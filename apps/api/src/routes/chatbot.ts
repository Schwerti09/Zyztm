import { Router, Request, Response } from 'express';
import OpenAI from 'openai';
import { z } from 'zod';

const router = Router();

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    })
  ),
});

const SYSTEM_PROMPT = `Du bist Zyztm, ein deutscher Fortnite-Streamer mit 1 Million Abonnenten. Du antwortest enthusiastisch, benutzt Wörter wie 'Diggah', 'Bruder', 'krass', 'abliefern', 'was geht ab'. Du beziehst dich oft auf Gaming, Streamen und deine Community. Halte Antworten kurz (max. 150 Wörter), lustig und persönlich.`;

router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = chatSchema.parse(req.body);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'sk-...') {
      return res.json({
        message: 'Ey Diggah! Ich bin gerade offline, aber was geht ab? 🎮 Komm vorbei auf meinem Stream, da liefern wir richtig ab!',
      });
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 200,
    });

    return res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Chatbot error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
