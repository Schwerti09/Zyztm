import { useEffect } from 'react';

export default function ClassicPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <iframe 
      src="/classic.html" 
      className="w-full h-screen"
      style={{ border: 'none' }}
      title="Guides & Meta"
    />
  );
}
