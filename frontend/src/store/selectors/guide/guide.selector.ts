import type { TRootState } from '../../redux.store.type';

const guideHasTriedThemeChangeSelector = (state: TRootState) => state.guide.hasTriedThemeChange;
const guideHasTriedOpeningCartSelector = (state: TRootState) => state.guide.hasTriedOpeningCart;
const guideHasTriedAuthSelector = (state: TRootState) => state.guide.hasTriedAuth;

export {
  guideHasTriedThemeChangeSelector,
  guideHasTriedOpeningCartSelector,
  guideHasTriedAuthSelector,
};
