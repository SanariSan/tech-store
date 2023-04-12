import type { NextFunction, Response } from 'express';
import type { TRequestNarrowed } from '../../../express.type';
import { CATALOGUE } from '../../../../logic/catalogue';
import { InternalErrorResponse, SuccessResponse } from '../../../responses';
import { publishLog } from '../../../../modules/access-layer/events/pubsub';
import { ELOG_LEVEL } from '../../../../general.type';

// ?category=laptops|phones|accessories
// ?subCategory='gaming', 'work', 'chill' | 'hi-tech', 'goofy', 'boomer' | 'charger', 'headphones'
// ?page=1|2|3...

type TLaptops = {
  category: 'laptops';
  subCategory: 'gaming' | 'work' | 'chill';
};

type TPhones = {
  category: 'phones';
  subCategory: 'hi-tech' | 'goofy' | 'boomer';
};

type TAccessories = {
  category: 'accessories';
  subCategory: 'charger' | 'headphones';
};

type TQueryParams = (Partial<TLaptops> | Partial<TPhones> | Partial<TAccessories>) & {
  page?: number;
};

export const entitiesCTR = (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  const { category, subCategory, page = 1 }: TQueryParams = req.query;
  const perPage = 20;

  publishLog(ELOG_LEVEL.INFO, req.query);

  if (Number.isNaN(Number(page))) {
    return new InternalErrorResponse({
      res,
      miscellaneous: {},
    });
  }

  const filtered = CATALOGUE.filter((el, idx) => {
    if (category === undefined) {
      return true;
    }
    if (category !== el.category) {
      return false;
    }

    if (subCategory === undefined) {
      return true;
    }
    if (subCategory !== el.subCategory) {
      return false;
    }

    return true;
  });

  const maxPages = Math.ceil(filtered.length / perPage);
  const start = Number(page) - 1 < maxPages ? Number(page) - 1 : maxPages - 1;
  const sliced = filtered.slice(start * perPage, Number(page) * perPage);

  return new SuccessResponse({
    res,
    data: {
      entities: sliced,
    },
  }).send();
};
