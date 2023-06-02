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
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import pfp from '../../../assets/pfp.png';
import { COLORS } from '../../chakra-setup';
import { changeRoute } from '../../containers/functional';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  initiateColorModeChangeUi,
  setIsCartOpenedUi,
  uiColorModeChangeStatusSelector,
} from '../../store';
import { HamburgerIcon } from '../icons';
import { NavbarIconsComponentMemo } from './icons';
import { ANIMATION_KEYFRAMES } from './keyframes.navbar.const';

interface INavbarComponent {
  onSidebarToggle: () => void;
}

export const NavbarComponent: React.FC<INavbarComponent> = ({ onSidebarToggle }) => {
  const d = useAppDispatch();
  const { pathname } = useLocation();
  const [isToolbarOpened, setIsToolbarOpened] = useState(false);
  const { colorMode } = useColorMode();
  const colorModeChangeStatus = useAppSelector(uiColorModeChangeStatusSelector);
  const [inactive, secondaryAlt, secondary, hoverColor, impact, border, inputHover] = [
    useColorModeValue(COLORS.blue[500], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[600], COLORS.blue[500]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
    useColorModeValue(COLORS.white[300], COLORS.darkBlue[400]),
    useColorModeValue(COLORS.yellow[400], COLORS.yellow[400]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
    useColorModeValue(COLORS.white[100], COLORS.darkBlue[300]),
  ];

  const hover = {
    transform: 'perspective(100px) translateZ(4px)',
  };
  const active = {
    transform: 'perspective(100px) translateZ(-2px)',
  };

  const animation = useMemo(() => `${ANIMATION_KEYFRAMES} 20s ease-in-out 5s infinite`, []);

  const toggleToolbarCb = useCallback(() => {
    setIsToolbarOpened((_) => !_);
  }, []);

  const onCartToggleCb = useCallback(() => {
    toggleToolbarCb();
    void d(setIsCartOpenedUi({ isOpened: 'toggle' }));
  }, [d, toggleToolbarCb]);

  const profileClickCb = useCallback(() => {
    switch (pathname) {
      case '/login':
        changeRoute('/register');
        break;
      case '/register':
        changeRoute('/login');
        break;
      default:
        changeRoute('/login');
    }
  }, [pathname]);

  const onAvatarClickCb = useBreakpointValue(
    {
      base: toggleToolbarCb,
      md: profileClickCb,
    },
    {
      fallback: 'desktop',
    },
  );

  return (
    <Flex
      direction={'row'}
      alignItems={'center'}
      h={'100%'}
      py={4}
      gap={{ base: 4, sm: 6 }}
      px={6}
      overflowX={'hidden'}
    >
      <Image
        src={logo}
        filter={'auto'}
        brightness={'100%'}
        objectFit={'contain'}
        maxH={{ base: '30px', sm: 'max-content' }}
        as={motion.img}
        animation={animation}
      />

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
          onClick={onSidebarToggle}
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
            _hover={{
              bg: inputHover,
            }}
            borderRadius={'20px'}
            pl={12}
          />
        </InputGroup>
      </Flex>

      <Spacer />

      <Flex direction={'row'} alignItems={'center'} gap={4}>
        <NavbarIconsComponentMemo
          isOpened={isToolbarOpened}
          onCartToggle={onCartToggleCb}
          isThemeToggleAvailable={colorModeChangeStatus === 'completed'}
          currentTheme={colorMode}
          onThemeToggle={() => {
            void d(initiateColorModeChangeUi());
          }}
          onProfileClick={profileClickCb}
        />
        <Circle
          size={10}
          cursor={'pointer'}
          onClick={onAvatarClickCb}
          borderRadius={'20px'}
          background={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23${impact.slice(
            1,
          )}' stroke-width='3' stroke-dasharray='4%2c10' stroke-dashoffset='66' stroke-linecap='square'/%3e%3c/svg%3e");`}
          transform={'perspective(100px) translateZ(0px)'}
          _hover={hover}
          _active={active}
          _focus={hover}
        >
          <Avatar
            src={pfp}
            bg={impact}
            objectFit={'contain'}
            borderRadius={'20px'}
            w={'80%'}
            h={'80%'}
            animation={'none'}
          />
        </Circle>
      </Flex>
    </Flex>
  );
};
