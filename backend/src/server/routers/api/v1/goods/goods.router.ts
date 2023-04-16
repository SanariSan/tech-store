import { Router } from 'express';
import { entityR } from './entity';

const goodsR = Router();

goodsR.use(entityR);

export { goodsR };
