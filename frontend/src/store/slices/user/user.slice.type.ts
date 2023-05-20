import type { TLoadingStatus } from '../slices.type';

type TIsAuthenticated = 'idle' | boolean;

type TUserAuthInitState = {
  isAuthenticated: TIsAuthenticated;
  loadingStatus: TLoadingStatus;
  username?: string;
};

export type { TUserAuthInitState, TIsAuthenticated };
