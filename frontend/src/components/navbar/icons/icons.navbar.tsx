import { BellIcon, MoonIcon } from '@chakra-ui/icons';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import { CartIcon } from '../../icons';
import { COLORS } from '../../../chakra-setup';

const NavbarIconsComponent: FC<{
  isOpened: boolean;
  onCartToggle: () => void;
  onThemeToggle: () => void;
}> = ({ isOpened, onCartToggle, onThemeToggle }) => {
  const [inactive, secondaryAlt, border, bg] = [
    useColorModeValue(COLORS.blue[500], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[600], COLORS.blue[500]),
    useColorModeValue(COLORS.white[300], COLORS.darkBlue[200]),
    useColorModeValue(COLORS.white[200], COLORS.darkBlue[500]),
  ];

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
      borderStyle={'solid'}
      borderColor={{ base: isOpened ? border : 'transparent', md: 'transparent' }}
      borderWidth={{ base: '2px', md: '0px' }}
      borderRadius={'100px'}
    >
      <MoonIcon
        boxSize={{ base: 4, md: 5 }}
        color={inactive}
        _hover={{
          color: secondaryAlt,
        }}
        _active={{
          color: inactive,
        }}
        cursor={'pointer'}
        onClick={onThemeToggle}
        mt={{ base: 4, md: 0 }}
      />
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
