import { Skeleton, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import { COLORS } from '../../chakra-setup';

type TSkeleton = {
  isLoading: boolean;
};

const SkeletonPlaceholderComponent: FC<TSkeleton> = ({ isLoading }) => {
  const [bg, inactiveAlt] = [
    useColorModeValue(COLORS.white[200], COLORS.darkBlue[500]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
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
