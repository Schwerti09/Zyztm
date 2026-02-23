import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NewsItem {
  id: number;
  title: string;
  teaser: string;
  date: string;
  tag: string;
  color: string;
}

const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: '🏆 ZYZTM GEWINNT FORTNITE TURNIER!',
    teaser: 'Was für eine Nacht! Zyztm hat beim offiziellen Fortnite Creator Cup den ersten Platz abgeräumt und damit 10.000€ Preisgeld gewonnen. Die Community war ausgerastet!',
    date: '15. Jan 2025',
    tag: 'TOURNAMENT',
    color: '#ffd700',
  },
  {
    id: 2,
    title: '🚀 1 MILLION YOUTUBE ABONNENTEN GEKNACKT!',
    teaser: 'Diggah, wir haben es geschafft! Der Kanal hat die 1 Million Abonnenten Marke geknackt. Zur Feier gibt es ein exklusives Merch Drop und eine 24h Livestream Celebration!',
    date: '3. Jan 2025',
    tag: 'MILESTONE',
    color: '#ff0055',
  },
  {
    id: 3,
    title: '🎮 NEUE SEASON, NEUES GLÜCK!',
    teaser: 'Fortnite Season X bringt krasse neue Features! Zyztm erklärt alle neuen Mechanics, die besten Drop Spots und welche Waffen jetzt der absolute Meta sind.',
    date: '28. Dez 2024',
    tag: 'GAMING',
    color: '#00f2ff',
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
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5 }}
              className="cyber-card rounded-lg overflow-hidden cursor-pointer"
            >
              <div
                className="h-40 flex items-center justify-center text-6xl"
                style={{ background: `linear-gradient(135deg, ${item.color}20, transparent)` }}
              >
                {item.title.split(' ')[0]}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-cyber px-2 py-1 border tracking-widest"
                    style={{ color: item.color, borderColor: `${item.color}40` }}
                  >
                    {item.tag}
                  </span>
                  <span className="text-white/40 text-xs">{item.date}</span>
                </div>
                <h3 className="font-cyber text-sm font-bold text-white mb-3 leading-tight">{item.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{item.teaser}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
