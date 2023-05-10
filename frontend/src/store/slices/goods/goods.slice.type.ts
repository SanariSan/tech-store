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

type TGoodsInitState = {
  entities: TGoodsEntitiesIncomingSuccessFields['data']['entities'];
  categories: TGoodsCategoriesIncomingSuccessFields['data']['categories'];
  selectedSection: string;
  selectedCategory: TSelectedCategory | undefined;
  selectedCategoryRoute: string[];
  selectedModifier: TSelectedModifier | undefined;
  offset: number;
  offsetPerPage: number;
  loadingStatus: TLoadingStatus;
  error: string | undefined;
};

export type { TSelectedCategory, TSelectedModifier, TGoodsInitState, TLoadingStatus };
