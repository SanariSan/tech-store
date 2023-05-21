import { Skeleton, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import { COLORS_MAP_DARK, COLORS_MAP_LIGHT } from '../../chakra-setup';

type TSkeleton = {
  isLoading: boolean;
};

const SkeletonPlaceholderComponent: FC<TSkeleton> = ({ isLoading }) => {
  const [bg, inactiveAlt] = [
    useColorModeValue(COLORS_MAP_LIGHT.bg, COLORS_MAP_DARK.bg),
    useColorModeValue(COLORS_MAP_LIGHT.secondary, COLORS_MAP_DARK.secondary),
  ];

  return (
    <Skeleton
      height={{ base: '350px', sm: '435px' }}
      opacity={isLoading ? 1 : 0}
      borderRadius={'20px'}
      startColor={bg}
      endColor={inactiveAlt}
      transition={'opacity 1s linear'}
    />
  );
};

const SkeletonPlaceholderComponentMemo = memo(SkeletonPlaceholderComponent);

export { SkeletonPlaceholderComponent, SkeletonPlaceholderComponentMemo };
