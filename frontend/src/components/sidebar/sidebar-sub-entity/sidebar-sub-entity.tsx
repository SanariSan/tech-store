import { Box, Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';

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
}) => (
  <Flex
    position={'relative'}
    h={'50px'}
    minH={'50px'}
    direction={'row'}
    alignItems={'center'}
    cursor={'pointer'}
    onClick={onSelect}
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
        opacity={isSidebarOpened ? 1 : 0}
        color={isSelected ? 'yellow.400' : 'blue.600'}
        _hover={{
          color: isSelected ? 'yellow.400' : 'yellow.300',
        }}
      >
        {title}
      </Text>
    </Flex>
  </Flex>
);

const SidebarSubEntityMemo = memo(SidebarSubEntity);

export { SidebarSubEntityMemo };
