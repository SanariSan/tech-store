import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Button, Circle, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import React, { memo, useMemo } from 'react';
import { COLORS } from '../../chakra-setup';
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
  const [inactive, secondaryAlt, accent, wrapBg, border, cardBg, impact, secondary] = [
    useColorModeValue(COLORS.blue[500], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[600], COLORS.blue[500]),
    useColorModeValue(COLORS.blue[800], COLORS.white[900]),
    useColorModeValue(COLORS.white[300], COLORS.darkBlue[300]),
    useColorModeValue(COLORS.white[300], COLORS.darkBlue[200]),
    useColorModeValue(COLORS.white[200], COLORS.darkBlue[500]),
    useColorModeValue(COLORS.yellow[400], COLORS.yellow[400]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
  ];

  const hover = useMemo(
    () => ({
      transform: 'perspective(100px) translateZ(2px)',
    }),
    [],
  );

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
      borderColor={border}
      borderWidth={'2px'}
      borderRadius={'20px'}
      gap={3}
      p={3}
      bg={cardBg}
      transition={`
      transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)`}
      transform={'perspective(100px) translateZ(0px)'}
      _hover={{ sm: hover }}
      _active={{ sm: hover }}
      _focus={{ sm: hover }}
    >
      <Flex direction={'row'} width={'100%'} height={'max-content'} gap={4}>
        <Box
          minH={{ base: '100px', sm: '125px' }}
          maxH={{ base: '125px', sm: '150px' }}
          h={{ base: '100px', sm: '125px' }}
          w={'40%'}
          minW={'90px'}
        >
          <LazyImageContainer
            marginX={'auto'}
            borderRadius={'20px'}
            objectFit={{ base: 'cover', sm: 'cover' }}
            backgroundColor={'transparent'}
            h={'100%'}
            hSrc={hsrc}
            lSrc={lsrc}
            // hSrc={`${process.env.REACT_APP_API_URL}${hsrc}`}
            // lSrc={`${process.env.REACT_APP_API_URL}${lsrc}`}
            // src={'http://localhost:80/api/v1/goods/assets/h/l3.jpg'}
            // fallbackSrc={'http://localhost:80/api/v1/goods/assets/l/l3.jpg'}
          />
        </Box>
        <Flex
          direction={'column'}
          alignItems={'center'}
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
              <Text variant={{ base: 'md', sm: 'xl' }} fontWeight={'bold'} color={accent}>
                {name}
              </Text>
              <Text variant={{ base: 'base' }} color={secondaryAlt}>
                T.S. Official
              </Text>
            </Flex>

            <Flex direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
              <Text
                variant={{ base: 'md', sm: 'xl' }}
                fontWeight={'bold'}
                color={impact}
                letterSpacing={'0.05rem'}
              >
                {price * qty} $
              </Text>
              <Text
                variant={{ base: 'xs', sm: 'sm' }}
                color={inactive}
                letterSpacing={'0.05rem'}
                textDecoration={'line-through'}
                textDecorationColor={inactive}
              >
                {(price + 100) * qty} $
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex w={'100%'} gap={3} alignItems={'center'} justifyContent={'space-between'}>
        <Flex w={'20%'} gap={3} pl={4} alignItems={'center'}>
          <Button
            size={'sm'}
            borderRadius={'20px'}
            background={wrapBg}
            _hover={{ background: qty > 1 ? secondary : wrapBg }}
            _active={{ background: wrapBg }}
            onClick={qty > 1 ? onRemove : undefined}
            isDisabled={qty <= 1}
            opacity={1}
            _disabled={{
              opacity: 0.5,
            }}
            cursor={qty > 1 ? 'pointer' : 'not-allowed'}
          >
            <MinusIcon boxSize={{ base: 2, sm: 3 }} color={secondaryAlt} />
          </Button>
          <Text>{qty}</Text>
          <Button
            size={'sm'}
            borderRadius={'20px'}
            background={wrapBg}
            _hover={{ background: secondary }}
            _active={{ background: wrapBg }}
            onClick={onAdd}
          >
            <AddIcon boxSize={{ base: 2, sm: 3 }} color={secondaryAlt} />
          </Button>
        </Flex>
        <Flex w={'80%'} gap={3} pr={8} alignItems={'center'} justifyContent={'flex-end'}>
          <Circle
            size={{ base: 7, sm: 9 }}
            background={wrapBg}
            _hover={{ background: secondary }}
            onClick={onDelete}
            cursor={'pointer'}
            _active={{ background: wrapBg }}
          >
            <DeleteIcon boxSize={{ base: 3, sm: 4 }} color={secondaryAlt} />
          </Circle>
        </Flex>
      </Flex>
    </Flex>
  );
};

const CartCardComponentMemo = memo(CartCardComponent);

export { CartCardComponentMemo };
