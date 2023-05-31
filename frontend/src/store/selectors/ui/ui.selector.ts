import { createSelector } from '@reduxjs/toolkit';
import type { TRootState } from '../../redux.store.type';

const uiCartStateSelector = (state: TRootState) => state.ui.isCartOpened;
const uiSidebarStateSelector = (state: TRootState) => state.ui.isSidebarOpened;
const uiSuccessSelector = (state: TRootState) => state.ui.successMessage;
const uiWarningSelector = (state: TRootState) => state.ui.warningMessage;
const uiInfoSelector = (state: TRootState) => state.ui.infoMessage;
const uiErrorSelector = (state: TRootState) => state.ui.errorMessage;
const uiColorModeChangeStatusSelector = (state: TRootState) => state.ui.colorModeChangeStatus;
const uiColorModeAnimationDurationSelector = (state: TRootState) =>
  state.ui.colorModeAnimationDuration;
const uiIsMobileSelector = (state: TRootState) => state.ui.isMobile;
const uiColorModeToogleCoordsSelector = (state: TRootState) => state.ui.colorModeToogleCoords;
const uiScreenDetailsSelector = createSelector(
  (state: TRootState) => state.ui.screenDetails,
  (screenDetails) => screenDetails,
);

export {
  uiCartStateSelector,
  uiSidebarStateSelector,
  uiSuccessSelector,
  uiWarningSelector,
  uiInfoSelector,
  uiErrorSelector,
  uiColorModeChangeStatusSelector,
  uiColorModeAnimationDurationSelector,
  uiIsMobileSelector,
  uiColorModeToogleCoordsSelector,
  uiScreenDetailsSelector,
};
