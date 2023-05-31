import type {
  TGoodsCategoriesIncomingSuccessFields,
  TGoodsEntitiesIncomingSuccessFields,
} from '../../../services/api';
import type { TLoadingStatus } from '../slices.type';

type TEntities = TGoodsEntitiesIncomingSuccessFields['data']['entities'];
type TCategories = TGoodsCategoriesIncomingSuccessFields['data']['categories'];
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
  hasMoreEntities: boolean;
  totalQty: number;
  loadingStatus: TLoadingStatus;
};

export type {
  TEntities,
  TCategories,
  TSelectedCategory,
  TSelectedModifier,
  TGoodsInitState,
  TSelectedRoute,
};
