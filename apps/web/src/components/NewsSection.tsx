import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NewsItem {
  id: number;
  title: string;
  teaser: string;
  date: string;
  tag: string;
  color: string;
  icon: string;
}

const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: '🏆 ZYZTM ERREICHT 1 MILLION YOUTUBE-ABONNENTEN!',
    teaser:
      'Nach Jahren harter Arbeit und tausenden Stunden Stream-Content hat Zyztm die magische Marke von 1.054.400 YouTube-Abonnenten geknackt. Der Weg dahin: täglich Fortnite-Clips, IRL-Momente und die beste Community im deutschsprachigen Raum.',
    date: '3. Jan 2025',
    tag: 'MILESTONE',
    color: '#ff0000',
    icon: '📺',
  },
  {
    id: 2,
    title: '📅 NEUE STREAM-ZEITEN FÜR 2026 BEKANNT GEGEBEN',
    teaser:
      'Zyztm hat seinen offiziellen Stream-Plan für 2026 enthüllt: Mo 13–18 Uhr, Di 12–17:40 Uhr, Mi 10–15:10 Uhr, Do 10:40–19:20 Uhr. Mit 28.518 Kick-Followern und durchschnittlich 159 Zuschauern liefert er täglich – mark your calendars!',
    date: '10. Feb 2026',
    tag: 'ANNOUNCEMENT',
    color: '#00f2ff',
    icon: '📅',
  },
  {
    id: 3,
    title: '🤖 DEEPI BRO – DER KI-GAMING-KUMPEL IST DA!',
    teaser:
      'Zyztm launcht seinen eigenen KI-Chatbot: Deepi Bro. Powered by Gemini AI, labert er wie Zyztm, kennt alle Fortnite-Tipps und hat drei Moods: Chill, Tryhard und Lustig. Teste ihn jetzt live im NEXUS!',
    date: '24. Feb 2026',
    tag: 'FEATURE',
    color: '#a335ee',
    icon: '🤖',
  },
  {
    id: 4,
    title: '📈 REKORD AUF KICK: 3.598 ZUSCHAUER FEIERN ZYZTM!',
    teaser:
      'In seinem bisher größten Stream brach Zyztm alle Rekorde mit 3.598 gleichzeitigen Zuschauern auf Kick. Mit 651.600 TikTok-Followern, 13,5 Millionen Likes und einem Engagement von 8,24% ist er einer der aufstrebendsten Creator Deutschlands.',
    date: '15. Jan 2025',
    tag: 'RECORD',
    color: '#ffd700',
    icon: '🔥',
  },
];

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>(FALLBACK_NEWS);

  useEffect(() => {
    fetch('/api/news/latest')
      .then((r) => r.json())
      .then((data) => {
        if (data.news && data.news.length > 0) setNews(data.news);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            LATEST <span className="text-neon-blue neon-text-blue">NEWS</span>
          </h2>
          <p className="text-white/50">Das Neuste rund um Zyztm</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {news.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 12px 40px ${item.color}25` }}
              className="cyber-card rounded-xl overflow-hidden cursor-pointer flex flex-col"
              style={{ borderColor: `${item.color}25` }}
            >
              <div
                className="h-36 flex items-center justify-center text-6xl relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}05)` }}
              >
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                >
                  {item.icon}
                </motion.span>
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.color}60, transparent)` }}
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-cyber px-2 py-0.5 border tracking-widest rounded"
                    style={{ color: item.color, borderColor: `${item.color}40`, background: `${item.color}10` }}
                  >
                    {item.tag}
                  </span>
                  <span className="text-white/35 text-xs">{item.date}</span>
                </div>
                <h3 className="font-cyber text-sm font-bold text-white mb-3 leading-snug flex-1">
                  {item.title}
                </h3>
                <p className="text-white/55 text-xs leading-relaxed line-clamp-3">{item.teaser}</p>
                <div className="mt-4">
                  <span className="text-xs font-cyber tracking-wider" style={{ color: item.color }}>
                    WEITERLESEN →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
