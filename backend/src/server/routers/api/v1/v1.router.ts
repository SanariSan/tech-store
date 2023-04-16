import { Router } from 'express';
import { accessR } from './access';
import { goodsR } from './goods';

const v1 = Router();

v1.use('/access', accessR);
v1.use('/goods', goodsR);

export { v1 };
