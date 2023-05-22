import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import type { IconProps } from '@chakra-ui/react';
import { Box, Circle, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import { COLORS } from '../../../chakra-setup';

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
    useColorModeValue(COLORS.blue[500], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[400], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[600], COLORS.blue[500]),
    useColorModeValue(COLORS.white[300], COLORS.darkBlue[300]),
    useColorModeValue(COLORS.blue[800], COLORS.white[900]),
    useColorModeValue(COLORS.yellow[400], COLORS.yellow[400]),
    useColorModeValue(COLORS.white[100], COLORS.darkBlue[400]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
  ];

  return (
    <Flex
      w={'100%'}
      h={'50px'}
      minH={'50px'}
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
        overflowX={'hidden'}
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
          ml={{ base: 4, sm: 5 }}
          color={isSelected ? impact : inactive}
          _hover={{
            color: isSelected ? impact : secondaryAlt,
          }}
        />

        <Text
          pl={{ base: 4, sm: 5 }}
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
