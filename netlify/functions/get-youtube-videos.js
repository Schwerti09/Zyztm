/**
 * GET /.netlify/functions/get-youtube-videos
 *
 * Fetches the latest 12 YouTube videos for a given channel via the
 * YouTube Data API v3 and returns a clean JSON array.
 *
 * Required env vars:
 *   YOUTUBE_API_KEY      – YouTube Data API v3 key
 *   YOUTUBE_CHANNEL_ID   – YouTube channel ID (e.g. UCxxxxxxxxxxxxxxxxxxxxxxxx)
 *
 * @typedef {{ id: string, title: string, thumbnail: string, publishedAt: string, link: string }} VideoItem
 */

/** @type {Record<string, string>} */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/** @type {Record<string, string>} */
const BASE_HEADERS = {
  ...CORS_HEADERS,
  'Content-Type': 'application/json',
  'Cache-Control': 'public, max-age=600, stale-while-revalidate=300',
};

/**
 * @param {number} statusCode
 * @param {unknown} body
 * @returns {{ statusCode: number, headers: Record<string, string>, body: string }}
 */
function respond(statusCode, body) {
  return {
    statusCode,
    headers: BASE_HEADERS,
    body: JSON.stringify(body),
  };
}

/**
 * Netlify Function handler – returns the latest 12 videos for a YouTube channel.
 *
 * @param {{ queryStringParameters?: Record<string, string> | null }} event
 * @returns {Promise<{ statusCode: number, headers: Record<string, string>, body: string }>}
 */
export const handler = async (event) => {
  // Handle CORS pre-flight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return respond(500, { error: 'YOUTUBE_API_KEY env var is not configured' });
  }

  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!channelId) {
    return respond(500, { error: 'YOUTUBE_CHANNEL_ID env var is not configured' });
  }

  const url =
    `https://youtube.googleapis.com/youtube/v3/search` +
    `?part=snippet` +
    `&channelId=${encodeURIComponent(channelId)}` +
    `&maxResults=12` +
    `&order=date` +
    `&type=video` +
    `&key=${apiKey}`;

  /** @type {Response} */
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    console.error('[get-youtube-videos] Network error:', err);
    return respond(502, { error: 'Failed to reach YouTube API', details: String(err) });
  }

  // Handle quota exceeded (HTTP 429 from YouTube comes as 403 with reason quotaExceeded)
  if (res.status === 429) {
    return respond(429, { error: 'YouTube API quota exceeded – try again later' });
  }

  /** @type {unknown} */
  let data;
  try {
    data = await res.json();
  } catch {
    return respond(502, { error: 'Invalid JSON response from YouTube API' });
  }

  if (!res.ok) {
    // YouTube returns quota errors as 403 with reason "quotaExceeded" or "dailyLimitExceeded"
    const reason =
      /** @type {any} */ (data)?.error?.errors?.[0]?.reason ?? '';
    if (reason === 'quotaExceeded' || reason === 'dailyLimitExceeded') {
      return respond(429, { error: 'YouTube API quota exceeded – try again later' });
    }
    console.error('[get-youtube-videos] YouTube API error:', data);
    return respond(502, { error: 'YouTube API error', details: data });
  }

  /** @type {VideoItem[]} */
  const items = (/** @type {any} */ (data).items ?? []).map((item) => {
    const videoId = item.id?.videoId ?? '';
    return {
      id: videoId,
      title: item.snippet?.title ?? '',
      thumbnail: item.snippet?.thumbnails?.high?.url ?? item.snippet?.thumbnails?.medium?.url ?? '',
      publishedAt: item.snippet?.publishedAt ?? '',
      link: `https://youtu.be/${videoId}`,
    };
  });

  return respond(200, items);
};
