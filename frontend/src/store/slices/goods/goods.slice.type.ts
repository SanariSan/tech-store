import type {
  TGoodsCategoriesIncomingSuccessFields,
  TGoodsEntitiesIncomingSuccessFields,
} from '../../../services/api';

type TLoadingStatus = 'idle' | 'loading' | 'success' | 'failure';
type TSelectedCategory = Exclude<
  TGoodsCategoriesIncomingSuccessFields['data']['categories'],
  undefined
>[number];
type TSelectedModifier = Exclude<TSelectedCategory['modifiers'], undefined>[number];
type TSelectedRoute = { title: string; pathname: string };

type TGoodsInitState = {
  entities: TGoodsEntitiesIncomingSuccessFields['data']['entities'];
  categories: TGoodsCategoriesIncomingSuccessFields['data']['categories'];
  selectedSection: TSelectedRoute;
  selectedCategory: TSelectedCategory | undefined;
  selectedCategoryRoute: TSelectedRoute[];
  selectedModifier: TSelectedModifier | undefined;
  offset: number;
  offsetPerPage: number;
  loadingStatus: TLoadingStatus;
  error: string | undefined;
};

export type {
  TSelectedCategory,
  TSelectedModifier,
  TGoodsInitState,
  TLoadingStatus,
  TSelectedRoute,
};
