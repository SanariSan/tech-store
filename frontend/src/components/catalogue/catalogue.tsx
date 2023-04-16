import {
  Box,
  Circle,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  SimpleGrid,
} from '@chakra-ui/react';
import React from 'react';

interface ICatalogueComponent {
  [key: string]: unknown;
}

export const CatalogueComponent: React.FC<ICatalogueComponent> = () => {
  const a = 1;
  return (
    <SimpleGrid h={'max-content'} w={'100%'} spacing={10} py={10} px={10} minChildWidth={'400px'}>
      {Array.from({ length: 30 }, (el, idx) => (
        <Flex
          key={`cat-${idx}`}
          direction={'column'}
          minH={'450px'}
          bg={'white.200'}
          borderRadius={'20px'}
        >
          <Flex w={'100%'} h={'100%'} pb={4}>
            <Flex w={'100%'} h={'70%'} bg={'blue.300'} borderRadius={'20px'}></Flex>
          </Flex>
        </Flex>
      ))}
    </SimpleGrid>
  );
};
