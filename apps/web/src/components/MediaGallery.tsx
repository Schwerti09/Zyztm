import { useEffect, useState } from 'react';

interface GalleryItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  source: 'clip' | 'youtube';
  views?: number;
}

export default function MediaGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.allSettled([
      fetch('/api/clips/top').then((r) => r.json()),
      fetch('/api/youtube/latest').then((r) => r.json()),
    ]).then(([clipsResult, videosResult]) => {
      const merged: GalleryItem[] = [];
      const errors: string[] = [];

      if (clipsResult.status === 'fulfilled' && Array.isArray(clipsResult.value.clips)) {
        for (const c of clipsResult.value.clips) {
          merged.push({
            id: c.id,
            title: c.title,
            thumbnail: c.thumbnail,
            url: c.url,
            source: 'clip',
            views: c.views,
          });
        }
      } else if (clipsResult.status === 'rejected') {
        errors.push(`Clips: ${clipsResult.reason}`);
      } else if (clipsResult.status === 'fulfilled' && clipsResult.value.error) {
        errors.push(`Clips: ${clipsResult.value.error}`);
      }

      if (videosResult.status === 'fulfilled' && Array.isArray(videosResult.value.videos)) {
        for (const v of videosResult.value.videos) {
          merged.push({
            id: v.videoId,
            title: v.title,
            thumbnail: v.thumbnail,
            url: v.url,
            source: 'youtube',
          });
        }
      } else if (videosResult.status === 'rejected') {
        errors.push(`YouTube: ${videosResult.reason}`);
      } else if (videosResult.status === 'fulfilled' && videosResult.value.error) {
        errors.push(`YouTube: ${videosResult.value.error}`);
      }

      if (merged.length === 0) {
        setError(errors.length > 0 ? errors.join(' | ') : 'Keine Medien gefunden.');
      } else {
        setItems(merged);
      }
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="aspect-video rounded bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error || items.length === 0) {
    return (
      <div className="text-center py-8 text-white/40 font-cyber tracking-widest">
        {error ?? 'Keine Medien verfügbar.'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="group relative rounded overflow-hidden border border-white/10 hover:border-neon-pink/60 transition-colors"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full aspect-video object-cover group-hover:opacity-80 transition-opacity"
          />
          {/* Source badge */}
          <span
            className="absolute top-1 right-1 text-[10px] px-1.5 py-0.5 rounded font-cyber tracking-widest"
            style={{
              background: item.source === 'youtube' ? '#ff0000aa' : '#9146ffaa',
              color: '#fff',
            }}
          >
            {item.source === 'youtube' ? 'YT' : 'KICK'}
          </span>
          {item.views !== undefined && (
            <span className="absolute bottom-1 left-1 text-[10px] text-white/70 bg-black/60 px-1 rounded">
              👁 {item.views.toLocaleString()}
            </span>
          )}
          <p className="p-2 text-xs text-white/70 line-clamp-2 group-hover:text-white transition-colors">
            {item.title}
          </p>
        </a>
      ))}
    </div>
  );
}
