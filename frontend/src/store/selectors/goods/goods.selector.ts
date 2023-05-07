import type { TRootState } from '../../redux.store.type';

const goodsSelector = (state: TRootState) => state.goods;
const goodsOffsetSelector = (state: TRootState) => state.goods.offset;
const goodsOffsetPerPageSelector = (state: TRootState) => state.goods.offsetPerPage;
const goodsLoadingStatusSelector = (state: TRootState) => state.goods.loadingStatus;
const goodsErrorSelector = (state: TRootState) => state.goods.error;
const goodsCategoriesSelector = (state: TRootState) => state.goods.categories;
const goodsSubCategoriesSelector = (state: TRootState) => state.goods.subCategories;
const goodsSelectedCategorySelector = (state: TRootState) => state.goods.selectedCategory;
const goodsSelectedSubCategorySelector = (state: TRootState) => state.goods.selectedSubCategory;
const goodsEntitiesSelector = (state: TRootState) => state.goods.entities;

export {
  goodsSelector,
  goodsOffsetSelector,
  goodsOffsetPerPageSelector,
  goodsLoadingStatusSelector,
  goodsErrorSelector,
  goodsCategoriesSelector,
  goodsSubCategoriesSelector,
  goodsSelectedCategorySelector,
  goodsSelectedSubCategorySelector,
  goodsEntitiesSelector,
};
