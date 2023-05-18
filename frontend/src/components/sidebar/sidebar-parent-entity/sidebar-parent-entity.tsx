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
      transition={'opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'}
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
        color={isSelected ? 'yellow.400' : 'blue.500'}
        _hover={{
          color: isSelected ? 'yellow.400' : 'blue.600',
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
