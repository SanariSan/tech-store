import type { ImageProps } from '@chakra-ui/react';
import { Image as ImageChakra } from '@chakra-ui/react';
import type { FC } from 'react';
import { useLazyImg } from '../../hooks/use-lazy-image';

export const LazyImageContainer: FC<{ lSrc: string; hSrc: string } & ImageProps> = ({
  lSrc,
  hSrc,
  ...props
}) => {
  const [src, { blur }] = useLazyImg({ lSrc, hSrc });

  return <ImageChakra src={src} filter={'auto'} blur={blur ? '3px' : 'none'} {...props} />;
};
