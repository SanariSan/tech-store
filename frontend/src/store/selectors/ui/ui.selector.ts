import type { TRootState } from '../../redux.store.type';

const uiCartStateSelector = (state: TRootState) => state.ui.isCartOpened;
const uiSuccessSelector = (state: TRootState) => state.ui.successMessage;
const uiWarningSelector = (state: TRootState) => state.ui.warningMessage;
const uiInfoSelector = (state: TRootState) => state.ui.infoMessage;
const uiErrorSelector = (state: TRootState) => state.ui.errorMessage;

export {
  uiCartStateSelector,
  uiSuccessSelector,
  uiWarningSelector,
  uiInfoSelector,
  uiErrorSelector,
};
