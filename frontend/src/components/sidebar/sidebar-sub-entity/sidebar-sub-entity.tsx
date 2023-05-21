import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useState, memo } from 'react';
import { COLORS_MAP_DARK, COLORS_MAP_LIGHT } from '../../../chakra-setup';

interface ISidebarSubEntity {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
  isSidebarOpened: boolean;
}

const SidebarSubEntity: FC<ISidebarSubEntity> = ({
  title,
  isSelected,
  onSelect,
  isSidebarOpened,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inactive, secondaryAlt, impact, impactHover, impactActive] = [
    useColorModeValue(COLORS_MAP_LIGHT.inactive, COLORS_MAP_DARK.inactive),
    useColorModeValue(COLORS_MAP_LIGHT.secondaryAlt, COLORS_MAP_DARK.secondaryAlt),
    useColorModeValue(COLORS_MAP_LIGHT.impact, COLORS_MAP_DARK.impact),
    useColorModeValue(COLORS_MAP_LIGHT.impactHover, COLORS_MAP_DARK.impactHover),
    useColorModeValue(COLORS_MAP_LIGHT.impactActive, COLORS_MAP_DARK.impactActive),
  ];

  return (
    <Flex
      position={'relative'}
      h={'50px'}
      minH={'50px'}
      direction={'row'}
      alignItems={'center'}
      cursor={'pointer'}
      onClick={onSelect}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Box position={'absolute'} left={0} w={'2px'} h={'100%'} bg={inactive} />
      <Flex h={'100%'} direction={'row'} alignItems={'center'}>
        <Box
          position={'absolute'}
          w={'3px'}
          h={'50%'}
          borderRadius={'30px'}
          bg={isSelected ? impact : 'transparent'}
        />
        <Text
          pl={8}
          variant={{ base: 'sm' }}
          opacity={isSidebarOpened ? 1 : 0}
          color={isSelected ? impactHover : isHovered ? impactActive : secondaryAlt}
          transform={isHovered ? 'translateX(3px)' : 'none'}
          transition={
            'transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.1s linear, color 0.1s linear'
          }
        >
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

const SidebarSubEntityMemo = memo(SidebarSubEntity);

export { SidebarSubEntityMemo };
