import { Router } from 'express';
import {
  EVALIDATION_TARGET,
  asyncHandleMW,
  syncHandleMW,
  validateBySchemaAsyncMW,
} from '../../../../../middleware';
import { categoriesCTR, entitiesCTR } from '../../../../../controllers';
import { SCHEME_GOODS } from '../../../../../schemes';

const entityR = Router();

entityR.get('/categories', syncHandleMW(categoriesCTR));

entityR.get(
  '/entitities',
  asyncHandleMW(validateBySchemaAsyncMW(SCHEME_GOODS.entitities, EVALIDATION_TARGET.QUERY)),
  syncHandleMW(entitiesCTR),
);

// moved to nginx
// entityR.get(
//   '/assets/:quality/:filename',
//   asyncHandleMW(validateBySchemaAsyncMW(SCHEME_GOODS.assets, EVALIDATION_TARGET.PARAM)),
//   syncHandleMW(assetsCTR),
// );

// entityR.get(
//   '/entitity-:id',
//   syncHandleMW(entityCTR),
// );

export { entityR };
