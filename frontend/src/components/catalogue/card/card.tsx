import { Box, Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import { useIntersection } from '../../../hooks/use-intersection';
import type { goodsEntitiesSelector } from '../../../store';
import { LazyImageContainer } from '../../../containers/lazy-image';

type TCardComponent = Omit<
  ReturnType<typeof goodsEntitiesSelector>[number],
  'id' | 'category' | 'modifier'
> & {
  orderIdx: number;
} & React.Attributes;

const CardComponent: FC<TCardComponent> = ({ name, price, hsrc, lsrc, orderIdx }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [sales] = useState(() => Math.floor(Math.random() * (100 - 10)) + 10);
  const [reviews] = useState(() => Math.floor(Math.random() * (40 - 1)) + 1);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const { isIntersecting } = useIntersection({ ref: cardRef, shouldTrack: !hasBeenShown });

  useEffect(() => {
    if (isIntersecting) setHasBeenShown(true);
  }, [isIntersecting]);

  return (
    <Flex
      borderStyle={'dashed'}
      borderColor={'white.400'}
      borderWidth={'2px'}
      borderRadius={'20px'}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'space-between'}
      minH={'375px'}
      h={'max-content'}
      w={'100%'}
      cursor={'pointer'}
      opacity={hasBeenShown ? 1 : 0}
      transition={`
      transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.5s linear ${
        (orderIdx + 1) * 100
      }ms
      `}
      transform={'perspective(100px) translateZ(0px)'}
      _hover={{
        transform: 'perspective(100px) translateZ(2px)',
      }}
      ref={cardRef}
    >
      <Box w={'100%'} minH={'300px'} h={'300px'} pb={4}>
        <LazyImageContainer
          marginX={'auto'}
          bg={'blue.300'}
          borderRadius={'20px'}
          objectFit={'cover'}
          backgroundColor={'transparent'}
          h={'100%'}
          hSrc={`${process.env.REACT_APP_API_URL}${hsrc}`}
          lSrc={`${process.env.REACT_APP_API_URL}${lsrc}`}
          // src={'http://localhost:80/api/v1/goods/assets/h/l3.jpg'}
          // fallbackSrc={'http://localhost:80/api/v1/goods/assets/l/l3.jpg'}
        />
      </Box>
      <Flex
        bg={'white.200'}
        borderRadius={'20px'}
        w={'100%'}
        h={'135px'}
        direction={'column'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
        px={5}
        py={3}
      >
        <Flex direction={'column'}>
          <Text fontWeight={'bold'} color={'blue.800'}>
            {name}
          </Text>
          <Text fontSize={'14px'} color={'blue.600'}>
            T.S. Official
          </Text>
        </Flex>

        <Flex direction={'column'}>
          <Flex direction={'row'} alignItems={'flex-start'} gap={3}>
            <Text fontWeight={'bold'} color={'yellow.400'} letterSpacing={'0.05rem'}>
              {price} $
            </Text>
            <Text
              color={'blue.500'}
              letterSpacing={'0.05rem'}
              textDecoration={'line-through'}
              textDecorationColor={'blue.500'}
            >
              {price + 100} $
            </Text>
          </Flex>
          <Text fontSize={'14px'} color={'blue.600'}>
            {sales} sales ✨ 5.0 ({reviews})
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

const CardComponentMemo = memo(CardComponent);

export { CardComponent, CardComponentMemo };
