import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import healthRouter from './routes/health';
import stripeRouter from './routes/stripe';
import voiceRouter from './routes/voice';
import chatbotRouter from './routes/chatbot';
import cardsRouter from './routes/cards';
import youtubeRouter from './routes/youtube';
import newsRouter from './routes/news';
import adminRouter from './routes/admin/index';
import coinsRouter from './routes/coins';
import voteRouter from './routes/vote';
import clipsRouter from './routes/clips';
import tiktokRouter from './routes/tiktok';
import galleryRouter from './routes/gallery';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Stripe webhook needs raw body
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/voice', voiceRouter);
app.use('/api/chatbot', chatbotRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/youtube', youtubeRouter);
app.use('/api/news', newsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/coins', coinsRouter);
app.use('/api/vote', voteRouter);
app.use('/api/clips', clipsRouter);
app.use('/api/tiktok', tiktokRouter);
app.use('/api/gallery', galleryRouter);

app.listen(PORT, () => {
  console.log(`🚀 Zyztm API running on port ${PORT}`);
});

export default app;
