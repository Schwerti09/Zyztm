export interface TikTokVideo {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
}

/**
 * Parse TikTok video links out of a raw embed / blockquote HTML string.
 * This is used when the user pastes TikTok embed code into the admin panel,
 * so that we can extract the video IDs and store them in the database.
 */
export function parseTikTokEmbed(embedCode: string): TikTokVideo[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(embedCode, 'text/html');
  const links = doc.querySelectorAll('a');
  const videos: TikTokVideo[] = [];
  const seen = new Set<string>();

  links.forEach((link) => {
    const href = link.href;
    if (!href.includes('/video/')) return;
    const videoId = href.split('/video/')[1]?.split('?')[0];
    if (!videoId || seen.has(videoId)) return;
    seen.add(videoId);

    videos.push({
      id: videoId,
      url: href,
      thumbnail: `https://www.tiktok.com/api/img/?itemId=${videoId}&location=0`,
      title: link.textContent?.trim() || 'TikTok Video',
    });
  });

  return videos;
}

/**
 * Build a TikTok embed iframe src URL from a video ID.
 */
export function tiktokEmbedUrl(videoId: string): string {
  return `https://www.tiktok.com/player/v1/?videoID=${videoId}`;
}
