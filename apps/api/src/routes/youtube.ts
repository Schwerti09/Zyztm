import { Router, Request, Response } from 'express';

const router = Router();

// Zyztm's YouTube channel ID (can be overridden via YOUTUBE_CHANNEL_ID env var)
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCccyxYt6K8sqVMnppnzd4zQ';

router.get('/latest', async (_req: Request, res: Response) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'YouTube API key not configured' });
  }

  try {
    const params = new URLSearchParams({
      key: apiKey,
      channelId: CHANNEL_ID,
      part: 'snippet',
      order: 'date',
      maxResults: '3',
      type: 'video',
    });
    const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      console.error('YouTube API error:', text);
      return res.status(502).json({ error: 'YouTube API request failed' });
    }

    const data = (await response.json()) as {
      items: Array<{
        id: { videoId: string };
        snippet: {
          title: string;
          publishedAt: string;
          thumbnails: { medium: { url: string } };
        };
      }>;
    };

    const videos = data.items.map((item) => ({
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      videoId: item.id.videoId,
      publishedAt: item.snippet.publishedAt,
      url: `https://youtube.com/watch?v=${item.id.videoId}`,
    }));

    return res.json({ videos });
  } catch (error) {
    console.error('YouTube fetch error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
