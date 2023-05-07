import { Flex, HStack, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React, { memo, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useDelayedUnmount } from '../../hooks/use-delayed-unmount';
import { useElementScrollPosition } from '../../hooks/use-scroll-position';
import {
  fetchMoreEntitiesAsync,
  goodsEntitiesSelector,
  goodsLoadingStatusSelector,
  goodsOffsetPerPageSelector,
  goodsSelectedCategorySelector,
  goodsSubCategoriesSelector,
} from '../../store';
import { CardComponentMemo } from './card';

interface ICatalogueComponent {
  [key: string]: unknown;
}

const CatalogueComponent: React.FC<ICatalogueComponent> = () => {
  const d = useAppDispatch();
  const scrollElRef = useRef<HTMLDivElement | null>(null);
  const chunkSize = useAppSelector(goodsOffsetPerPageSelector);
  const selectedCategory = useAppSelector(goodsSelectedCategorySelector);
  const subCategories = useAppSelector(goodsSubCategoriesSelector);
  const entities = useAppSelector(goodsEntitiesSelector);
  const entitiesLoadingStatus = useAppSelector(goodsLoadingStatusSelector);

  const isLoading = entitiesLoadingStatus === 'loading';
  const { isMounted } = useDelayedUnmount({
    isVisible: isLoading,
    delay: 1000,
  });

  // sub to scroll position hook
  const { isElementEnd } = useElementScrollPosition({
    elementRef: scrollElRef,
    endOffset: 800,
  });

  // fetch items on mount / category change (only initial load)
  useEffect(() => {
    if (scrollElRef.current !== null) {
      scrollElRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    void d(fetchMoreEntitiesAsync());
  }, [selectedCategory, d]);

  // fetch more items if reaching page end
  useEffect(() => {
    if (isElementEnd && !isLoading) {
      void d(fetchMoreEntitiesAsync());
    }
  }, [isElementEnd, isLoading, d]);

  const skeletonPlaceholders = Array.from({ length: chunkSize }, () => (
    <Skeleton
      height="435px"
      opacity={isLoading ? 1 : 0}
      borderRadius={'20px'}
      startColor="gray.100"
      endColor="blue.400"
      transition={'opacity 1s linear'}
    />
  ));

  return (
    <Flex
      direction={'column'}
      w={'100%'}
      h={'100%'}
      py={8}
      px={10}
      overflowY={'scroll'}
      ref={scrollElRef}
    >
      <HStack w={'100%'} h={'75px'} pb={4}>
        <Text>
          {selectedCategory !== undefined && subCategories[selectedCategory] !== undefined
            ? (subCategories[selectedCategory] as string[]).map((subCategory) =>
                JSON.stringify(subCategory),
              )
            : ''}
        </Text>
      </HStack>
      <SimpleGrid
        h={'max-content'}
        w={'100%'}
        spacing={7}
        minChildWidth={{ base: '250px', sm: '250px', md: '250px', lg: '300px', xl: '300px' }}
      >
        {entities.map(({ id, ...entity }) => (
          <CardComponentMemo key={`${id}`} {...entity} />
        ))}
        {isMounted && skeletonPlaceholders.map((_) => _)}
      </SimpleGrid>
    </Flex>
  );
};

export const CatalogueComponentMemo = memo(CatalogueComponent);
