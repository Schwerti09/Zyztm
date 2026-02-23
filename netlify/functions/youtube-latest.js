/**
 * GET /.netlify/functions/youtube-latest
 * Returns the latest 3 YouTube videos for the configured channel.
 *
 * Required env vars: YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID
 */
export const handler = async () => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID env var' }),
    };
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=3&type=video&key=${apiKey}`,
    );
    const data = await res.json();

    if (!res.ok) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'YouTube API error', details: data }),
      };
    }

    const videos = (data.items || []).map((item) => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
      thumbnail: item.snippet?.thumbnails?.medium?.url,
      url: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
      publishedAt: item.snippet?.publishedAt,
      source: 'youtube',
    }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videos }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
