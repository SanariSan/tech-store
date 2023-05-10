import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  HStack,
  SimpleGrid,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';
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
  goodsSelectedSectionSelector,
} from '../../store';
import { CardComponentMemo } from './card';
import { SkeletonPlaceholderComponentMemo } from './skeleton';
import { CATALOGUE_TEMPLATE } from '../../containers/catalogue';

interface ICatalogueComponent {
  [key: string]: unknown;
}

const CatalogueComponent: React.FC<ICatalogueComponent> = () => {
  const d = useAppDispatch();
  // const { pathname } = useLocation();

  const scrollElRef = useRef<HTMLDivElement | null>(null);
  const chunkSize = useAppSelector(goodsOffsetPerPageSelector);
  const selectedSection = useAppSelector(goodsSelectedSectionSelector);
  const selectedCategory = useAppSelector(goodsSelectedCategorySelector);
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
      <Flex w={'100%'} h={'125px'} pb={4}>
        <Flex gap={10}>
          <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
            {[selectedSection, ...selectedCategoryRoute].map((route, index) => (
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{route}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
          <Flex w={'100%'} alignItems={'flex-start'} justifyContent={'center'}>
            {selectedCategory !== undefined && selectedCategory.modifiers !== undefined
              ? selectedCategory.modifiers.map((modifier) => (
                  <Flex width={'100px'} h={'max-content'} borderRadius={'20px'} borderWidth={'1px'}>
                    {modifier.title}
                  </Flex>
                ))
              : ''}
          </Flex>
        </Flex>
      </Flex>
      <SimpleGrid
        h={'max-content'}
        w={'100%'}
        spacing={7}
        minChildWidth={{ base: '250px', sm: '250px', md: '250px', lg: '300px', xl: '300px' }}
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
