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
  link: string;
  image?: string;
}

const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: '🏆 FORTNITE NEXUS ERREICHT 356.000 YOUTUBE-ABONNENTEN!',
    teaser:
      'Nach Jahren harter Arbeit und tausenden Stunden Content hat Fortnite Nexus die Marke von 356.000 YouTube-Abonnenten geknackt. Der Weg dahin: täglich Fortnite-Clips, Guides und die beste Community im deutschsprachigen Raum.',
    date: '3. Jan 2025',
    tag: 'MILESTONE',
    color: '#ff0000',
    icon: '📺',
    link: 'https://www.youtube.com/@FortniteNexusDE',
    image: 'https://yt3.googleusercontent.com/ytc/AIdro_ki5TqFLW8PUMgHkDR_XZ2yxPkE5dCE9sC0Jw9RMA=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    id: 2,
    title: '📅 NEUE STREAM-ZEITEN FÜR 2026 BEKANNT GEGEBEN',
    teaser:
      'Fortnite Nexus hat seinen offiziellen Content-Plan für 2026 enthüllt: Täglich neue Videos, Guides und Community-Events. Mit wachsenden Followerzahlen und täglichem Content liefert er konstant – mark your calendars!',
    date: '10. Feb 2026',
    tag: 'ANNOUNCEMENT',
    color: '#00f2ff',
    icon: '📅',
    link: 'https://youtube.com/@FortniteNexusDE',
  },
  {
    id: 3,
    title: '🤖 NEXUS BRO – DER KI-GAMING-KUMPEL IST DA!',
    teaser:
      'Fortnite Nexus launcht seinen eigenen KI-Chatbot: Nexus Bro. Powered by AI, labert er wie ein Gamer, kennt alle Fortnite-Tipps und hat drei Moods: Chill, Tryhard und Lustig. Teste ihn jetzt live im NEXUS!',
    date: '24. Feb 2026',
    tag: 'FEATURE',
    color: '#a335ee',
    icon: '🤖',
    link: 'https://discord.gg/fortnitenexus',
  },
  {
    id: 4,
    title: '📈 REKORD: FORTNITE NEXUS WÄCHST STÄNDIG!',
    teaser:
      'Mit wachsender Community auf YouTube, TikTok und Discord ist Fortnite Nexus einer der aufstrebendsten Fortnite-Content-Plattformen Deutschlands. Täglich neue Clips, Guides und Community-Events – bleib dran!',
    date: '15. Jan 2025',
    tag: 'RECORD',
    color: '#ffd700',
    icon: '🔥',
    link: 'https://youtube.com/@FortniteNexusDE',
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
          <p className="text-white/50">Das Neuste rund um Fortnite Nexus</p>
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
              className="cyber-card rounded-xl overflow-hidden cursor-pointer flex flex-col group"
              style={{ borderColor: `${item.color}25` }}
            >
              <div
                className="h-36 flex items-center justify-center text-6xl relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}05)` }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                    loading="lazy"
                  />
                ) : null}
                <motion.span
                  className="relative z-10"
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
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-cyber tracking-wider transition-opacity hover:opacity-70"
                    style={{ color: item.color }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    WEITERLESEN →
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
