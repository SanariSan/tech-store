import type { NextFunction, Response } from 'express';
import type { TRequestNarrowed } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

export const categoriesCTR = (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  let x;

  return new SuccessResponse({
    res,
    data: {
      categories: ['laptops', 'phones', 'accessories'],
      subCategories: {
        laptops: ['gaming', 'work', 'chill'],
        phones: ['hi-tech', 'goofy', 'boomer'],
        accessories: ['charger', 'headphones'],
      },
    },
  }).send();
};
