import { Router } from 'express';
import usersRouter from './users';
import salesRouter from './sales';
import productsRouter from './products';
import analyticsRouter from './analytics';
import settingsRouter from './settings';

const router = Router();
router.use('/users', usersRouter);
router.use('/sales', salesRouter);
router.use('/products', productsRouter);
router.use('/analytics', analyticsRouter);
router.use('/settings', settingsRouter);
export default router;
