import { useEffect, useState } from 'react';

interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
  source: string;
}

const CHANNEL_URL = 'https://www.youtube.com/channel/UCccyxYt6K8sqVMnppnzd4zQ';

export default function YouTubeLatest() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/youtube/latest')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setVideos(data.videos ?? []);
        }
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex gap-4 justify-center py-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-48 h-28 rounded bg-white/5 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <div className="text-center py-8">
        {error && (
          <p className="text-red-400 text-sm mb-3 font-mono">{error}</p>
        )}
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-block px-6 py-3 border border-neon-pink text-neon-pink font-cyber tracking-widest rounded hover:bg-neon-pink/10 transition-colors"
        >
          🎬 YOUTUBE KANAL BESUCHEN
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {videos.map((v) => (
        <a
          key={v.videoId}
          href={v.url}
          target="_blank"
          rel="noreferrer"
          className="group w-48 rounded overflow-hidden border border-white/10 hover:border-neon-pink/60 transition-colors"
        >
          <img
            src={v.thumbnail}
            alt={v.title}
            className="w-full h-28 object-cover group-hover:opacity-80 transition-opacity"
          />
          <p className="p-2 text-xs text-white/70 line-clamp-2 group-hover:text-white transition-colors">
            {v.title}
          </p>
        </a>
      ))}
    </div>
  );
}
