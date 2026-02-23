/**
 * GET /.netlify/functions/debug-youtube
 * Checks YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID, calls YouTube API,
 * and returns structured JSON with success/error details and up to 3 videos.
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
      body: JSON.stringify({
        success: false,
        error: 'Missing env vars: YOUTUBE_API_KEY and/or YOUTUBE_CHANNEL_ID',
        apiKeyPresent: !!apiKey,
        channelIdPresent: !!channelId,
      }),
    };
  }

  try {
    // 1. Verify channel exists
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`,
    );
    const channelData = await channelRes.json();

    if (!channelRes.ok) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, step: 'channels', error: channelData }),
      };
    }

    // 2. Search latest videos
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=3&type=video&key=${apiKey}`,
    );
    const searchData = await searchRes.json();

    if (!searchRes.ok) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, step: 'search', error: searchData }),
      };
    }

    const videos = (searchData.items || []).map((item) => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
      thumbnail: item.snippet?.thumbnails?.medium?.url,
      url: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
      publishedAt: item.snippet?.publishedAt,
    }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        channelTitle: channelData.items?.[0]?.snippet?.title ?? null,
        videoCount: videos.length,
        videos,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
