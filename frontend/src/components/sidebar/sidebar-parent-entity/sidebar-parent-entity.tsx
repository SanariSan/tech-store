import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import type { IconProps } from '@chakra-ui/react';
import { Box, Circle, Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';

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
}) => (
  <Flex
    w={'100%'}
    h={'50px'}
    direction={'row'}
    color={isSelected ? 'blue.800' : 'blue.600'}
    bg={isSelected ? 'white.300' : 'transparent'}
    _hover={{
      bg: isSelected ? 'white.300' : 'white.400',
    }}
    borderRadius={'0 25px 25px 0'}
    cursor={'pointer'}
  >
    <Box
      opacity={isSelected ? 1 : 0}
      h={'100%'}
      w={'12px'}
      minW={'12px'}
      maxW={'12px'}
      bg={'yellow.400'}
      clipPath={'polygon(0 0, 0% 100%, 100% 50%)'}
    />
    <Flex
      w={'100%'}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      onClick={() => {
        if (!isSelected) onSelect();
      }}
    >
      <Icon
        boxSize={10}
        pl={5}
        color={isSelected ? 'yellow.400' : 'blue.500'}
        _hover={{
          color: isSelected ? 'yellow.400' : 'blue.600',
        }}
      />

      <Text pl={5} opacity={isSidebarOpened ? 1 : 0}>
        {title}
      </Text>

      {hasSub && (
        <Box
          ml={'auto'}
          mr={5}
          opacity={isSidebarOpened ? 1 : 0}
          onClick={(e) => {
            e.stopPropagation();
            onSubUnfold();
          }}
        >
          <Circle size={'18px'} border={'2px'} borderColor={'blue.300'}>
            {isSubUnfolded ? (
              <ChevronUpIcon color={'blue.400'} />
            ) : (
              <ChevronDownIcon color={'blue.400'} />
            )}
          </Circle>
        </Box>
      )}
    </Flex>
  </Flex>
);

const SidebarParentEntityMemo = memo(SidebarParentEntity);

export { SidebarParentEntityMemo };
