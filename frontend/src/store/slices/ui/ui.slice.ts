import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isCartOpened: false,
  },
  reducers: {
    setIsCartOpened(state, action: { payload: { isOpened: boolean } }) {
      state.isCartOpened = action.payload.isOpened;
    },
  },
});

const ui = uiSlice.reducer;
const { setIsCartOpened } = uiSlice.actions;

export { ui, setIsCartOpened };
