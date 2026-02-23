import { Router, Request, Response } from 'express';

const router = Router();

const NEWS_ITEMS = [
  {
    id: 1,
    title: '🏆 ZYZTM GEWINNT FORTNITE TURNIER!',
    teaser:
      'Was für eine Nacht! Zyztm hat beim offiziellen Fortnite Creator Cup den ersten Platz abgeräumt und damit 10.000€ Preisgeld gewonnen. Die Community war ausgerastet!',
    date: '15. Jan 2025',
    tag: 'TOURNAMENT',
    color: '#ffd700',
  },
  {
    id: 2,
    title: '🚀 1 MILLION YOUTUBE ABONNENTEN GEKNACKT!',
    teaser:
      'Diggah, wir haben es geschafft! Der Kanal hat die 1 Million Abonnenten Marke geknackt. Zur Feier gibt es ein exklusives Merch Drop und eine 24h Livestream Celebration!',
    date: '3. Jan 2025',
    tag: 'MILESTONE',
    color: '#ff0055',
  },
  {
    id: 3,
    title: '🎮 NEUE SEASON, NEUES GLÜCK!',
    teaser:
      'Fortnite Season X bringt krasse neue Features! Zyztm erklärt alle neuen Mechanics, die besten Drop Spots und welche Waffen jetzt der absolute Meta sind.',
    date: '28. Dez 2024',
    tag: 'GAMING',
    color: '#00f2ff',
  },
];

router.get('/latest', (_req: Request, res: Response) => {
  return res.json({ news: NEWS_ITEMS });
});

export default router;
