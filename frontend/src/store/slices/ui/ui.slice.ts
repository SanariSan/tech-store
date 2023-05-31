import { createSlice } from '@reduxjs/toolkit';
import { UI_INIT_STATE } from './ui.slice.const';
import type { TMessage } from './ui.slice.type';

/* eslint-disable no-param-reassign */

const uiSlice = createSlice({
  name: 'ui',
  initialState: UI_INIT_STATE,
  reducers: {
    setSuccessMessage(state, action: { payload: TMessage | undefined }) {
      state.successMessage = action.payload;
    },
    setWarningMessage(state, action: { payload: TMessage | undefined }) {
      state.warningMessage = action.payload;
    },
    setInfoMessage(state, action: { payload: TMessage | undefined }) {
      state.infoMessage = action.payload;
    },
    setErrorMessage(state, action: { payload: TMessage | undefined }) {
      state.errorMessage = action.payload;
    },
    setIsCartOpened(state, action: { payload: { isOpened: boolean | 'toggle' } }) {
      state.isCartOpened =
        typeof action.payload.isOpened === 'boolean'
          ? action.payload.isOpened
          : !state.isCartOpened;
    },
    setIsSidebarOpened(state, action: { payload: { isOpened: boolean | 'toggle' } }) {
      state.isSidebarOpened =
        typeof action.payload.isOpened === 'boolean'
          ? action.payload.isOpened
          : !state.isSidebarOpened;
    },
    initiateColorModeChange(state) {
      state.colorModeChangeStatus = 'ongoing';
    },
    finalizeColorModeChange(state) {
      state.colorModeChangeStatus = 'completed';
    },
    setIsMobile(state, action: { payload: { isMobile: boolean } }) {
      state.isMobile = action.payload.isMobile;
    },
    setColorModeToggleCoords(state, action: { payload: { x: number; y: number } }) {
      state.colorModeToogleCoords = action.payload;
    },
    setScreenDetails(state, action: { payload: { w: number; h: number } }) {
      state.screenDetails = action.payload;
    },
  },
});

const ui = uiSlice.reducer;
const {
  setSuccessMessage,
  setWarningMessage,
  setInfoMessage,
  setIsCartOpened,
  setIsSidebarOpened,
  setErrorMessage,
  initiateColorModeChange,
  finalizeColorModeChange,
  setIsMobile,
  setColorModeToggleCoords,
  setScreenDetails,
} = uiSlice.actions;

export {
  ui,
  setIsCartOpened,
  setIsSidebarOpened,
  setSuccessMessage,
  setWarningMessage,
  setInfoMessage,
  setErrorMessage,
  initiateColorModeChange,
  finalizeColorModeChange,
  setIsMobile,
  setColorModeToggleCoords,
  setScreenDetails,
};
