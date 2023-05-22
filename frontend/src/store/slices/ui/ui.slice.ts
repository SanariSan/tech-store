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
    colorModeAnimationDuration: 1000,
    colorModeFlag: false,
    isMobile: true,
  } as {
    successMessage: TMessage | undefined;
    infoMessage: TMessage | undefined;
    warningMessage: TMessage | undefined;
    errorMessage: TMessage | undefined;
    isCartOpened: boolean;
    colorModeAnimationDuration: number;
    colorModeFlag: boolean;
    isMobile: boolean;
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
    toggleColorMode(state) {
      state.colorModeFlag = !state.colorModeFlag;
    },
    setIsMobile(state, action: { payload: { isMobile: boolean } }) {
      state.isMobile = action.payload.isMobile;
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
  toggleColorMode,
  setIsMobile,
} = uiSlice.actions;

export {
  ui,
  setIsCartOpened,
  setSuccessMessage,
  setWarningMessage,
  setInfoMessage,
  setErrorMessage,
  toggleColorMode,
  setIsMobile,
};
