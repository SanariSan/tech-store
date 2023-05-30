import type { TUiInitState } from './ui.slice.type';

const UI_INIT_STATE: TUiInitState = {
  successMessage: undefined,
  warningMessage: undefined,
  infoMessage: undefined,
  errorMessage: undefined,
  isCartOpened: false,
  isSidebarOpened: false,
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
};

export { UI_INIT_STATE };
