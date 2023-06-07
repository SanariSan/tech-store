import { Box, Flex, Image, Text, useColorModeValue, useToken } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useMemo } from 'react';
import cross from '../../../assets/cross.webp';
import no1 from '../../../assets/no3.webp';
import no2 from '../../../assets/no4.webp';
import { COLORS } from '../../chakra-setup';
import { useAppSelector } from '../../hooks/redux';
import { useThrottledState } from '../../hooks/use-throttled-state';
import {
  uiColorModeAnimationDurationSelector,
  uiColorModeChangeStatusSelector,
  uiIsMobileSelector,
  uiSidebarStateSelector,
} from '../../store';
import { getOptions } from './options.help.const';
import { ParticlesContainerMemo } from '../particles';

type THelpComponent = {
  [key: string]: unknown;
};

const HelpComponent: FC<THelpComponent> = () => {
  const [glow] = [useColorModeValue(COLORS.black[900], COLORS.white[900])];
  const [glowRef] = useToken('colors', [glow]);
  const isSidebarOpened = useAppSelector(uiSidebarStateSelector);
  const isMobile = useAppSelector(uiIsMobileSelector);
  const colorModeChangeStatus = useAppSelector(uiColorModeChangeStatusSelector);
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

  const options = useMemo(() => getOptions({ isMobile }), [isMobile]);

  return (
    <Box w={'100%'} h={'100%'} position={'relative'}>
      <ParticlesContainerMemo options={options} isPaused={isSidebarOpened || isThemeChanging} />
      <Flex
        w={'100%'}
        h={'100%'}
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={3}
        // bg={'rgba(255,255,255,0.01)'}
        // backdropFilter={'auto'}
        // backdropBlur={'2px'}
      >
        <Flex w={'100%'} h={'100px'} justifyContent={'center'} alignItems={'flex-start'}>
          <Text
            variant={'xxxxl'}
            fontWeight={'bold'}
            zIndex={1}
            textShadow={`0 0 2px ${glowRef}, 0 0 5px ${glowRef}`}
          >
            No elp.
          </Text>
        </Flex>
        <Flex
          w={'max-content'}
          h={'max-content'}
          justifyContent={'center'}
          alignItems={'center'}
          direction={{ base: 'column', md: 'row' }}
          zIndex={1}
          display={colorModeChangeStatus === 'ongoing' ? 'none' : 'flex'}
          flexWrap={'nowrap'}
          gap={5}
        >
          <Image src={no1} objectFit={'cover'} maxW={{ base: '100px', md: '100%' }} />
          <Image src={no2} objectFit={'cover'} maxW={{ base: '100px', md: '100%' }} />
        </Flex>
      </Flex>
      <Image
        display={colorModeChangeStatus === 'ongoing' ? 'none' : 'block'}
        src={cross}
        w={'100%'}
        minW={'800px'}
        h={'100%'}
        position={'absolute'}
        top={'30%'}
        transform={'rotate(-5deg) scale(1.05)'}
        objectFit={'contain'}
        opacity={0.6}
      />
    </Box>
  );
};

const HelpComponentMemo = memo(HelpComponent);

export { HelpComponentMemo };
