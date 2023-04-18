import type { TCategories, TEntity, TSubCategories } from '../../../services/api';

type TLoadingStatus = 'idle' | 'loading' | 'success' | 'failure';

type TGoodsInitState = {
  entities: TEntity[];
  categories: TCategories;
  subCategories: TSubCategories;
  perPage: number;
  loadingStatus: TLoadingStatus;
  error: string | undefined;
};

export type { TGoodsInitState, TLoadingStatus };
