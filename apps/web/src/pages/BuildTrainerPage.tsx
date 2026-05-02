/**
 * Build Trainer Page
 * Landing page for Build Trainer Pro tool
 */

import { useEffect } from 'react';
import BuildTrainerPro from '../components/tools/BuildTrainerPro';

export default function BuildTrainerPage() {
  useEffect(() => {
    document.title = 'Build Trainer Pro | Fortnite Nexus';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Trainiere deine Building-Muscle-Memory mit dem Build Trainer Pro. Canvas 2D-basiertes Tool für Fortnite-Spieler.');
    
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical instanceof HTMLLinkElement) {
      canonical.href = 'https://fortnitenexus.space/tools/build-trainer';
    }
  }, []);

  return <BuildTrainerPro />;
}
