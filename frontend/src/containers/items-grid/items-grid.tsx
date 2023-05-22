import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import type { MutableRefObject } from 'react';
import React, { useLayoutEffect, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { BreadcrumbComponentMemo } from '../../components/breadcrumb';
import { GridCardComponentMemo } from '../../components/grid-card';
import { SkeletonPlaceholderComponentMemo } from '../../components/skeleton';
import { sleep } from '../../helpers/util';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useDelayedUnmount } from '../../hooks/use-delayed-unmount';
import type { TEntities } from '../../store';
import {
  goodsLikedEntitiesIdsSelector,
  goodsOffsetPerPageSelector,
  pushCartEntity,
  pushLikedEntity,
  removeLikedEntity,
  uiColorModeAnimationDurationSelector,
  uiColorModeChangeStatusSelector,
  uiIsMobileSelector,
} from '../../store';
import { ModifiersContainer } from '../modifiers';

type TItemsGridContainerProps = {
  title: string;
  breadcrumbList: Parameters<typeof BreadcrumbComponentMemo>['0']['list'];
  modifiersList: Parameters<typeof ModifiersContainer>['0']['list'];
  entitiesList: TEntities;
  areEntitiesLoading?: boolean;
  gridRef: MutableRefObject<HTMLDivElement | null>;
};

const ItemsGridContainer: React.FC<TItemsGridContainerProps> = ({
  title,
  breadcrumbList,
  modifiersList,
  entitiesList,
  areEntitiesLoading = false,
  gridRef,
}) => {
  const d = useAppDispatch();
  const chunkSize = useAppSelector(goodsOffsetPerPageSelector);
  const likedItems = useAppSelector(goodsLikedEntitiesIdsSelector);
  const colorModeChangeStatus = useAppSelector(uiColorModeChangeStatusSelector);
  const colorModeChangeAnimationDuration = useAppSelector(uiColorModeAnimationDurationSelector);
  const [colorModeChangeStatusProxy, setColorModeChangeStatusProxy] =
    useState(colorModeChangeStatus);
  const isMobile = useAppSelector(uiIsMobileSelector);
  const { isMounted: areSkeletonsMounted } = useDelayedUnmount({
    isVisible: areEntitiesLoading,
    delay: 1000,
  });

  useEffect(() => {
    const ac = new AbortController();

    // replicate state locally
    if (colorModeChangeStatus === 'ongoing') {
      setColorModeChangeStatusProxy('ongoing');
      return;
    }

    // extra delay to let color theme animation properly finish, then replicate state
    void sleep(
      isMobile ? colorModeChangeAnimationDuration : colorModeChangeAnimationDuration + 750,
    ).then(() => {
      if (ac.signal.aborted) return;
      setColorModeChangeStatusProxy(colorModeChangeStatus);
      return;
    });

    return () => {
      ac.abort();
    };
  }, [colorModeChangeStatus, colorModeChangeAnimationDuration, isMobile]);

  // scroll to the top on theme change so screenshot matches page state
  useLayoutEffect(() => {
    if (gridRef.current !== null && colorModeChangeStatus === 'ongoing') {
      gridRef.current.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
  }, [gridRef, colorModeChangeStatus]);

  const isInLiked = useCallback(({ id }: { id: string }) => likedItems.includes(id), [likedItems]);

  const onLikeCb = useCallback(
    ({ id }: { id: string }) =>
      () =>
        d(pushLikedEntity({ entityId: id })),
    [d],
  );
  const onDislikeCb = useCallback(
    ({ id }: { id: string }) =>
      () =>
        d(removeLikedEntity({ entityId: id })),
    [d],
  );

  const onBuyCb = useCallback(
    ({ id }: { id: string }) =>
      () => {
        void d(pushCartEntity({ entityId: id }));
      },
    [d],
  );

  const skeletonPlaceholders = useMemo(
    () =>
      Array.from({ length: chunkSize }, () => (
        <SkeletonPlaceholderComponentMemo isLoading={areEntitiesLoading} />
      )),
    [chunkSize, areEntitiesLoading],
  );

  const entities = useMemo(
    () =>
      entitiesList.map(({ id, ...entity }, idx) => (
        <React.Fragment key={`${id}`}>
          {/* show cards only if color theme change is fully completed */}
          {colorModeChangeStatus === 'completed' && colorModeChangeStatusProxy === 'completed' ? (
            <GridCardComponentMemo
              isLiked={isInLiked({ id })}
              // isInCart={isInCart}
              onLike={isInLiked({ id }) ? onDislikeCb({ id }) : onLikeCb({ id })}
              onBuy={onBuyCb({ id })}
              orderIdx={idx % (chunkSize / 2)}
              id={id}
              {...entity}
            />
          ) : (
            <SkeletonPlaceholderComponentMemo isLoading={true} />
          )}
        </React.Fragment>
      )),
    [
      chunkSize,
      entitiesList,
      isInLiked,
      onLikeCb,
      onDislikeCb,
      onBuyCb,
      colorModeChangeStatus,
      colorModeChangeStatusProxy,
    ],
  );

  return (
    <Flex
      direction={'column'}
      w={'100%'}
      h={'100%'}
      py={8}
      px={{ base: 6, sm: 8, md: 10 }}
      overflowY={'scroll'}
      ref={gridRef}
      gap={3}
    >
      <Flex
        w={'100%'}
        minW={{ base: '230px', sm: '375px' }}
        minH={'max-content'}
        pb={4}
        gap={6}
        direction={'column'}
      >
        <Flex w={'100%'} minH={'max-content'} gap={3} direction={'column'}>
          <BreadcrumbComponentMemo list={breadcrumbList} />
          <Text variant={{ base: 'md', sm: 'lg' }} fontWeight={'bold'} whiteSpace={'normal'}>
            {title}
          </Text>
        </Flex>
        <ModifiersContainer list={modifiersList} />
      </Flex>

      <SimpleGrid
        h={'max-content'}
        w={'100%'}
        spacing={7}
        // minChildWidth={{ base: '200px', sm: '300px', md: '350px', lg: '350px' }}
        gridTemplateColumns={{
          base: 'repeat(auto-fit, minmax(200px, 1fr))',
          sm: 'repeat(auto-fill, minmax(300px, 1fr))',
          md: 'repeat(auto-fill, minmax(350px, 1fr))',
        }}
      >
        {entities}
        {areSkeletonsMounted &&
          skeletonPlaceholders.map((_, idx) => (
            <React.Fragment key={`Skeleton-${idx}`}>{_}</React.Fragment>
          ))}
      </SimpleGrid>
    </Flex>
  );
};

export const ItemsGridComponentMemo = memo(ItemsGridContainer);
