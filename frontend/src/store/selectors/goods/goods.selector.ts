import type { TRootState } from '../../redux.store.type';

const goodsLoadingStatusSelector = (state: TRootState) => state.goods.loadingStatus;
const goodsErrorSelector = (state: TRootState) => state.goods.error;
const goodsCategoriesSelector = (state: TRootState) => state.goods.categories;
const goodsSubCategoriesSelector = (state: TRootState) => state.goods.subCategories;
const goodsEntitiesSelector = (state: TRootState) => state.goods.entities;

export {
  goodsLoadingStatusSelector,
  goodsErrorSelector,
  goodsCategoriesSelector,
  goodsSubCategoriesSelector,
  goodsEntitiesSelector,
};
