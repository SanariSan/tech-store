import type { NextFunction, Response } from 'express';
import type { TRequestNarrowed } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

export const categoriesCTR = (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  const categories = [
    {
      title: 'laptops',
      modifiers: [
        {
          title: 'gaming',
        },
        {
          title: 'work',
        },
        {
          title: 'chill',
        },
      ],
    },
    {
      title: 'phones',
      modifiers: [
        {
          title: 'hi-tech',
        },
        {
          title: 'goofy',
        },
        {
          title: 'boomer',
        },
      ],
    },
    {
      title: 'accessories',
      modifiers: [
        {
          title: 'charger',
        },
        {
          title: 'headphones',
        },
      ],
    },
  ];

  return new SuccessResponse({
    res,
    data: {
      categories,
    },
  }).send();
};
