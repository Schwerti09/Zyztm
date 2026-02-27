import { useEffect } from 'react';

export default function ScrollFix() {
  useEffect(() => {
    // Sofort ganz nach oben scrollen beim Laden
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Zusätzlich verhindern, dass irgendwas später scrollt
    const preventAutoScroll = () => {
      if (window.scrollY > 50) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('load', preventAutoScroll);
    return () => window.removeEventListener('load', preventAutoScroll);
  }, []);

  return null;
}
