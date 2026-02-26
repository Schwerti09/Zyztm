import { Router, Request, Response } from 'express';

const router = Router();

const NEWS_ITEMS = [
  {
    id: 1,
    title: '🏆 ZYZTM ERREICHT 1 MILLION YOUTUBE-ABONNENTEN!',
    teaser:
      'Nach Jahren harter Arbeit und tausenden Stunden Stream-Content hat Zyztm die magische Marke von 1.054.400 YouTube-Abonnenten geknackt. Der Weg dahin: täglich Fortnite-Clips, IRL-Momente und die beste Community im deutschsprachigen Raum.',
    date: '3. Jan 2025',
    tag: 'MILESTONE',
    color: '#ff0000',
    icon: '📺',
    link: 'https://www.youtube.com/@Zyztm',
    image: 'https://yt3.googleusercontent.com/ytc/AIdro_ki5TqFLW8PUMgHkDR_XZ2yxPkE5dCE9sC0Jw9RMA=s900-c-k-c0x00ffffff-no-rj',
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
    link: 'https://kick.com/zyztm',
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
    link: 'https://discord.gg/zyztm',
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
    link: 'https://kick.com/zyztm/videos',
  },
];

router.get('/latest', (_req: Request, res: Response) => {
  return res.json({ news: NEWS_ITEMS });
});

export default router;
