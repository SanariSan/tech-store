import { Flex } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useMemo } from 'react';

import { useAppSelector } from '../../hooks/redux';
import { useThrottledState } from '../../hooks/use-throttled-state';
import {
  uiColorModeAnimationDurationSelector,
  uiColorModeChangeStatusSelector,
  uiIsMobileSelector,
  uiSidebarStateSelector,
} from '../../store';
import { HomeMainContentComponentMemo } from './main-content.home';
import { ParticlesComponentMemo } from './particles.home';

type THomeComponent = {
  [key: string]: unknown;
};
const HomeContainer: FC<THomeComponent> = () => {
  const colorModeChangeStatus = useAppSelector(uiColorModeChangeStatusSelector);
  const isSidebarOpened = useAppSelector(uiSidebarStateSelector);
  const isMobile = useAppSelector(uiIsMobileSelector);
  const colorModeChangeAnimationDuration = useAppSelector(uiColorModeAnimationDurationSelector);
  const throttledColorModeChangeStatus = useThrottledState({
    state: colorModeChangeStatus,
    replicateCondition: colorModeChangeStatus === 'completed',
    delay: isMobile ? colorModeChangeAnimationDuration : colorModeChangeAnimationDuration + 150,
  });

  const isThemeChanging = useMemo(
    () => colorModeChangeStatus !== 'completed' || throttledColorModeChangeStatus !== 'completed',
    [colorModeChangeStatus, throttledColorModeChangeStatus],
  );

  return (
    <Flex w={'100%'} h={'100%'} position={'relative'}>
      <ParticlesComponentMemo isPaused={isSidebarOpened || isThemeChanging} />
      <HomeMainContentComponentMemo isThemeChanging={isThemeChanging} />
    </Flex>
  );
};

const HomeContainerMemo = memo(HomeContainer);

export { HomeContainerMemo };
