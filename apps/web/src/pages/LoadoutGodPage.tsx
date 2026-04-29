import { useEffect } from 'react';

export default function LoadoutGodPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark">
      <iframe
        src="/loadout-god-pro-universal.html"
        title="Loadout God"
        className="w-full h-screen border-0"
        style={{ minHeight: '100vh' }}
      />
    </div>
  );
}
