import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

const synthesizeSchema = z.object({
  text: z.string().min(1).max(500),
  userId: z.string().optional(),
});

router.post('/synthesize', async (req: Request, res: Response) => {
  try {
    const { text } = synthesizeSchema.parse(req.body);

    const isTestMode =
      req.headers['x-test-mode'] === 'true' &&
      req.headers['x-admin-secret'] === process.env.ADMIN_SECRET;

    if (isTestMode) {
      return res.status(200).json({ testMode: true, message: 'Test mode - no audio generated' });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';

    if (!apiKey || apiKey === '...') {
      return res.status(503).json({ error: 'Voice synthesis not configured' });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Voice synthesis failed' });
    }

    const audioBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', audioBuffer.byteLength);
    return res.send(Buffer.from(audioBuffer));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Voice synthesis error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
