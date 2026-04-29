import { useState } from 'react';
import {
  analyzeStats,
  generateMockStats,
  type AnalysisReport,
  type Insight,
} from '../../lib/stats-analyzer';

const RANK_COLORS: Record<string, string> = {
  Bronze: '#a16c3b',
  Silver: '#c0c0c0',
  Gold: '#f5c518',
  Platinum: '#7dc8d6',
  Diamond: '#60a5fa',
  Champion: '#f472b6',
  Unreal: '#ef4444',
};

function RatingBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-cyber tracking-wider text-white/60">
          {label}
        </span>
        <span className="text-xs font-mono text-white/90">{value}/100</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}70, ${color})`,
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}

function InsightCard({ insight }: { insight: Insight }) {
  const typeConfig = {
    strength: { icon: '✓', color: '#22C55E', label: 'STÄRKE' },
    weakness: { icon: '⚠', color: '#EF4444', label: 'SCHWÄCHE' },
    action: { icon: '→', color: '#00f2ff', label: 'ACTION' },
  };
  const c = typeConfig[insight.type];

  return (
    <div
      className="p-4 rounded-xl border"
      style={{
        borderColor: `${c.color}40`,
        background: `${c.color}08`,
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="font-cyber text-xl font-bold shrink-0"
          style={{ color: c.color }}
        >
          {c.icon}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="text-[10px] font-cyber tracking-widest"
              style={{ color: c.color }}
            >
              {c.label}
            </span>
            <span className="text-[10px] font-cyber text-white/30 uppercase">
              {insight.category}
            </span>
          </div>
          <h4 className="font-cyber text-base text-white mb-1">
            {insight.title}
          </h4>
          <p className="text-sm font-body text-white/70 leading-relaxed">
            {insight.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StatsDashboard() {
  const [username, setUsername] = useState('');
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!username.trim()) return;
    setLoading(true);
    // Simulation eines API-Calls
    setTimeout(() => {
      const stats = generateMockStats(username.trim());
      const analysis = analyzeStats(stats);
      setReport(analysis);
      setLoading(false);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAnalyze();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-white">
      <div className="mb-8">
        <h1 className="font-cyber text-3xl sm:text-5xl font-black text-neon-gold mb-3 leading-tight">
          STATS DASHBOARD PRO
        </h1>
        <p className="text-white/60 font-body max-w-2xl">
          Gib deinen Epic-Username ein. Wir analysieren deine Performance in 5 Dimensionen
          und liefern dir personalisierte Verbesserungs-Empfehlungen.
        </p>
      </div>

      {/* SEARCH */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2 max-w-xl">
          <input
            type="text"
            placeholder="Epic-Username eingeben..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 bg-bg-darker border border-white/10 rounded-lg px-4 py-3 font-mono text-white focus:border-neon-gold outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="px-6 py-3 rounded-lg border border-neon-gold/50 bg-neon-gold/10 hover:bg-neon-gold/20 disabled:opacity-40 disabled:cursor-not-allowed text-neon-gold font-cyber text-sm tracking-widest transition-colors"
          >
            {loading ? 'ANALYSIERE…' : 'ANALYSIEREN'}
          </button>
        </div>
        <p className="text-xs font-body text-white/40 mt-2">
          Demo-Modus: Stats werden deterministisch aus deinem Username generiert. Live-API
          folgt in Kürze.
        </p>
      </form>

      {/* REPORT */}
      {report && (
        <>
          {/* SUMMARY CARD */}
          <section className="mb-6 p-6 rounded-2xl border border-neon-gold/30 bg-gradient-to-br from-neon-gold/10 to-transparent">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
              <div className="text-center md:text-left shrink-0">
                <div className="text-xs font-cyber tracking-widest text-white/50 mb-1">
                  OVERALL
                </div>
                <div className="font-cyber text-6xl font-black leading-none text-white">
                  {report.rating.overall}
                </div>
                <div
                  className="font-cyber text-lg font-bold tracking-widest mt-2"
                  style={{ color: RANK_COLORS[report.rating.rank] }}
                >
                  {report.rating.rank.toUpperCase()}
                </div>
              </div>
              <div>
                <h2 className="font-cyber text-xl text-white mb-2">
                  {report.stats.username}
                </h2>
                <p className="text-sm font-body text-white/70 leading-relaxed mb-4">
                  {report.summary}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2 rounded-lg bg-white/5">
                    <div className="text-[10px] text-white/40 font-cyber tracking-widest">
                      K/D
                    </div>
                    <div className="font-mono text-lg text-white">
                      {report.stats.kd.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5">
                    <div className="text-[10px] text-white/40 font-cyber tracking-widest">
                      WIN-RATE
                    </div>
                    <div className="font-mono text-lg text-white">
                      {report.stats.winRate}%
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5">
                    <div className="text-[10px] text-white/40 font-cyber tracking-widest">
                      TOP 10
                    </div>
                    <div className="font-mono text-lg text-white">
                      {report.stats.top10Rate}%
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5">
                    <div className="text-[10px] text-white/40 font-cyber tracking-widest">
                      MATCHES
                    </div>
                    <div className="font-mono text-lg text-white">
                      {report.stats.matchesPlayed}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RATINGS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <h3 className="font-cyber text-sm tracking-widest text-white/60 mb-4">
                📊 SKILL-BREAKDOWN
              </h3>
              <RatingBar label="AIM" value={report.rating.aim} color="#ff0055" />
              <RatingBar
                label="POSITIONING"
                value={report.rating.positioning}
                color="#00f2ff"
              />
              <RatingBar
                label="BUILDING"
                value={report.rating.building}
                color="#f5c518"
              />
              <RatingBar
                label="DECISION MAKING"
                value={report.rating.decision}
                color="#22C55E"
              />
            </div>

            <div className="p-6 rounded-2xl border border-neon-pink/30 bg-neon-pink/5">
              <h3 className="font-cyber text-sm tracking-widest text-neon-pink mb-4">
                🎯 3-WOCHEN-ZIELE
              </h3>
              <ol className="space-y-3">
                {report.weeklyGoals.map((goal, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-cyber text-lg font-bold text-neon-pink shrink-0">
                      {i + 1}.
                    </span>
                    <span className="text-sm font-body text-white/80 leading-relaxed">
                      {goal}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* INSIGHTS */}
          <section>
            <h3 className="font-cyber text-sm tracking-widest text-white/60 mb-4">
              💡 PERSONAL INSIGHTS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {report.insights.map((insight, i) => (
                <InsightCard key={i} insight={insight} />
              ))}
            </div>
          </section>
        </>
      )}

      {!report && !loading && (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
          <div className="text-6xl mb-4 opacity-30">📊</div>
          <p className="text-white/40 font-body">
            Gib einen Username ein, um deine Analyse zu starten.
          </p>
        </div>
      )}
    </div>
  );
}
