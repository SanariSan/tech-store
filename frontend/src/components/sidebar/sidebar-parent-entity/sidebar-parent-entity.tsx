import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import type { IconProps } from '@chakra-ui/react';
import { useColorModeValue, Box, Circle, Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import { COLORS_MAP_DARK, COLORS_MAP_LIGHT } from '../../../chakra-setup';

interface ISidebarParentEntity {
  isSidebarOpened: boolean;
  icon: (props: IconProps) => JSX.Element;
  title: string;
  isSelected: boolean;
  hasSub: boolean;
  isSubUnfolded: boolean;
  onSubUnfold: () => void;
  onSelect: () => void;
}

const SidebarParentEntity: FC<ISidebarParentEntity> = ({
  isSidebarOpened,
  icon: Icon,
  title,
  isSelected,
  hasSub,
  isSubUnfolded,
  onSubUnfold,
  onSelect,
}) => {
  const [inactive, inactiveAlt, secondaryAlt, wrapBg, accent, impact, hover, secondary] = [
    useColorModeValue(COLORS_MAP_LIGHT.inactive, COLORS_MAP_DARK.inactive),
    useColorModeValue(COLORS_MAP_LIGHT.inactiveAlt, COLORS_MAP_DARK.inactiveAlt),
    useColorModeValue(COLORS_MAP_LIGHT.secondaryAlt, COLORS_MAP_DARK.secondaryAlt),
    useColorModeValue(COLORS_MAP_LIGHT.wrapBg, COLORS_MAP_DARK.wrapBg),
    useColorModeValue(COLORS_MAP_LIGHT.accent, COLORS_MAP_DARK.accent),
    useColorModeValue(COLORS_MAP_LIGHT.impact, COLORS_MAP_DARK.impact),
    useColorModeValue(COLORS_MAP_LIGHT.hover, COLORS_MAP_DARK.hover),
    useColorModeValue(COLORS_MAP_LIGHT.secondary, COLORS_MAP_DARK.secondary),
  ];

  return (
    <Flex
      w={'100%'}
      h={'50px'}
      direction={'row'}
      color={isSelected ? accent : secondaryAlt}
      bg={isSelected ? wrapBg : 'transparent'}
      _hover={{
        bg: isSelected ? wrapBg : hover,
      }}
      borderRadius={'0 25px 25px 0'}
      cursor={'pointer'}
    >
      <Box
        opacity={isSelected ? 1 : 0}
        transition={'opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'}
        h={'100%'}
        w={'12px'}
        minW={'12px'}
        maxW={'12px'}
        bg={impact}
        clipPath={'polygon(0 0, 0% 100%, 100% 50%)'}
      />
      <Flex
        w={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        onClick={() => {
          onSelect();
        }}
        transition={'transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1)'}
        _hover={{
          transform: 'translateX(3px)',
        }}
      >
        <Icon
          boxSize={{ base: 4, sm: 5 }}
          ml={{ base: 3, sm: 5 }}
          color={isSelected ? impact : inactive}
          _hover={{
            color: isSelected ? impact : secondaryAlt,
          }}
        />

        <Text
          pl={{ base: 3, sm: 5 }}
          variant={{ base: 'sm' }}
          opacity={isSidebarOpened ? 1 : 0}
          transition={'opacity 0.1s linear'}
        >
          {title}
        </Text>

        {hasSub && (
          <Box
            ml={'auto'}
            mr={5}
            opacity={isSidebarOpened ? 1 : 0}
            transition={'opacity 0.1s linear'}
            onClick={(e) => {
              e.stopPropagation();
              onSubUnfold();
            }}
          >
            <Circle size={'18px'} border={'2px'} borderColor={secondary}>
              {isSubUnfolded ? (
                <ChevronUpIcon color={inactiveAlt} />
              ) : (
                <ChevronDownIcon color={inactiveAlt} />
              )}
            </Circle>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

const SidebarParentEntityMemo = memo(SidebarParentEntity);

export { SidebarParentEntityMemo };
