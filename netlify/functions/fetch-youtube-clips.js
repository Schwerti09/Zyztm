/**
 * Netlify Scheduled Function – fetch latest YouTube videos and upsert into clips table.
 * Runs daily (configured in netlify.toml).
 *
 * Required env vars:
 *   DATABASE_URL        – Postgres/Neon connection string
 *   YOUTUBE_API_KEY     – YouTube Data API v3 key
 *   YOUTUBE_CHANNEL_ID  – YouTube channel ID
 */
import pg from 'pg';

const { Pool } = pg;

async function fetchYouTubeVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    throw new Error('Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID env vars');
  }

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=5&type=video&key=${apiKey}`,
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`YouTube API error: ${JSON.stringify(data)}`);
  }

  return (data.items || []).map((item) => ({
    title: item.snippet?.title ?? '',
    thumbnail: item.snippet?.thumbnails?.medium?.url ?? '',
    url: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
  }));
}

export const handler = async () => {
  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'DATABASE_URL env var not configured' }),
    };
  }

  try {
    const videos = await fetchYouTubeVideos();

    if (videos.length === 0) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, upserted: 0, message: 'No videos found' }),
      };
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    try {
      for (const video of videos) {
        if (!video.url) continue;
        await pool.query(
          `INSERT INTO clips (title, thumbnail, url, views, source)
           VALUES ($1, $2, $3, 0, 'youtube')
           ON CONFLICT (url) DO UPDATE
             SET title     = EXCLUDED.title,
                 thumbnail = EXCLUDED.thumbnail,
                 source    = 'youtube'`,
          [video.title, video.thumbnail, video.url],
        );
      }
    } finally {
      await pool.end();
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, upserted: videos.length }),
    };
  } catch (err) {
    console.error('[fetch-youtube-clips] Error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
