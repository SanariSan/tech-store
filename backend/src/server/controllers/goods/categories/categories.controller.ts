import type { NextFunction, Response } from 'express';
import type { TRequestNarrowed } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

export const categoriesCTR = (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  const categories = [
    {
      title: 'laptops',
      sub: [
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
      sub: [
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
      sub: [
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
    // {
    //   categories: ['laptops', 'phones', 'accessories'],
    //   subCategories: {
    //     laptops: ['gaming', 'work', 'chill'],
    //     phones: ['hi-tech', 'goofy', 'boomer'],
    //     accessories: ['charger', 'headphones'],
    //   },
    // },
  }).send();
};
