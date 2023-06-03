import type { PlacementWithLogical } from '@chakra-ui/react';
import { Image, Tooltip, useBreakpointValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';

import hint from '../../../assets/hint.webp';
import { useAppSelector } from '../../hooks/redux';
import { uiIsMobileSelector } from '../../store';

type TGuideContainer = {
  [key: string]: unknown;
};

const GuideContainer: FC<TGuideContainer> = () => {
  const a = 1;
  //   const isMobile = useAppSelector(uiIsMobileSelector);

  //   const tooltipPos = (useBreakpointValue({
  //     base: 'top',
  //     md: 'left',
  //   }) ?? 'top') as PlacementWithLogical;
  const tooltipPos = 'top';
  return null;
  return (
    <Tooltip
      label="Did you know you can log in here too?"
      placement={tooltipPos}
      isOpen
      hasArrow
      arrowSize={10}
      whiteSpace={'normal'}
    >
      <Image
        src={hint}
        position={'fixed'}
        bottom={-25}
        right={0}
        objectFit={'contain'}
        maxH={'150px'}
        filter={'auto'}
        brightness={'80%'}
        zIndex={2}
      />
    </Tooltip>
  );
};

const GuideContainerMemo = memo(GuideContainer);

export { GuideContainerMemo };
