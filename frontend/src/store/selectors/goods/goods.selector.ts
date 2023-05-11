import type { TRootState } from '../../redux.store.type';

const goodsSelector = (state: TRootState) => state.goods;
const goodsOffsetSelector = (state: TRootState) => state.goods.offset;
const goodsOffsetPerPageSelector = (state: TRootState) => state.goods.offsetPerPage;
const goodsLoadingStatusSelector = (state: TRootState) => state.goods.loadingStatus;
const goodsErrorSelector = (state: TRootState) => state.goods.error;
const goodsCategoriesSelector = (state: TRootState) => state.goods.categories;
const goodsSelectedSectionSelector = (state: TRootState) => state.goods.selectedSection;
const goodsSelectedCategorySelector = (state: TRootState) => state.goods.selectedCategory;
const goodsSelectedModifierSelector = (state: TRootState) => state.goods.selectedModifier;
const goodsSelectedCategoryRouteSelector = (state: TRootState) => state.goods.selectedCategoryRoute;
const goodsEntitiesSelector = (state: TRootState) => state.goods.entities;

export {
  goodsSelector,
  goodsOffsetSelector,
  goodsOffsetPerPageSelector,
  goodsLoadingStatusSelector,
  goodsErrorSelector,
  goodsCategoriesSelector,
  goodsSelectedSectionSelector,
  goodsSelectedCategorySelector,
  goodsSelectedModifierSelector,
  goodsSelectedCategoryRouteSelector,
  goodsEntitiesSelector,
};
