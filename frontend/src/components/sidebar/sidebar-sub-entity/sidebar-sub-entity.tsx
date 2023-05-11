import { Box, Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { useState, memo } from 'react';

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

  return (
    <Flex
      position={'relative'}
      h={'50px'}
      minH={'50px'}
      direction={'row'}
      alignItems={'center'}
      cursor={'pointer'}
      onClick={onSelect}
      color={'blue.600'}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Box position={'absolute'} left={0} w={'2px'} h={'100%'} bg={'blue.500'} />
      <Flex h={'100%'} direction={'row'} alignItems={'center'}>
        <Box
          position={'absolute'}
          w={'3px'}
          h={'50%'}
          borderRadius={'30px'}
          bg={isSelected ? 'yellow.400' : 'transparent'}
        />
        <Text
          pl={8}
          variant={{ base: 'base', sm: 'sm' }}
          opacity={isSidebarOpened ? 1 : 0}
          color={isSelected ? 'yellow.400' : isHovered ? 'yellow.300' : 'blue.600'}
          transform={isHovered ? 'translateX(3px)' : 'none'}
          transition={'transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.1s linear'}
        >
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

const SidebarSubEntityMemo = memo(SidebarSubEntity);

export { SidebarSubEntityMemo };
