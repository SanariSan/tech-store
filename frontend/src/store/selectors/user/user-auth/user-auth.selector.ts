import type { TRootState } from '../../../redux.store.type';

const userAuthLoadingStatusSelector = (state: TRootState) => state.user.loadingStatus;
const userAuthIsAuthenticatedSelector = (state: TRootState) => state.user.isAuthenticated;
const userInfoUsernameSelector = (state: TRootState) => state.user.username;

export { userAuthLoadingStatusSelector, userAuthIsAuthenticatedSelector, userInfoUsernameSelector };
