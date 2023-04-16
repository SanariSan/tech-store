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
import React from 'react';
import logo from '../../../assets/logo.png';
import { CartIcon, HamburgerIcon } from '../icons';

interface INavbarComponent {
  switchSidebarState: (payload?: { state: boolean }) => void;
}

export const NavbarComponent: React.FC<INavbarComponent> = ({ switchSidebarState }) => {
  const a = 1;
  return (
    <Flex direction={'row'} alignItems={'center'} h={'100%'} py={4} gap={6} px={6}>
      <Image src={logo} />

      <Box h={'100%'} w={'2px'} minW={'2px'} bg="blue.300" />

      <HamburgerIcon
        w={10}
        pl={5}
        color={'blue.500'}
        _hover={{
          color: 'blue.600',
        }}
        onClick={() => {
          switchSidebarState();
        }}
      />

      <InputGroup w={'max-content'}>
        <InputLeftElement
          pl={'20px'}
          pointerEvents="none"
          children={<Search2Icon color="gray.300" />}
        />
        <Input type="text" placeholder="Search" bg={'white.400'} borderRadius={'20px'} pl={12} />
      </InputGroup>

      <Spacer />

      <Flex direction={'row'} alignItems={'center'} gap={4}>
        <MoonIcon
          boxSize={5}
          color={'blue.500'}
          _hover={{
            color: 'blue.600',
          }}
          cursor={'pointer'}
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
        />
        <Circle size={10} bg={'yellow.400'} cursor={'pointer'} />
      </Flex>
    </Flex>
  );
};
