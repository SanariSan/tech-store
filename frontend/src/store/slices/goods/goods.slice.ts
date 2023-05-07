import { createSlice } from '@reduxjs/toolkit';
import { GOODS_INIT_STATE } from './goods.slice.const';
import type { TLoadingStatus } from './goods.slice.type';
import type {
  TGoodsCategoriesIncomingSuccessFields,
  TGoodsEntitiesIncomingSuccessFields,
} from '../../../services/api';

/* eslint-disable no-param-reassign */

// TODO: possibly modify entities state to not flush all entities on category change,
// but cache them per category instead (side effect: if entites on backend changed, then user gets wrong info)

const goodsSlice = createSlice({
  name: 'goods',
  initialState: GOODS_INIT_STATE,
  reducers: {
    setCategories(
      state,
      action: {
        payload: {
          categories: TGoodsCategoriesIncomingSuccessFields['data']['categories'];
          subCategories: TGoodsCategoriesIncomingSuccessFields['data']['subCategories'];
        };
        type: string;
      },
    ) {
      state.offset = 0;
      state.categories = action.payload.categories;
      state.subCategories = action.payload.subCategories;
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
      state.entities.length = 0;
      state.offset = 0;
      state.selectedCategory = action.payload.category;
    },
    setSelectedSubCategory(
      state,
      action: {
        payload: {
          subCategory: string | undefined;
        };
        type: string;
      },
    ) {
      state.entities.length = 0;
      state.offset = 0;
      state.selectedSubCategory = action.payload.subCategory;
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
  setSelectedCategory,
  setSelectedSubCategory,
  increaseOffset,
  pushEntities,
  setGoodsLoadStatus,
  getCategoriesAsync,
  fetchMoreEntitiesAsync,
} = goodsSlice.actions;

export {
  goods,
  setCategories,
  setSelectedCategory,
  setSelectedSubCategory,
  increaseOffset,
  pushEntities,
  setGoodsLoadStatus,
  getCategoriesAsync,
  fetchMoreEntitiesAsync,
};
