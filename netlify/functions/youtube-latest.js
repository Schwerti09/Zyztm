/**
 * GET /.netlify/functions/youtube-latest
 * Returns the latest 3 YouTube videos for the configured channel.
 *
 * Required env vars: YOUTUBE_CHANNEL_ID
 * Optional env vars: YOUTUBE_API_KEY (falls back to public RSS feed if absent)
 */

/** Parse up to `limit` video entries from a YouTube Atom feed XML string. */
function parseAtomFeed(xml, limit = 3) {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xml)) !== null && entries.length < limit) {
    const block = match[1];

    const videoIdMatch = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(block);
    const titleMatch = /<title>([^<]*)<\/title>/.exec(block);
    const publishedMatch = /<published>([^<]+)<\/published>/.exec(block);
    const thumbnailMatch = /<media:thumbnail[^>]+url="([^"]+)"/.exec(block);

    if (!videoIdMatch) continue;

    const videoId = videoIdMatch[1];
    const rawTitle = titleMatch ? titleMatch[1] : '';
    const title = rawTitle.replace(
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
    );
    const publishedAt = publishedMatch ? publishedMatch[1] : '';
    const thumbnail = thumbnailMatch
      ? thumbnailMatch[1]
      : `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;

    entries.push({
      videoId,
      title,
      thumbnail,
      publishedAt,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      source: 'youtube',
    });
  }

  return entries;
}

export const handler = async () => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  // Fall back to Zyztm's known channel ID so the feed works even without the env var set
  const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UCccyxYt6K8sqVMnppnzd4zQ';


  try {
    if (apiKey) {
      // --- YouTube Data API v3 path ---
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
    } else {
      // --- Public RSS/Atom feed fallback (no API key required) ---
      const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      const res = await fetch(feedUrl);

      if (!res.ok) {
        return {
          statusCode: 502,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'YouTube RSS feed request failed' }),
        };
      }

      const xml = await res.text();
      const videos = parseAtomFeed(xml, 3);

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videos }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
