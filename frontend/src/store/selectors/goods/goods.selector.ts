import { createSelector } from '@reduxjs/toolkit';
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
const goodsLikedEntitiesSelector = (state: TRootState) => state.goods.likedEntities;
const goodsCartEntitiesSelector = (state: TRootState) => state.goods.cart;
const goodsCartEntitiesStackedSelector = createSelector(
  goodsCartEntitiesSelector,
  (cartEntities) => {
    type TModifiedCartEntity = TRootState['goods']['cart'][number] & { qty: number };
    const hash = new Map<string, TModifiedCartEntity | undefined>();

    cartEntities.forEach((entity) => {
      if (hash.has(entity.id)) {
        // @ts-expect-error ts is trippin, acc[entity.id] can't be undefined...
        hash.get(entity.id).qty += 1;
        return;
      }
      hash.set(entity.id, { ...entity, qty: 1 });
    });

    const out = [...hash.values()];

    return out as TModifiedCartEntity[];
  },
);
const goodsCartEntitiesPriceSelector = createSelector(goodsCartEntitiesSelector, (cartEntities) =>
  cartEntities.reduce((acc, entity) => acc + entity.price, 0),
);
const goodsLikedEntitiesIdsSelector = createSelector(goodsLikedEntitiesSelector, (likedEntities) =>
  likedEntities.map(({ id }) => id),
);

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
  goodsLikedEntitiesSelector,
  goodsCartEntitiesSelector,
  goodsLikedEntitiesIdsSelector,
  goodsCartEntitiesStackedSelector,
  goodsCartEntitiesPriceSelector,
};
