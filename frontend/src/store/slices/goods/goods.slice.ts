import { createSlice, current } from '@reduxjs/toolkit';
import { GOODS_INIT_STATE } from './goods.slice.const';
import type { TLoadingStatus, TSelectedCategory, TSelectedRoute } from './goods.slice.type';
import type {
  TGoodsCategoriesIncomingSuccessFields,
  TGoodsEntitiesIncomingSuccessFields,
} from '../../../services/api';

/* eslint-disable no-param-reassign */

// recursive find of target nested object
function findCategory({
  categoriesArr,
  target,
  currRoute = [],
}: {
  categoriesArr: TGoodsCategoriesIncomingSuccessFields['data']['categories'];
  target?: string;
  currRoute?: TSelectedRoute[];
}) {
  if (categoriesArr === undefined) return;
  if (target === undefined) return;

  /* eslint-disable no-restricted-syntax */
  for (const entity of categoriesArr) {
    if (entity.title === target) {
      return {
        category: entity,
        categoryRoute: [...currRoute, { title: entity.title, pathname: entity.title }],
      };
    }
    if (entity.sub !== undefined) {
      findCategory({
        categoriesArr: entity.sub,
        target,
        currRoute: [...currRoute, { title: entity.title, pathname: entity.title }],
      });
    }
  }

  return;
}

function findModifier({ category, target }: { category?: TSelectedCategory; target?: string }) {
  if (category === undefined) return;
  if (category.modifiers === undefined) return;
  if (target === undefined) return;

  for (const modifier of category.modifiers) {
    if (modifier.title === target) {
      return { modifier };
    }
  }

  return;
}

const goodsSlice = createSlice({
  name: 'goods',
  initialState: GOODS_INIT_STATE,
  reducers: {
    setSelectedSection(
      state,
      action: {
        payload: {
          section: TSelectedRoute;
        };
        type: string;
      },
    ) {
      if (state.selectedSection.title !== action.payload.section.title) {
        state.selectedSection = action.payload.section;
      }
    },
    setCategories(
      state,
      action: {
        payload: {
          categories: TGoodsCategoriesIncomingSuccessFields['data']['categories'];
        };
        type: string;
      },
    ) {
      state.categories = action.payload.categories;
    },
    setSelectedCategory(
      state,
      action: {
        payload: {
          category: string | undefined;
        };
        type: string;
      },
    ) {
      if (state.selectedCategory === action.payload.category) {
        return;
      }

      state.entities.length = 0;
      state.offset = 0;

      if (action.payload.category === undefined) {
        state.selectedCategory = undefined;
        state.selectedCategoryRoute.length = 0;
        return;
      }

      const result = findCategory({
        categoriesArr: current(state.categories),
        target: action.payload.category,
      });

      console.log('Found', result);

      if (result !== undefined) {
        state.selectedCategory = result.category;
        state.selectedCategoryRoute = result.categoryRoute;
      }
    },
    setSelectedModifier(
      state,
      action: {
        payload: {
          modifier: string | undefined;
        };
        type: string;
      },
    ) {
      if (state.selectedModifier === action.payload.modifier) {
        return;
      }

      state.entities.length = 0;
      state.offset = 0;

      if (action.payload.modifier === undefined) {
        state.selectedModifier = undefined;
        return;
      }

      const result = findModifier({
        category: current(state.selectedCategory),
        target: action.payload.modifier,
      });

      if (result !== undefined) {
        state.selectedModifier = result.modifier;
      }
    },
    increaseOffset(
      state,
      action: {
        payload: undefined;
        type: string;
      },
    ) {
      state.offset += state.offsetPerPage;
    },
    pushEntities(
      state,
      action: {
        payload: { entities: TGoodsEntitiesIncomingSuccessFields['data']['entities'] };
        type: string;
      },
    ) {
      state.entities.push(...action.payload.entities);
    },
    pushLikedEntity(
      state,
      action: {
        payload: {
          entityId: TGoodsEntitiesIncomingSuccessFields['data']['entities'][number]['id'];
        };
        type: string;
      },
    ) {
      const targetEntity = current(state.entities).find(
        (entity) => entity.id === action.payload.entityId,
      );
      const isInLiked = current(state.likedEntities).some(
        (entity) => entity.id === action.payload.entityId,
      );

      if (targetEntity !== undefined && !isInLiked) {
        state.likedEntities.push(targetEntity);
      }
    },
    removeLikedEntity(
      state,
      action: {
        payload: {
          entityId: TGoodsEntitiesIncomingSuccessFields['data']['entities'][number]['id'];
        };
        type: string;
      },
    ) {
      const targetIdx = state.likedEntities.findIndex((el) => el.id === action.payload.entityId);

      if (targetIdx !== -1) {
        state.likedEntities.splice(targetIdx, 1);
      }
    },
    setGoodsLoadStatus(
      state,
      action: { payload: { status: TLoadingStatus; error?: unknown }; type: string },
    ) {
      state.loadingStatus = action.payload.status;

      if (action.payload.status === 'failure' && action.payload.error !== undefined) {
        state.error = JSON.stringify(action.payload.error);
      }
    },
    // sagas
    getCategoriesAsync() {},
    fetchMoreEntitiesAsync(state, action: { payload: undefined; type: string }) {},
  },
});

const goods = goodsSlice.reducer;
const {
  setCategories,
  setSelectedSection,
  setSelectedCategory,
  setSelectedModifier,
  increaseOffset,
  pushEntities,
  pushLikedEntity,
  removeLikedEntity,
  setGoodsLoadStatus,
  getCategoriesAsync,
  fetchMoreEntitiesAsync,
} = goodsSlice.actions;

export {
  goods,
  setCategories,
  setSelectedSection,
  setSelectedCategory,
  setSelectedModifier,
  increaseOffset,
  pushEntities,
  pushLikedEntity,
  removeLikedEntity,
  setGoodsLoadStatus,
  getCategoriesAsync,
  fetchMoreEntitiesAsync,
};
