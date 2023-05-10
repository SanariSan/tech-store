import { Skeleton } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';

type TSkeleton = {
  isLoading: boolean;
};

const SkeletonPlaceholderComponent: FC<TSkeleton> = ({ isLoading }) => (
  <Skeleton
    height="435px"
    opacity={isLoading ? 1 : 0}
    borderRadius={'20px'}
    startColor="gray.100"
    endColor="blue.400"
    transition={'opacity 1s linear'}
  />
);

const SkeletonPlaceholderComponentMemo = memo(SkeletonPlaceholderComponent);

export { SkeletonPlaceholderComponent, SkeletonPlaceholderComponentMemo };
