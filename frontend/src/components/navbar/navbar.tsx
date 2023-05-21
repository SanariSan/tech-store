import { Search2Icon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Circle,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  useColorMode,
  useColorModeValue,
  useToken,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import logo from '../../../assets/logo.png';
import pfp from '../../../assets/pfp.png';
import { HamburgerIcon } from '../icons';
import { NavbarIconsComponentMemo } from './icons';
import { useAppDispatch } from '../../hooks/redux';
import { setIsCartOpened } from '../../store';
import { COLORS_MAP_DARK, COLORS_MAP_LIGHT } from '../../chakra-setup';

interface INavbarComponent {
  switchSidebarState: (payload?: { state: boolean }) => void;
}

export const NavbarComponent: React.FC<INavbarComponent> = ({ switchSidebarState }) => {
  const d = useAppDispatch();
  const [isToolbarOpened, setIsToolbarOpened] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [inactive, secondaryAlt, secondary, hoverColor, impact, border] = [
    useColorModeValue(COLORS_MAP_LIGHT.inactive, COLORS_MAP_DARK.inactive),
    useColorModeValue(COLORS_MAP_LIGHT.secondaryAlt, COLORS_MAP_DARK.secondaryAlt),
    useColorModeValue(COLORS_MAP_LIGHT.secondary, COLORS_MAP_DARK.secondary),
    useColorModeValue(COLORS_MAP_LIGHT.hover, COLORS_MAP_DARK.hover),
    useColorModeValue(COLORS_MAP_LIGHT.impact, COLORS_MAP_DARK.impact),
    useColorModeValue(COLORS_MAP_LIGHT.border, COLORS_MAP_DARK.border),
  ];

  const hover = {
    transform: 'perspective(100px) translateZ(4px)',
  };

  const toggleToolbar = useCallback(() => {
    setIsToolbarOpened((_) => !_);
  }, []);

  const onCartToggle = useCallback(() => {
    toggleToolbar();
    void d(setIsCartOpened({ isOpened: 'toggle' }));
  }, [d, toggleToolbar]);

  useEffect(() => {
    console.log(colorMode);
  }, [colorMode]);

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

      <Box h={'100%'} w={'2px'} minW={'2px'} bg={secondary} />

      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        w={'450px'}
        minW={{ base: '25px', md: '250px' }}
        gap={6}
      >
        <HamburgerIcon
          boxSize={{ base: 4, sm: 5 }}
          color={inactive}
          _hover={{
            color: secondaryAlt,
          }}
          _active={{
            color: inactive,
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
          borderStyle={'dashed'}
          borderColor={border}
          borderWidth={'1px'}
          borderRadius={'20px'}
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
            bg={hoverColor}
            borderRadius={'20px'}
            pl={12}
          />
        </InputGroup>
      </Flex>

      <Spacer />

      <Flex direction={'row'} alignItems={'center'} gap={4}>
        <NavbarIconsComponentMemo
          isOpened={isToolbarOpened}
          onCartToggle={onCartToggle}
          onThemeToggle={toggleColorMode}
        />
        <Circle
          size={10}
          cursor={'pointer'}
          onClick={toggleToolbar}
          borderRadius={'20px'}
          background={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23${impact.slice(
            1,
          )}' stroke-width='3' stroke-dasharray='4%2c10' stroke-dashoffset='66' stroke-linecap='square'/%3e%3c/svg%3e");`}
          transform={'perspective(100px) translateZ(0px)'}
          _hover={hover}
          _active={hover}
          _focus={hover}
        >
          <Avatar
            src={pfp}
            bg={impact}
            objectFit={'contain'}
            borderRadius={'20px'}
            w={'80%'}
            h={'80%'}
          />
        </Circle>
      </Flex>
    </Flex>
  );
};
