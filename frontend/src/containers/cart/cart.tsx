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
  useColorModeValue,
} from '@chakra-ui/react';
import type { FC } from 'react';
import { Fragment, memo, useCallback } from 'react';
import { COLORS } from '../../chakra-setup';
import { CartCardComponentMemo } from '../../components/cart-card';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  goodsCartEntitiesPriceSelector,
  goodsCartEntitiesStackedSelector,
  purgeCart,
  pushCartEntity,
  removeCartEntity,
  setIsCartOpenedUi,
  setSuccessMessageUi,
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

  const [bgAlt, impact, btnColor] = [
    useColorModeValue(COLORS.white[900], COLORS.darkBlue[600]),
    useColorModeValue(COLORS.yellow[400], COLORS.yellow[400]),
    useColorModeValue(COLORS.blue[800], COLORS.darkBlue[600]),
  ];

  const onClose = useCallback(() => {
    void d(setIsCartOpenedUi({ isOpened: false }));
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

  const onSubmit = useCallback(() => {
    void d(purgeCart());
    void d(
      setSuccessMessageUi({
        title: 'Order placed!',
        description: 'Your order is being processed now. Thank you!',
      }),
    );
  }, [d]);

  return (
    <Drawer onClose={onClose} isOpen={isCartOpened} size={'sm'}>
      <DrawerOverlay
        display={{
          base: 'none',
          sm: 'unset',
        }}
      />
      <DrawerContent bg={bgAlt}>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth={'1px'} minW={'200px'}>
          Cart
        </DrawerHeader>

        <DrawerBody overflowY={'scroll'} overscrollBehaviorY={'contain'}>
          <Flex
            direction={'column'}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            gap={3}
          >
            {cartEntities.length <= 0 && <Text variant={'md'}>It's lonely here 😢</Text>}
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

        <DrawerFooter borderTopWidth="1px" p={'unset'} minW={'200px'}>
          <Flex
            direction={'column'}
            width={'100%'}
            height={'100%'}
            alignItems={'flex-end'}
            gap={3}
            py={4}
          >
            <Flex w={'100%'} justifyContent={'flex-end'} gap={6} px={6}>
              <Text variant={'md'} whiteSpace={'nowrap'} fontWeight={'bold'}>
                Total:
              </Text>
              <Text variant={'md'} whiteSpace={'nowrap'}>
                {cartTotal} $
              </Text>
            </Flex>
            <Flex
              direction={'row'}
              justifyContent={'flex-end'}
              w={'100%'}
              borderTopWidth={'1px'}
              pt={3}
              px={6}
            >
              <Button variant="outline" size={{ base: 'sm', sm: 'md' }} mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme={'yellow'}
                size={{ base: 'sm', sm: 'md' }}
                bg={impact}
                color={btnColor}
                isDisabled={cartEntities.length <= 0}
                opacity={1}
                _disabled={{
                  opacity: 0.5,
                }}
                cursor={cartEntities.length <= 0 ? 'not-allowed' : 'pointer'}
                onClick={() => {
                  if (cartEntities.length <= 0) return;

                  onSubmit();
                  onClose();
                }}
              >
                Order
              </Button>
            </Flex>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const CartContainerMemo = memo(CartContainer);

export { CartContainerMemo };
