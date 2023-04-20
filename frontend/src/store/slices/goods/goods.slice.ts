import { createSlice } from '@reduxjs/toolkit';
import { GOODS_INIT_STATE } from './goods.slice.const';
import type { TLoadingStatus } from './goods.slice.type';
import type {
  TGoodsCategoriesIncomingSuccessFields,
  TGoodsEntitiesIncomingSuccessFields,
  TGoodsEntitiesOutgoingFields,
} from '../../../services/api';

/* eslint-disable no-param-reassign */

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
      state.categories = action.payload.categories;
      state.subCategories = action.payload.subCategories;
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
    getEntitiesAsync(
      state,
      action: { payload: Partial<TGoodsEntitiesOutgoingFields>; type: string },
    ) {},
  },
});

const goods = goodsSlice.reducer;
const { setCategories, pushEntities, setGoodsLoadStatus, getCategoriesAsync, getEntitiesAsync } =
  goodsSlice.actions;

export {
  goods,
  setCategories,
  pushEntities,
  setGoodsLoadStatus,
  getCategoriesAsync,
  getEntitiesAsync,
};
