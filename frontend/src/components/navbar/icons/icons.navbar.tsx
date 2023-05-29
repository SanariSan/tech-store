import { BellIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import type { ColorMode } from '@chakra-ui/react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useCallback, memo, useEffect, useMemo, useRef } from 'react';
import { COLORS } from '../../../chakra-setup';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setColorModeToogleCoords, uiScreenDetailsSelector } from '../../../store';
import { CartIcon } from '../../icons';
import { useDebounce } from '../../../hooks/use-debounce';

const NavbarIconsComponent: FC<{
  isOpened: boolean;
  isThemeToggleAvailable: boolean;
  currentTheme: ColorMode;
  onCartToggle: () => void;
  onThemeToggle: () => void;
}> = ({ isOpened, isThemeToggleAvailable, currentTheme, onCartToggle, onThemeToggle }) => {
  const d = useAppDispatch();
  const screenDetails = useAppSelector(uiScreenDetailsSelector);
  const refIcons = useRef<HTMLDivElement | null>(null);
  const [inactive, secondaryAlt, border, bg] = [
    useColorModeValue(COLORS.blue[500], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[600], COLORS.blue[500]),
    useColorModeValue(COLORS.white[300], COLORS.darkBlue[200]),
    useColorModeValue(COLORS.white[200], COLORS.darkBlue[500]),
  ];

  const updateIconsCoordsCb = useCallback(() => {
    if (refIcons.current !== null) {
      const { x, y } = refIcons.current.getBoundingClientRect();
      void d(setColorModeToogleCoords({ x: x + 10, y: y + 10 }));
    }
  }, [d]);
  const [updateIconsCoordsDebounced] = useDebounce({ cb: updateIconsCoordsCb, delay: 350 });

  useEffect(() => {
    updateIconsCoordsDebounced();
  }, [d, screenDetails, updateIconsCoordsDebounced]);

  const themeSwitchProps = useMemo(
    () => ({
      boxSize: { base: 4, md: 5 },
      color: inactive,
      _hover: {
        color: secondaryAlt,
      },
      _active: {
        color: inactive,
      },
      cursor: 'pointer',
      onClick: isThemeToggleAvailable ? onThemeToggle : undefined,
      mt: { base: 4, md: 0 },
    }),
    [inactive, isThemeToggleAvailable, onThemeToggle, secondaryAlt],
  );

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      position={{ base: 'absolute', md: 'unset' }}
      width={{ base: '60px', md: 'max-content' }}
      maxHeight={{ base: isOpened ? '120px' : '0px', md: 'max-content' }}
      overflow={'hidden'}
      right={3}
      top={77}
      alignItems={'center'}
      gap={4}
      borderStyle={'dashed'}
      borderColor={{ base: isOpened ? border : 'transparent', md: 'transparent' }}
      borderWidth={{ base: '1px', md: '0px' }}
      borderRadius={'100px'}
      ref={refIcons}
    >
      {currentTheme === 'light' ? (
        <MoonIcon {...themeSwitchProps} />
      ) : (
        <SunIcon {...themeSwitchProps} />
      )}
      <BellIcon
        boxSize={{ base: 4, md: 5 }}
        color={inactive}
        _hover={{
          color: secondaryAlt,
        }}
        _active={{
          color: inactive,
        }}
        cursor={'pointer'}
      />
      <CartIcon
        boxSize={{ base: 4, md: 5 }}
        color={inactive}
        _hover={{
          color: secondaryAlt,
        }}
        _active={{
          color: inactive,
        }}
        onClick={onCartToggle}
        mb={{ base: 4, md: 0 }}
      />
      <Flex
        position={{ base: 'absolute', md: 'unset' }}
        width={{ base: '70px', md: '0px' }}
        height={'100%'}
        maxHeight={{ base: isOpened ? '120px' : '0px', md: 'max-content' }}
        opacity={0.9}
        transition={'opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'}
        background={bg}
        zIndex={-1}
      />
    </Flex>
  );
};

const NavbarIconsComponentMemo = memo(NavbarIconsComponent);

export { NavbarIconsComponent, NavbarIconsComponentMemo };
