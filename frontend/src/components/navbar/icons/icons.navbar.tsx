import type { FC } from 'react';
import { memo } from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { BellIcon, MoonIcon } from '@chakra-ui/icons';
import { CartIcon } from '../../icons';
import { useAppDispatch } from '../../../hooks/redux';
import { setIsCartOpened } from '../../../store';

const NavbarIconsComponent: FC<{ isOpened: boolean; toggleToolbar: () => void }> = ({
  isOpened,
  toggleToolbar,
}) => {
  const d = useAppDispatch();
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      position={{ base: 'absolute', md: 'unset' }}
      width={{ base: '70px', md: 'max-content' }}
      maxHeight={{ base: isOpened ? '120px' : '0px', md: 'max-content' }}
      overflow={'hidden'}
      right={2}
      top={65}
      alignItems={'center'}
      gap={4}
      borderStyle={'solid'}
      borderColor={{ base: isOpened ? 'white.400' : 'transparent', md: 'transparent' }}
      borderWidth={{ base: '2px', md: '0px' }}
      borderRadius={'20px'}
      borderTop={'none'}
    >
      <MoonIcon
        boxSize={{ base: 4, md: 5 }}
        color={'blue.500'}
        _hover={{
          color: 'blue.600',
        }}
        cursor={'pointer'}
        mt={{ base: 4, md: 0 }}
      />
      <BellIcon
        boxSize={{ base: 4, md: 5 }}
        color={'blue.500'}
        _hover={{
          color: 'blue.600',
        }}
        cursor={'pointer'}
      />
      <CartIcon
        boxSize={{ base: 4, md: 5 }}
        color={'blue.500'}
        _hover={{
          color: 'blue.600',
        }}
        onClick={() => {
          void d(setIsCartOpened({ isOpened: true }));
          toggleToolbar();
        }}
        mb={{ base: 4, md: 0 }}
      />
      <Flex
        position={{ base: 'absolute', md: 'unset' }}
        width={{ base: '70px', md: '0px' }}
        height={'100%'}
        maxHeight={{ base: isOpened ? '120px' : '0px', md: 'max-content' }}
        opacity={0.9}
        transition={'opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'}
        background={'blue.25'}
        zIndex={-1}
      />
    </Flex>
  );
};

const NavbarIconsComponentMemo = memo(NavbarIconsComponent);

export { NavbarIconsComponent, NavbarIconsComponentMemo };
