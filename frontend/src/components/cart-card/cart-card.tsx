import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Circle, Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import React, { memo } from 'react';
import { LazyImageContainer } from '../../containers/lazy-image';
import type { goodsCartEntitiesStackedSelector } from '../../store';

type TCartCardComponent = Omit<
  ReturnType<typeof goodsCartEntitiesStackedSelector>[number],
  'category' | 'modifier'
> & {
  orderIdx: number;
  onAdd: () => void;
  onRemove: () => void;
  onDelete: () => void;
} & React.Attributes;

const CartCardComponent: FC<TCartCardComponent> = ({
  id,
  name,
  price,
  hsrc,
  lsrc,
  qty,
  onAdd,
  onRemove,
  onDelete,
  orderIdx,
}) => {
  const hover = {
    transform: 'perspective(100px) translateZ(2px)',
  };

  return (
    <Flex
      flexWrap={'nowrap'}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      w={'100%'}
      h={'max-content'}
      minH={{ base: '100px', sm: '125px' }}
      minW={'260px'}
      borderStyle={'dashed'}
      borderColor={'white.400'}
      borderWidth={'2px'}
      borderRadius={'20px'}
      gap={3}
      p={3}
      transition={`
      transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)`}
      transform={'perspective(100px) translateZ(0px)'}
      _hover={hover}
      _active={hover}
      _focus={hover}
    >
      <Flex direction={'row'} width={'100%'} height={'max-content'} gap={3}>
        <Box
          minH={{ base: '100px', sm: '125px' }}
          maxH={{ base: '125px', sm: '150px' }}
          h={{ base: '100px', sm: '125px' }}
          w={'40%'}
          minW={'90px'}
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
        </Box>
        <Flex
          direction={'column'}
          alignItems={'center'}
          // justifyContent={'space-around'}
          w={'60%'}
          minW={'140px'}
          minH={{ base: '100px', sm: '125px' }}
        >
          <Flex
            direction={'column'}
            width={'100%'}
            height={'100%'}
            justifyContent={'space-between'}
            py={2}
          >
            <Flex direction={'column'} alignItems={'flex-start'}>
              <Text variant={{ base: 'md', sm: 'xl' }} fontWeight={'bold'} color={'blue.800'}>
                {name}
              </Text>
              <Text variant={{ base: 'base' }} color={'blue.600'}>
                T.S. Official
              </Text>
            </Flex>

            <Flex direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
              <Text
                variant={{ base: 'md', sm: 'xl' }}
                fontWeight={'bold'}
                color={'yellow.400'}
                letterSpacing={'0.05rem'}
              >
                {price} $
              </Text>
              <Text
                variant={{ base: 'xs', sm: 'sm' }}
                color={'blue.500'}
                letterSpacing={'0.05rem'}
                textDecoration={'line-through'}
                textDecorationColor={'blue.500'}
              >
                {price + 100} $
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex w={'100%'} gap={3} alignItems={'center'} justifyContent={'space-between'}>
        <Flex w={'20%'} gap={3} pl={4} alignItems={'center'}>
          <Button size={'sm'} borderRadius={'20px'} onClick={onRemove}>
            -
          </Button>
          <Text>{qty}</Text>
          <Button size={'sm'} borderRadius={'20px'} onClick={onAdd}>
            +
          </Button>
        </Flex>
        <Flex w={'80%'} gap={3} pr={8} alignItems={'center'} justifyContent={'flex-end'}>
          <Circle
            size={{ base: 7, sm: 9 }}
            background={'white.300'}
            _hover={{ background: 'blue.300' }}
            onClick={onDelete}
            cursor={'pointer'}
          >
            <DeleteIcon boxSize={{ base: 3, sm: 4 }} color={'blue.600'} />
          </Circle>
        </Flex>
      </Flex>
    </Flex>
  );
};

const CartCardComponentMemo = memo(CartCardComponent);

export { CartCardComponentMemo };
