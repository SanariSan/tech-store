import { Box, Text } from '@chakra-ui/react';
import type { FC } from 'react';

type TModifierProps = {
  title: string;
  isSelected: boolean;
  onClick: () => void;
};

export const ModifierComponent: FC<TModifierProps> = ({ title, isSelected, onClick }) => (
  <Box
    minW={'max-content'}
    minH={'max-content'}
    textAlign={'center'}
    borderRadius={'20px'}
    background={isSelected ? 'blue.800' : 'white.300'}
    wordBreak={'keep-all'}
    onClick={onClick}
  >
    <Text
      variant={{ base: 'base', sm: 'sm' }}
      color={isSelected ? 'white.900' : 'blue.600'}
      cursor={'pointer'}
      px={3}
      py={2}
    >
      {title}
    </Text>
  </Box>
);
