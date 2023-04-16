import type { NextFunction, Response } from 'express';
import { statSync } from 'fs';
import path from 'path';
import { ELOG_LEVEL } from '../../../../general.type';
import { publishLog } from '../../../../modules/access-layer/events/pubsub';
import type { TRequestNarrowed } from '../../../express.type';
import { NotFoundErrorResponse } from '../../../responses';

export const assetsCTR = (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  const { quality, filename } = req.params;

  publishLog(ELOG_LEVEL.INFO, { quality, filename });

  if (quality === 'l') {
    try {
      const p = path.join(process.cwd(), 'assets', 'l', filename);
      publishLog(ELOG_LEVEL.INFO, statSync(p));
      res.sendFile(p);
      return;
    } catch (error) {
      publishLog(ELOG_LEVEL.INFO, error);
    }
  } else if (quality === 'h') {
    try {
      const p = path.join(process.cwd(), 'assets', 'h', filename);
      publishLog(ELOG_LEVEL.INFO, statSync(p));
      res.sendFile(p);
      return;
    } catch (error) {
      publishLog(ELOG_LEVEL.INFO, error);
    }
  }

  return new NotFoundErrorResponse({ res }).send();
};
