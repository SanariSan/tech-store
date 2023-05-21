import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { COLORS_MAP_DARK, COLORS_MAP_LIGHT } from '../../chakra-setup';

type TModifierProps = {
  title: string;
  isSelected: boolean;
  onClick: () => void;
};

export const ModifierComponent: FC<TModifierProps> = ({ title, isSelected, onClick }) => {
  const [bgAlt, secondaryAlt, wrapBg, accent] = [
    useColorModeValue(COLORS_MAP_LIGHT.bgAlt, COLORS_MAP_DARK.bgAlt),
    useColorModeValue(COLORS_MAP_LIGHT.secondaryAlt, COLORS_MAP_DARK.secondaryAlt),
    useColorModeValue(COLORS_MAP_LIGHT.wrapBg, COLORS_MAP_DARK.wrapBg),
    useColorModeValue(COLORS_MAP_LIGHT.accent, COLORS_MAP_DARK.accent),
  ];

  return (
    <Box
      minW={'max-content'}
      minH={'max-content'}
      textAlign={'center'}
      borderRadius={'20px'}
      background={isSelected ? accent : wrapBg}
      wordBreak={'keep-all'}
      onClick={onClick}
    >
      <Text
        variant={{ base: 'base', sm: 'sm' }}
        fontWeight={'bold'}
        color={isSelected ? bgAlt : secondaryAlt}
        cursor={'pointer'}
        px={3}
        py={2}
      >
        {title}
      </Text>
    </Box>
  );
};
