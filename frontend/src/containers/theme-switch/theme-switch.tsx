import type { FC, MutableRefObject } from 'react';
import { memo } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { useIsMobile } from '../../hooks/use-is-mobile';
import { uiIsMobileSelector } from '../../store';
import { FancyThemeSwitchContainerMemo } from './fancy.theme-switch';
import { LightThemeSwitchContainerMemo } from './light.theme-switch';

type TThemeSwitchContainer = {
  screenshotTargetRef: MutableRefObject<HTMLElement | null>;
};

const ThemeSwitchContainer: FC<TThemeSwitchContainer> = ({ screenshotTargetRef }) => {
  const isMobile = useAppSelector(uiIsMobileSelector);
  useIsMobile();

  if (isMobile) return <LightThemeSwitchContainerMemo />;
  return <FancyThemeSwitchContainerMemo screenshotTargetRef={screenshotTargetRef} />;
};

const ThemeSwitchContainerMemo = memo(ThemeSwitchContainer);

export { ThemeSwitchContainerMemo };
