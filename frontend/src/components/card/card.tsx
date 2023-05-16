import { Box, Circle, Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import { TimeIcon } from '@chakra-ui/icons';
import { LazyImageContainer } from '../../containers/lazy-image';
import { useIntersection } from '../../hooks/use-intersection';
import type { goodsEntitiesSelector } from '../../store';
import { CartIcon, HeartIcon } from '../icons';

type TCardComponent = Omit<
  ReturnType<typeof goodsEntitiesSelector>[number],
  'category' | 'modifier'
> & {
  orderIdx: number;
  isLiked: boolean;
  onLike: () => void;
  onBuy: () => void;
} & React.Attributes;

const CardComponent: FC<TCardComponent> = ({
  id,
  name,
  price,
  hsrc,
  lsrc,
  orderIdx,
  isLiked,
  onLike,
  onBuy,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const sales = useRef(Math.floor(Math.random() * (100 - 10)) + 10);
  const rating = useRef((Math.random() * (5 - 3) + 3).toFixed(1));
  const reviews = useRef(Math.floor(Math.random() * (40 - 1)) + 1);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const { isIntersecting } = useIntersection({ ref: cardRef, shouldTrack: !hasBeenShown });

  const [isImageFocused, setIsImageFocused] = useState(false);
  const imageFocusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isIntersecting) setHasBeenShown(true);
  }, [isIntersecting]);

  const hover = {
    transform: 'perspective(100px) translateZ(2px)',
  };

  return (
    <Flex
      borderStyle={'dashed'}
      borderColor={'white.400'}
      borderWidth={'2px'}
      borderRadius={'20px'}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'space-between'}
      minH={{ base: '250px', sm: '375px' }}
      h={'max-content'}
      w={'100%'}
      cursor={'pointer'}
      opacity={hasBeenShown ? 1 : 0}
      transition={`
      transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.2s linear ${
        (orderIdx + 1) * 50
      }ms
      `}
      transform={'perspective(100px) translateZ(0px)'}
      _hover={hover}
      _active={hover}
      _focus={hover}
      ref={cardRef}
    >
      <Box
        w={'100%'}
        minH={{ base: '200px', sm: '300px' }}
        h={{ base: '200px', sm: '300px' }}
        pb={4}
        pos={'relative'}
        onMouseOver={() => {
          setIsImageFocused(true);
        }}
        onMouseLeave={() => {
          setIsImageFocused(false);
        }}
      >
        <LazyImageContainer
          marginX={'auto'}
          bg={'blue.300'}
          borderRadius={'20px'}
          objectFit={{ base: 'cover', sm: 'cover' }}
          backgroundColor={'transparent'}
          h={'100%'}
          hSrc={`${process.env.REACT_APP_API_URL}${hsrc}`}
          lSrc={`${process.env.REACT_APP_API_URL}${lsrc}`}
          // src={'http://localhost:80/api/v1/goods/assets/h/l3.jpg'}
          // fallbackSrc={'http://localhost:80/api/v1/goods/assets/l/l3.jpg'}
        />
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          pos={'absolute'}
          w={'100%'}
          h={'100%'}
          borderRadius={'20px'}
          left={0}
          top={0}
        >
          <Flex zIndex={1} gap={3}>
            <Circle
              opacity={isImageFocused ? 0.7 : 0}
              _hover={{ opacity: 1, background: 'blue.300' }}
              size={{ base: 10, sm: 12 }}
              onClick={onLike}
              background={'white.300'}
            >
              <HeartIcon color={isLiked ? 'red.400' : 'blue.900'} boxSize={{ base: 4, sm: 5 }} />
            </Circle>
            <Circle
              opacity={isImageFocused ? 0.7 : 0}
              _hover={{ opacity: 1, background: 'blue.300' }}
              size={{ base: 10, sm: 12 }}
              background={'white.300'}
            >
              <TimeIcon color={'blue.900'} boxSize={{ base: 4, sm: 5 }} />
            </Circle>
          </Flex>
          <Flex
            pos={'absolute'}
            w={'100%'}
            h={'100%'}
            background={'blue.600'}
            borderRadius={'20px'}
            left={0}
            top={0}
            opacity={isImageFocused ? 0.5 : 0}
          />
        </Flex>
      </Box>
      <Flex
        bg={'white.200'}
        borderRadius={'20px'}
        w={'100%'}
        h={'135px'}
        direction={'column'}
        alignItems={'flex-start'}
        px={5}
        py={3}
      >
        <Flex direction={'row'} width={'100%'} height={'100%'}>
          <Flex direction={'column'} width={'75%'} height={'100%'} justifyContent={'space-between'}>
            <Flex direction={'column'}>
              <Text variant={{ base: 'sm', sm: 'md' }} fontWeight={'bold'} color={'blue.800'}>
                {name}
              </Text>
              <Text variant={{ base: 'base' }} color={'blue.600'}>
                T.S. Official
              </Text>
            </Flex>

            <Flex direction={'column'}>
              <Flex direction={'row'} alignItems={'flex-start'} gap={3}>
                <Text
                  variant={{ base: 'base', sm: 'sm' }}
                  fontWeight={'bold'}
                  color={'yellow.400'}
                  letterSpacing={'0.05rem'}
                >
                  {price} $
                </Text>
                <Text
                  variant={{ base: 'base', sm: 'sm' }}
                  color={'blue.500'}
                  letterSpacing={'0.05rem'}
                  textDecoration={'line-through'}
                  textDecorationColor={'blue.500'}
                >
                  {price + 100} $
                </Text>
              </Flex>
              <Flex w={'100%'} gap={3}>
                <Text variant={{ base: 'base' }} color={'blue.600'}>
                  {sales.current} sales
                </Text>
                <Text variant={{ base: 'base' }} color={'blue.600'}>
                  🏆 {rating.current}
                </Text>
                <Text variant={{ base: 'base' }} color={'blue.600'}>
                  ({reviews.current})
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex alignItems={'flex-end'} justifyContent={'flex-end'} width={'25%'} height={'100%'}>
            <Circle
              size={{ base: 10, sm: 12 }}
              background={'white.300'}
              _hover={{ background: 'blue.300' }}
            >
              <CartIcon
                boxSize={{ base: 4, sm: 5 }}
                color={'blue.600'}

                // onClick={
                // onBuy
                // }
              />
            </Circle>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const CardComponentMemo = memo(CardComponent);

export { CardComponent, CardComponentMemo };
