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
import { NavbarIconsComponentMemo } from './icons';

interface INavbarComponent {
  switchSidebarState: (payload?: { state: boolean }) => void;
}

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
      gap={{ base: 3, sm: 6 }}
      px={6}
      overflowX={'hidden'}
    >
      <Image src={logo} objectFit={'contain'} maxH={{ base: '30px', sm: 'max-content' }} />

      <Box h={'100%'} w={'2px'} minW={'2px'} bg="blue.300" />

      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        w={'450px'}
        minW={{ base: '25px', md: '250px' }}
        gap={6}
      >
        <HamburgerIcon
          boxSize={{ base: 4, sm: 5 }}
          color={'blue.500'}
          _hover={{
            color: 'blue.600',
          }}
          onClick={() => {
            switchSidebarState();
          }}
        />

        <InputGroup
          variant={{ base: 'base', sm: 'sm' }}
          w={'max-content'}
          maxW={'300px'}
          display={{ base: 'flex', sm: 'flex' }}
        >
          <InputLeftElement
            pl={'20px'}
            pointerEvents="none"
            children={<Search2Icon boxSize={4} color="gray.300" />}
          />
          <Input
            type="text"
            // variant={{ base: 'base', sm: 'sm' }}
            // TODO: figure out why Input preset not working
            fontSize={{ base: '14px', sm: '16px' }}
            placeholder="Search"
            bg={'white.400'}
            borderRadius={'20px'}
            pl={12}
          />
        </InputGroup>
      </Flex>

      <Spacer />

      <Flex direction={'row'} alignItems={'center'} gap={4}>
        <NavbarIconsComponentMemo isOpened={isToolbarOpened} />
        <Circle size={10} bg={'yellow.400'} cursor={'pointer'} onClick={toggleToolbar} />
      </Flex>
    </Flex>
  );
};
