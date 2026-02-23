import { Router, Request, Response } from 'express';
import { requireAdmin } from './middleware';

const router = Router();

const settings = {
  maintenanceMode: false,
  creatorCode: 'JOJOJO',
};

router.get('/', requireAdmin, (_req: Request, res: Response) => {
  res.json(settings);
});

router.put('/', requireAdmin, (req: Request, res: Response) => {
  const { maintenanceMode, creatorCode } = req.body as {
    maintenanceMode?: boolean;
    creatorCode?: string;
  };
  if (maintenanceMode !== undefined) settings.maintenanceMode = maintenanceMode;
  if (creatorCode !== undefined) settings.creatorCode = creatorCode;
  res.json(settings);
});

export default router;
