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
  category?: 'laptops';
  subCategory?: 'gaming' | 'work' | 'chill';
};

type TPhones = {
  category?: 'phones';
  subCategory?: 'hi-tech' | 'goofy' | 'boomer';
};

type TAccessories = {
  category?: 'accessories';
  subCategory?: 'charger' | 'headphones';
};

type TQueryParams = (Partial<TLaptops> | Partial<TPhones> | Partial<TAccessories>) & {
  qty?: string;
  offset?: string;
};

export const entitiesCTR = (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  const { category, subCategory, qty = '20', offset = '0' }: TQueryParams = req.query;

  publishLog(ELOG_LEVEL.INFO, req.query);

  const filtered = CATALOGUE.filter((el, idx) => {
    if (category === undefined) {
      // if no category passed = any category is good
      return true;
    }
    if (category !== el.category) {
      // if category is passed, but not matched = skip
      return false;
    }

    if (subCategory === undefined) {
      // if no sub category passed = any sub category within matched category is good
      return true;
    }
    if (subCategory !== el.subCategory) {
      // if sub category is passed, but not matched = skip
      return false;
    }

    // if all matched = good
    return true;
  });

  const qtyNum = Number(qty);
  const offsetNum = Number(offset);

  const from = offsetNum < filtered.length ? offsetNum : filtered.length;
  const to = offsetNum + qtyNum < filtered.length ? offsetNum + qtyNum : filtered.length;
  const sliced = filtered.slice(from, to);

  return new SuccessResponse({
    res,
    data: {
      entities: sliced,
    },
  }).send();
};
