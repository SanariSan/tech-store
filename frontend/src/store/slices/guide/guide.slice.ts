import { createSlice } from '@reduxjs/toolkit';
import { GUIDE_INIT_STATE } from './guide.slice.const';

/* eslint-disable no-param-reassign */

const guideSlice = createSlice({
  name: 'guide',
  initialState: GUIDE_INIT_STATE,
  reducers: {
    setHasTriedThemeChange(state, action: { payload: boolean }) {
      state.hasTriedThemeChange = action.payload;
    },
    setHasTriedOpeningCart(state, action: { payload: boolean }) {
      state.hasTriedOpeningCart = action.payload;
    },
    setHasTriedAuth(state, action: { payload: boolean }) {
      state.hasTriedAuth = action.payload;
    },
  },
});

const guide = guideSlice.reducer;
const { setHasTriedThemeChange, setHasTriedOpeningCart, setHasTriedAuth } = guideSlice.actions;

export { guide, setHasTriedThemeChange, setHasTriedOpeningCart, setHasTriedAuth };
