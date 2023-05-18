import type { TRootState } from '../../redux.store.type';

const uiCartStateSelector = (state: TRootState) => state.ui.isCartOpened;

export { uiCartStateSelector };
