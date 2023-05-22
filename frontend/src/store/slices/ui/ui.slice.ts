import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */

type TMessage = {
  title?: string;
  description?: string;
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    successMessage: undefined,
    warningMessage: undefined,
    infoMessage: undefined,
    errorMessage: undefined,
    isCartOpened: false,
    colorModeAnimationDuration: 1500,
    colorModeChangeStatus: 'completed',
    isMobile: true,
    colorModeToogleCoords: {
      x: 0,
      y: 0,
    },
    screenDetails: {
      w: 0,
      h: 0,
    },
  } as {
    successMessage: TMessage | undefined;
    infoMessage: TMessage | undefined;
    warningMessage: TMessage | undefined;
    errorMessage: TMessage | undefined;
    isCartOpened: boolean;
    colorModeAnimationDuration: number;
    colorModeChangeStatus: 'completed' | 'ongoing';
    isMobile: boolean;
    colorModeToogleCoords: { x: number; y: number };
    screenDetails: {
      w: number;
      h: number;
    };
  },
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
    initiateColorModeChange(state) {
      state.colorModeChangeStatus = 'ongoing';
    },
    finalizeColorModeChange(state) {
      state.colorModeChangeStatus = 'completed';
    },
    setIsMobile(state, action: { payload: { isMobile: boolean } }) {
      state.isMobile = action.payload.isMobile;
    },
    setColorModeToogleCoords(state, action: { payload: { x: number; y: number } }) {
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
  setErrorMessage,
  initiateColorModeChange,
  finalizeColorModeChange,
  setIsMobile,
  setColorModeToogleCoords,
  setScreenDetails,
} = uiSlice.actions;

export {
  ui,
  setIsCartOpened,
  setSuccessMessage,
  setWarningMessage,
  setInfoMessage,
  setErrorMessage,
  initiateColorModeChange,
  finalizeColorModeChange,
  setIsMobile,
  setColorModeToogleCoords,
  setScreenDetails,
};
