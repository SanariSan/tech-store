import type {
  TGoodsCategoriesIncomingSuccessFields,
  TGoodsEntitiesIncomingSuccessFields,
} from '../../../services/api';

type TEntities = TGoodsEntitiesIncomingSuccessFields['data']['entities'];
type TCategories = TGoodsCategoriesIncomingSuccessFields['data']['categories'];
type TLoadingStatus = 'idle' | 'loading' | 'success' | 'failure';
type TSelectedCategory = Exclude<TCategories, undefined>[number];
type TSelectedModifier = Exclude<TSelectedCategory['modifiers'], undefined>[number];
type TSelectedRoute = { title: string; pathname: string };

type TGoodsInitState = {
  entities: TEntities;
  likedEntities: TEntities;
  categories: TCategories;
  cart: TEntities;
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
  TEntities,
  TCategories,
  TSelectedCategory,
  TSelectedModifier,
  TGoodsInitState,
  TLoadingStatus,
  TSelectedRoute,
};
