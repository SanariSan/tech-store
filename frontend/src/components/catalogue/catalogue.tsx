import { Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { goodsSubCategoriesSelector } from '../../store';

interface ICatalogueComponent {
  [key: string]: unknown;
}

export const CatalogueComponent: React.FC<ICatalogueComponent> = () => {
  const subCategories = useAppSelector(goodsSubCategoriesSelector);

  return (
    <Flex direction={'column'} w={'100%'} h={'max-content'} py={8} px={10}>
      <HStack w={'100%'} h={'75px'} pb={4}>
        <Text>{JSON.stringify(subCategories)}</Text>
      </HStack>

      <SimpleGrid h={'max-content'} w={'100%'} spacing={10} minChildWidth={'400px'}>
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
    </Flex>
  );
};
