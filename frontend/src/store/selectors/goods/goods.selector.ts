import { createSelector } from '@reduxjs/toolkit';
import type { TRootState } from '../../redux.store.type';

const goodsSelector = (state: TRootState) => state.goods;
const goodsHasMoreEntitiesSelector = (state: TRootState) => state.goods.hasMoreEntities;
const goodsTotalEntitiesQtySelector = (state: TRootState) => state.goods.totalQty;
const goodsOffsetSelector = (state: TRootState) => state.goods.offset;
const goodsOffsetPerPageSelector = (state: TRootState) => state.goods.offsetPerPage;
const goodsLoadingStatusSelector = (state: TRootState) => state.goods.loadingStatus;
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
        // @ts-expect-error ts is trippin, hash[entity.id] can't be undefined...
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
const goodsIsInLikedSelector = ({ id: targetId }: { id: string }) =>
  createSelector(goodsLikedEntitiesSelector, (likedEntities) =>
    likedEntities.some(({ id }) => id === targetId),
  );

export {
  goodsSelector,
  goodsHasMoreEntitiesSelector,
  goodsTotalEntitiesQtySelector,
  goodsOffsetSelector,
  goodsOffsetPerPageSelector,
  goodsLoadingStatusSelector,
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
  goodsIsInLikedSelector,
};
