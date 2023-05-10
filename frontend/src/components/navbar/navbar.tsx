import { BellIcon, MoonIcon, Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Circle,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from '@chakra-ui/react';
import type { FC } from 'react';
import React, { useCallback, useState } from 'react';
import logo from '../../../assets/logo.png';
import { CartIcon, HamburgerIcon } from '../icons';

interface INavbarComponent {
  switchSidebarState: (payload?: { state: boolean }) => void;
}

const NavbarIconsComponent: FC<{ isOpened: boolean }> = ({ isOpened }) => (
  <Flex
    direction={{ base: 'column', md: 'row' }}
    position={{ base: 'absolute', md: 'unset' }}
    width={{ base: '70px', md: 'max-content' }}
    maxHeight={{ base: isOpened ? '120px' : '0px', md: 'max-content' }}
    overflow={'hidden'}
    right={2}
    top={70}
    alignItems={'center'}
    gap={4}
    borderStyle={'dashed'}
    borderColor={{ base: isOpened ? 'white.400' : 'transparent', md: 'transparent' }}
    borderWidth={{ base: '2px', md: '0px' }}
    borderRadius={'20px'}
    borderTop={'none'}
    background={'blue.25'}
  >
    <MoonIcon
      boxSize={5}
      color={'blue.500'}
      _hover={{
        color: 'blue.600',
      }}
      cursor={'pointer'}
      mt={{ base: 4, md: 0 }}
    />
    <BellIcon
      boxSize={5}
      color={'blue.500'}
      _hover={{
        color: 'blue.600',
      }}
      cursor={'pointer'}
    />
    <CartIcon
      boxSize={5}
      color={'blue.500'}
      _hover={{
        color: 'blue.600',
      }}
      mb={{ base: 4, md: 0 }}
    />
  </Flex>
);

export const NavbarComponent: React.FC<INavbarComponent> = ({ switchSidebarState }) => {
  const [isToolbarOpened, setIsToolbarOpened] = useState(false);

  const toggleToolbar = useCallback(() => {
    setIsToolbarOpened((_) => !_);
  }, []);

  return (
    <Flex
      direction={'row'}
      alignItems={'center'}
      h={'100%'}
      py={4}
      gap={6}
      px={6}
      overflowX={'hidden'}
    >
      <Image src={logo} />

      <Box h={'100%'} w={'2px'} minW={'2px'} bg="blue.300" />

      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        w={'450px'}
        minW={{ base: '25px', md: '250px' }}
        gap={6}
      >
        <HamburgerIcon
          boxSize={5}
          color={'blue.500'}
          _hover={{
            color: 'blue.600',
          }}
          onClick={() => {
            switchSidebarState();
          }}
        />

        <InputGroup w={'max-content'} maxW={'300px'} display={{ base: 'none', sm: 'flex' }}>
          <InputLeftElement
            pl={'20px'}
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
          />
          <Input type="text" placeholder="Search" bg={'white.400'} borderRadius={'20px'} pl={12} />
        </InputGroup>
      </Flex>

      <Spacer />

      <Flex direction={'row'} alignItems={'center'} gap={4}>
        <NavbarIconsComponent isOpened={isToolbarOpened} />
        <Circle size={10} bg={'yellow.400'} cursor={'pointer'} onClick={toggleToolbar} />
      </Flex>
    </Flex>
  );
};
