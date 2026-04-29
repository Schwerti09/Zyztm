import { useEffect, useState } from 'react';

export default function FortniteSpacePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark">
      {loaded && (
        <iframe
          src="/fortnitenexus-space.html"
          title="Fortnite Nexus Space"
          className="w-full h-screen border-0"
          style={{ minHeight: '100vh' }}
        />
      )}
    </div>
  );
}
