import { createSlice } from '@reduxjs/toolkit';
import type {
  IGoodsEntitiesOutgoingDTO,
  TCategories,
  TEntity,
  TSubCategories,
} from '../../../services/api';
import { GOODS_INIT_STATE } from './goods.slice.const';
import type { TLoadingStatus } from './goods.slice.type';

/* eslint-disable no-param-reassign */

const goodsSlice = createSlice({
  name: 'goods',
  initialState: GOODS_INIT_STATE,
  reducers: {
    setCategories(
      state,
      action: { payload: { categories: TCategories; subCategories: TSubCategories }; type: string },
    ) {
      state.categories = action.payload.categories;
      state.subCategories = action.payload.subCategories;
    },
    pushEntities(state, action: { payload: { entities: TEntity[] }; type: string }) {
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
    getEntitiesAsync(state, action: { payload: IGoodsEntitiesOutgoingDTO; type: string }) {},
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
