import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useDelayedUnmount } from '../../hooks/use-delayed-unmount';
import { useElementScrollPosition } from '../../hooks/use-scroll-position';
import {
  fetchMoreEntitiesAsync,
  goodsEntitiesSelector,
  goodsLoadingStatusSelector,
  goodsOffsetPerPageSelector,
  goodsSelectedCategoryRouteSelector,
  goodsSelectedCategorySelector,
  goodsSelectedModifierSelector,
  goodsSelectedSectionSelector,
  setSelectedModifier,
} from '../../store';
import { CardComponentMemo } from './card';
import { SkeletonPlaceholderComponentMemo } from './skeleton';

interface ICatalogueComponent {
  [key: string]: unknown;
}

const CatalogueComponent: React.FC<ICatalogueComponent> = () => {
  const d = useAppDispatch();
  const scrollElRef = useRef<HTMLDivElement | null>(null);
  const chunkSize = useAppSelector(goodsOffsetPerPageSelector);
  const selectedSection = useAppSelector(goodsSelectedSectionSelector);
  const selectedCategory = useAppSelector(goodsSelectedCategorySelector);
  const selectedModifier = useAppSelector(goodsSelectedModifierSelector);
  const entities = useAppSelector(goodsEntitiesSelector);
  const entitiesLoadingStatus = useAppSelector(goodsLoadingStatusSelector);
  const selectedCategoryRoute = useAppSelector(goodsSelectedCategoryRouteSelector);

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

  const skeletonPlaceholders = useMemo(
    () =>
      Array.from({ length: chunkSize }, () => (
        <SkeletonPlaceholderComponentMemo isLoading={isLoading} />
      )),
    [chunkSize, isLoading],
  );

  useEffect(() => {
    console.log('Route arr', selectedCategoryRoute);
  }, [selectedCategoryRoute]);

  const BreadcrumbComponent = () => (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      {[selectedSection, ...selectedCategoryRoute].map((route) => (
        <BreadcrumbItem>
          <BreadcrumbLink href={'#'}>
            <Text variant={{ base: 'base', sm: 'sm' }} color={'blue.600'}>
              {`${route.title.charAt(0).toUpperCase()}${route.title.slice(1)}`}
            </Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );

  const ModifiersComponent = () => (
    <Flex w={'100%'} alignItems={'center'} justifyContent={'flex-start'} flexWrap={'wrap'} gap={3}>
      {selectedCategory !== undefined && selectedCategory.modifiers !== undefined
        ? [{ title: undefined }, ...selectedCategory.modifiers].map((modifier) => (
            <Box
              minW={'max-content'}
              minH={'max-content'}
              textAlign={'center'}
              borderRadius={'20px'}
              background={selectedModifier?.title === modifier.title ? 'blue.800' : 'white.300'}
              wordBreak={'keep-all'}
              onClick={() => {
                void d(
                  setSelectedModifier({
                    modifier: modifier.title === 'all' ? undefined : modifier.title,
                  }),
                );
              }}
            >
              <Text
                variant={{ base: 'base', sm: 'sm' }}
                color={selectedModifier?.title === modifier.title ? 'white.900' : 'blue.600'}
                cursor={'pointer'}
                px={3}
                py={2}
              >
                {modifier.title === undefined
                  ? 'All'
                  : `${modifier.title.charAt(0).toUpperCase()}${modifier.title.slice(1)}`}
              </Text>
            </Box>
          ))
        : ''}
    </Flex>
  );

  return (
    <Flex
      direction={'column'}
      w={'100%'}
      h={'100%'}
      py={8}
      px={{ base: 6, sm: 8, md: 10 }}
      overflowY={'scroll'}
      ref={scrollElRef}
    >
      <Flex w={'100%'} minH={'max-content'} pb={4} gap={6} direction={'column'}>
        <Flex w={'100%'} minH={'max-content'} gap={3} direction={'column'}>
          <BreadcrumbComponent />
          <Text variant={{ base: 'md', sm: 'lg' }} fontWeight={'bold'}>
            Best Selling Electronics Products - Weekly Update.
          </Text>
        </Flex>
        <ModifiersComponent />
      </Flex>

      <SimpleGrid
        h={'max-content'}
        w={'100%'}
        spacing={7}
        minChildWidth={{ base: '200px', sm: '300px', md: '350px', lg: '350px' }}
      >
        {entities.map(({ id, ...entity }, idx) => (
          <React.Fragment key={`${id}`}>
            <CardComponentMemo orderIdx={idx % (chunkSize / 2)} {...entity} />
          </React.Fragment>
        ))}
        {isMounted &&
          skeletonPlaceholders.map((_, idx) => (
            <React.Fragment key={`Skeleton-${idx}`}>{_}</React.Fragment>
          ))}
      </SimpleGrid>
    </Flex>
  );
};

export const CatalogueComponentMemo = memo(CatalogueComponent);
