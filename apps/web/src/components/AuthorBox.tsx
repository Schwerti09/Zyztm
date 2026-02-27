import { AUTHOR } from '../lib/pseo';

interface AuthorBoxProps {
  lastUpdated: string;
}

/**
 * E-E-A-T Author Box: Experience, Expertise, Authoritativeness, Trustworthiness
 * Displayed at the bottom of every Guide page.
 */
export default function AuthorBox({ lastUpdated }: AuthorBoxProps) {
  const formatted = new Date(lastUpdated).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mt-12 p-6 rounded-2xl border border-neon-blue/30 bg-bg-card/80 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* Avatar placeholder */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-pink via-neon-blue to-neon-gold flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-neon-blue/20">
          🎮
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-3 mb-1">
            <span className="font-cyber text-lg font-bold text-neon-blue">{AUTHOR.name}</span>
            <span className="font-body text-sm text-white/50">{AUTHOR.handle}</span>
            <span className="font-body text-xs text-neon-pink/80 bg-neon-pink/10 px-2 py-0.5 rounded-full border border-neon-pink/20">
              {AUTHOR.title}
            </span>
          </div>

          <p className="font-body text-white/70 text-sm leading-relaxed mb-3">{AUTHOR.bio}</p>

          {/* Experience badge */}
          <p className="font-body text-xs text-neon-gold/80 mb-3">
            <span className="text-neon-gold">⚡</span> {AUTHOR.experience}
          </p>

          {/* Sources / Trust Signals */}
          <div className="mb-4">
            <p className="font-cyber text-xs text-white/40 tracking-widest mb-1">QUELLEN & GRUNDLAGEN</p>
            <ul className="flex flex-wrap gap-2">
              {AUTHOR.sources.map((src) => (
                <li
                  key={src}
                  className="text-xs text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full"
                >
                  {src}
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap gap-3">
            <a
              href={AUTHOR.socials.kick}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-cyber text-neon-blue hover:text-white transition-colors"
            >
              🟢 Kick
            </a>
            <a
              href={AUTHOR.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-cyber text-neon-pink hover:text-white transition-colors"
            >
              📺 YouTube
            </a>
            <a
              href={AUTHOR.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-cyber text-white/60 hover:text-white transition-colors"
            >
              🎵 TikTok
            </a>
            <a
              href={AUTHOR.socials.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-cyber text-white/60 hover:text-white transition-colors"
            >
              💬 Discord
            </a>
          </div>
        </div>
      </div>

      {/* Last updated */}
      <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
        <span className="text-xs font-body text-white/30">
          Zuletzt aktualisiert: <span className="text-white/50">{formatted}</span>
        </span>
      </div>
    </div>
  );
}
