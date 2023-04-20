import type {
  TGoodsCategoriesIncomingSuccessFields,
  TGoodsEntitiesIncomingSuccessFields,
} from '../../../services/api';

type TLoadingStatus = 'idle' | 'loading' | 'success' | 'failure';
type TGoodsInitState = {
  entities: TGoodsEntitiesIncomingSuccessFields['data']['entities'];
  categories: TGoodsCategoriesIncomingSuccessFields['data']['categories'];
  subCategories: TGoodsCategoriesIncomingSuccessFields['data']['subCategories'];
  perPage: number;
  loadingStatus: TLoadingStatus;
  error: string | undefined;
};

export type { TGoodsInitState, TLoadingStatus };
