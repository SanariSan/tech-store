import type { NextFunction, Response } from 'express';
import type { TRequestNarrowed } from '../../../express.type';
import { CATALOGUE } from '../../../../logic/catalogue';
import { SuccessResponse } from '../../../responses';
import { publishLog } from '../../../../modules/access-layer/events/pubsub';
import { ELOG_LEVEL } from '../../../../general.type';

// ?category=laptops|phones|accessories
// ?subCategory='gaming', 'work', 'chill' | 'hi-tech', 'goofy', 'boomer' | 'charger', 'headphones'
// ?offset=20
// ?qty=20

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
  qty?: number;
  offset?: number;
};

export const entitiesCTR = (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  const { category, subCategory, qty = 20, offset = 0 }: TQueryParams = req.query;

  publishLog(ELOG_LEVEL.INFO, req.query);

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

  const from = offset < filtered.length ? offset : filtered.length;
  const to = offset + qty < filtered.length ? offset + qty : filtered.length;
  const sliced = filtered.slice(from, to);

  return new SuccessResponse({
    res,
    data: {
      entities: sliced,
    },
  }).send();
};
