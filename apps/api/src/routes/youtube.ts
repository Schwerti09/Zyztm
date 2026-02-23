import { Router, Request, Response } from 'express';

const router = Router();

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? '';

/** Parse up to `limit` video entries from a YouTube Atom feed XML string. */
function parseAtomFeed(xml: string, limit = 3) {
  const entries: Array<{
    title: string;
    thumbnail: string;
    videoId: string;
    publishedAt: string;
    url: string;
  }> = [];

  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(xml)) !== null && entries.length < limit) {
    const block = match[1];

    const videoIdMatch = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(block);
    const titleMatch = /<title>([^<]*)<\/title>/.exec(block);
    const publishedMatch = /<published>([^<]+)<\/published>/.exec(block);
    const thumbnailMatch = /<media:thumbnail[^>]+url="([^"]+)"/.exec(block);

    if (!videoIdMatch) continue;

    const videoId = videoIdMatch[1];
    const title = titleMatch
      ? titleMatch[1].replace(
          /&(?:#x([0-9a-fA-F]+)|#([0-9]+)|(amp|lt|gt|quot|apos));/g,
          (_, hex, dec, named) => {
            if (hex) return String.fromCodePoint(parseInt(hex, 16));
            if (dec) return String.fromCodePoint(parseInt(dec, 10));
            switch (named) {
              case 'amp': return '&';
              case 'lt': return '<';
              case 'gt': return '>';
              case 'quot': return '"';
              case 'apos': return "'";
              default: return _;
            }
          },
        )
      : '';
    const publishedAt = publishedMatch ? publishedMatch[1] : '';
    const thumbnail =
      thumbnailMatch
        ? thumbnailMatch[1]
        : `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;

    entries.push({
      title,
      thumbnail,
      videoId,
      publishedAt,
      url: `https://youtube.com/watch?v=${videoId}`,
    });
  }

  return entries;
}

router.get('/debug', async (_req: Request, res: Response) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return res.status(500).json({
      success: false,
      error: 'Missing env vars: YOUTUBE_API_KEY and/or YOUTUBE_CHANNEL_ID',
      apiKeyPresent: !!apiKey,
      channelIdPresent: !!channelId,
    });
  }

  try {
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`,
    );
    const channelData = (await channelRes.json()) as {
      items?: Array<{ snippet?: { title?: string } }>;
    };

    if (!channelRes.ok) {
      return res.status(502).json({ success: false, step: 'channels', error: channelData });
    }

    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=3&type=video&key=${apiKey}`,
    );
    const searchData = (await searchRes.json()) as {
      items?: Array<{
        id: { videoId: string };
        snippet: { title: string; thumbnails: { medium: { url: string } }; publishedAt: string };
      }>;
    };

    if (!searchRes.ok) {
      return res.status(502).json({ success: false, step: 'search', error: searchData });
    }

    const videos = (searchData.items ?? []).map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      publishedAt: item.snippet.publishedAt,
    }));

    return res.json({
      success: true,
      channelTitle: channelData.items?.[0]?.snippet?.title ?? null,
      videoCount: videos.length,
      videos,
    });
  } catch (err) {
    console.error('[youtube/debug]', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/latest', async (_req: Request, res: Response) => {
  if (!CHANNEL_ID) {
    return res.status(500).json({ error: 'YOUTUBE_CHANNEL_ID env var is not configured' });
  }
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    if (apiKey) {
      // --- YouTube Data API v3 path ---
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
    } else {
      // --- Public RSS/Atom feed fallback (no API key required) ---
      const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

      const response = await fetch(feedUrl);
      if (!response.ok) {
        console.error('YouTube RSS feed error:', response.status);
        return res.status(502).json({ error: 'YouTube RSS feed request failed' });
      }

      const xml = await response.text();
      const videos = parseAtomFeed(xml, 3);

      return res.json({ videos });
    }
  } catch (error) {
    console.error('YouTube fetch error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
