import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from '@chakra-ui/react';
import type { FC } from 'react';
import { Fragment, memo, useCallback, useEffect } from 'react';
import { CartCardComponentMemo } from '../../components/cart-card';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  goodsCartEntitiesPriceSelector,
  goodsCartEntitiesStackedSelector,
  pushCartEntity,
  removeCartEntity,
  setIsCartOpened,
  uiCartStateSelector,
} from '../../store';

type TCartContainer = {
  [key: string]: unknown;
};

const CartContainer: FC<TCartContainer> = () => {
  const d = useAppDispatch();
  const isCartOpened = useAppSelector(uiCartStateSelector);
  const cartEntities = useAppSelector(goodsCartEntitiesStackedSelector);
  const cartTotal = useAppSelector(goodsCartEntitiesPriceSelector);

  const onClose = useCallback(() => {
    void d(setIsCartOpened({ isOpened: false }));
  }, [d]);

  const onAddCb = useCallback(
    ({ id }: { id: string }) =>
      () => {
        void d(pushCartEntity({ entityId: id }));
      },
    [d],
  );

  const onRemoveCb = useCallback(
    ({ id }: { id: string }) =>
      () => {
        void d(removeCartEntity({ entityId: id }));
      },
    [d],
  );

  const onDeleteCb = useCallback(
    ({ id }: { id: string }) =>
      () => {
        void d(removeCartEntity({ entityId: id, modifier: 'all' }));
      },
    [d],
  );

  return (
    <Drawer onClose={onClose} isOpen={isCartOpened} size={'sm'}>
      <DrawerOverlay>
        <DrawerContent bg={'white.900'}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth={'1px'}>{`Cart`}</DrawerHeader>

          <DrawerBody>
            <Flex
              direction={'column'}
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              gap={3}
            >
              {/* <p>{JSON.stringify(cartEntities, null, 2)}</p> */}
              {cartEntities.map(({ id, ...props }, idx) => (
                <Fragment key={`cart_${id}`}>
                  <CartCardComponentMemo
                    orderIdx={idx}
                    id={id}
                    onAdd={onAddCb({ id })}
                    onRemove={onRemoveCb({ id })}
                    onDelete={onDeleteCb({ id })}
                    {...props}
                  />
                </Fragment>
              ))}
            </Flex>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" p={'unset'}>
            <Flex
              direction={'column'}
              width={'100%'}
              height={'100%'}
              alignItems={'flex-end'}
              gap={3}
              py={4}
            >
              <Flex w={'100%'} justifyContent={'flex-end'} gap={6} px={6}>
                <Text variant={'md'} fontWeight={'bold'}>
                  Total:
                </Text>
                <Text variant={'md'}>{cartTotal} $</Text>
              </Flex>
              <Flex
                direction={'row'}
                justifyContent={'flex-end'}
                w={'100%'}
                borderTopWidth={'1px'}
                pt={3}
                px={6}
              >
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme={'yellow'}>Place order</Button>
              </Flex>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

const CartContainerMemo = memo(CartContainer);

export { CartContainerMemo };