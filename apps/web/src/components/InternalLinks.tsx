import { Link } from 'wouter';
import type { GuideData } from '../lib/pseo';
import { getRelatedGuides } from '../lib/pseo';
import { GUIDES } from '../data/guides';

interface InternalLinksProps {
  guide: GuideData;
}

const CATEGORY_LABELS: Record<string, string> = {
  fortnite: '🎮 Fortnite',
  hardware: '🖥️ Hardware',
  stream: '📡 Stream',
  settings: '⚙️ Settings',
  ranked: '🏆 Ranked',
};

/**
 * Renders 8–12 contextual internal links to related guides.
 * Boosts site crawlability and topical authority.
 */
export default function InternalLinks({ guide }: InternalLinksProps) {
  const related = getRelatedGuides(guide, GUIDES, 10);

  if (related.length === 0) return null;

  return (
    <nav aria-label="Verwandte Guides" className="mt-10">
      <h2 className="font-cyber text-lg font-bold text-neon-blue mb-4 tracking-wider">
        ↗ VERWANDTE GUIDES
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((rel) => (
          <Link key={rel.slug} href={`/de/guide/${rel.slug}`}>
            <a className="group flex flex-col p-4 rounded-xl border border-white/10 bg-bg-card/60 hover:border-neon-blue/50 hover:bg-bg-card transition-all duration-200">
              <span className="text-xs font-cyber text-neon-blue/60 tracking-widest mb-1">
                {CATEGORY_LABELS[rel.category] ?? rel.category}
              </span>
              <span className="font-body text-white/80 text-sm group-hover:text-white transition-colors leading-snug">
                {rel.title}
              </span>
              <span className="text-xs text-white/30 mt-1">{rel.readingTimeMin} Min. Lesezeit</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
