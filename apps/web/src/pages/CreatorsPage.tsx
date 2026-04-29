import { useEffect } from 'react';

export default function CreatorsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <iframe 
      src="/creators.html" 
      className="w-full h-screen"
      style={{ border: 'none' }}
      title="Creators Hub"
    />
  );
}
