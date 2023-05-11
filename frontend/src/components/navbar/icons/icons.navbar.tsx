import type { FC } from 'react';
import { memo } from 'react';
import { Flex } from '@chakra-ui/react';
import { BellIcon, MoonIcon } from '@chakra-ui/icons';
import { CartIcon } from '../../icons';

const NavbarIconsComponent: FC<{ isOpened: boolean }> = ({ isOpened }) => (
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
      mb={{ base: 4, md: 0 }}
    />
    <Flex
      position={{ base: 'absolute', md: 'unset' }}
      width={{ base: '70px', md: '0px' }}
      height={'100%'}
      maxHeight={{ base: isOpened ? '120px' : '0px', md: 'max-content' }}
      opacity={0.9}
      background={'blue.25'}
      zIndex={-1}
    />
  </Flex>
);

const NavbarIconsComponentMemo = memo(NavbarIconsComponent);

export { NavbarIconsComponent, NavbarIconsComponentMemo };
