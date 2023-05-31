import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import memoizeOne from 'memoize-one';
import type { FC, MutableRefObject } from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import type { VariableSizeGrid as Grid } from 'react-window';
import { BreadcrumbComponentMemo } from '../../components/breadcrumb';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import type { TEntities } from '../../store';
import {
  goodsHasMoreEntitiesSelector,
  goodsOffsetPerPageSelector,
  pushCartEntity,
  pushLikedEntity,
  removeLikedEntity,
  uiColorModeAnimationDurationSelector,
  uiColorModeChangeStatusSelector,
  uiIsMobileSelector,
} from '../../store';
import { ModifiersContainer } from '../modifiers';
import { AutoSizedGridWrapContainerMemo } from './grid';
import type { TItemData } from './grid/grid.type';

const createItemData = memoizeOne(
  (
    entitiesList: TItemData['entitiesList'],
    columnCount: TItemData['columnCount'],
    onLikeCb: TItemData['onLikeCb'],
    onDislikeCb: TItemData['onDislikeCb'],
    onBuyCb: TItemData['onBuyCb'],
    isThemeChanging: TItemData['isThemeChanging'],
    variant: TItemData['variant'],
  ) => ({
    entitiesList,
    columnCount,
    onLikeCb,
    onDislikeCb,
    onBuyCb,
    isThemeChanging,
    variant,
  }),
);

type TItemsGridContainerProps = {
  title: string;
  breadcrumbList: Parameters<typeof BreadcrumbComponentMemo>['0']['list'];
  modifiersList: Parameters<typeof ModifiersContainer>['0']['list'];
  entitiesList: TEntities;
  onEntitiesEndReachCb?: () => void;
  gridRef: MutableRefObject<Grid | null>;
  variant: 'infinite' | 'static';
};

const ItemsGridContainer: FC<TItemsGridContainerProps> = ({
  title,
  breadcrumbList,
  modifiersList,
  entitiesList,
  onEntitiesEndReachCb,
  gridRef,
  variant,
}) => {
  const d = useAppDispatch();
  const isMobile = useAppSelector(uiIsMobileSelector);
  const chunkSize = useAppSelector(goodsOffsetPerPageSelector);
  const hasMoreEntities = useAppSelector(goodsHasMoreEntitiesSelector);
  const colorModeChangeStatus = useAppSelector(uiColorModeChangeStatusSelector);
  const colorModeChangeAnimationDuration = useAppSelector(uiColorModeAnimationDurationSelector);

  const entitiesRef = useRef(entitiesList);
  const mountRenderCompleted = useRef(false);

  const [scrollPos, setScrollPos] = useState({ top: 0, left: 0 });
  const [rowColPos, setRowColPos] = useState({ rowIndex: 0, columnIndex: 0 });

  const [colorModeChangeStatusProxy, setColorModeChangeStatusProxy] =
    useState(colorModeChangeStatus);
  const columnCount =
    useBreakpointValue(
      {
        base: 1,
        lg: 2,
        xl: 3,
        xxl: 4,
      },
      {
        fallback: 'base',
      },
    ) ?? 1;
  const rowsPerChunk = useMemo(() => Math.ceil(chunkSize / columnCount), [chunkSize, columnCount]);
  const getRowCountCb = useCallback(
    () =>
      variant === 'infinite'
        ? Math.floor(entitiesRef.current.length / columnCount) +
          (hasMoreEntities ? rowsPerChunk : 0)
        : Math.ceil(entitiesRef.current.length / columnCount),
    [columnCount, variant, rowsPerChunk, hasMoreEntities],
  );
  const [rowCount, setRowCount] = useState(() => getRowCountCb());

  type TId = { id: string };
  const onBuyCb = useCallback(({ id }: TId) => d(pushCartEntity({ entityId: id })), [d]);
  const onLikeCb = useCallback(({ id }: TId) => d(pushLikedEntity({ entityId: id })), [d]);
  const onDislikeCb = useCallback(({ id }: TId) => d(removeLikedEntity({ entityId: id })), [d]);

  // recalculate rows and reset cached items on resize
  const onResize = useCallback(() => {
    if (gridRef.current != null) {
      setRowCount(getRowCountCb());
      gridRef.current.resetAfterIndices({ columnIndex: 0, rowIndex: 0, shouldForceUpdate: true });
    }
  }, [gridRef, getRowCountCb]);

  const onItemsRenderedCb = useCallback(
    ({
      visibleRowStartIndex,
      visibleColumnStartIndex,
    }: {
      visibleRowStartIndex: number;
      visibleColumnStartIndex: number;
    }) => {
      setRowColPos({ rowIndex: visibleRowStartIndex, columnIndex: visibleColumnStartIndex });
    },
    [],
  );

  const onScrollCb = useCallback(
    ({ scrollTop, scrollLeft }: { scrollTop: number; scrollLeft: number }) => {
      setScrollPos({ top: scrollTop, left: scrollLeft });
    },
    [],
  );

  const isThemeChanging = useMemo(
    () => colorModeChangeStatus !== 'completed' || colorModeChangeStatusProxy !== 'completed',
    [colorModeChangeStatus, colorModeChangeStatusProxy],
  );

  // replicate entities state to ref so it could be passed to memoized component not breaking cache
  useEffect(() => {
    entitiesRef.current = entitiesList;
    // update current row count in case of category-modifier change
    setRowCount(getRowCountCb());
  }, [entitiesList, getRowCountCb]);

  // fetch more on end reaching
  useEffect(() => {
    if (!mountRenderCompleted.current) return;
    if (!hasMoreEntities) return;

    const maxRows = rowCount;
    const rowsSeen = rowColPos.rowIndex;
    const bufferRows = 3;

    if (rowsSeen + rowsPerChunk + bufferRows >= maxRows) {
      if (onEntitiesEndReachCb !== undefined) onEntitiesEndReachCb();
      setRowCount(getRowCountCb());
    }
  }, [rowColPos, rowCount, rowsPerChunk, getRowCountCb, onEntitiesEndReachCb, hasMoreEntities]);

  // reset items grid state on screen size breakpoint change
  useEffect(() => {
    onResize();
  }, [columnCount, onResize]);

  // color mode change local controller
  useEffect(() => {
    // instantly replicate ongoing state locally
    if (colorModeChangeStatus === 'ongoing') {
      setColorModeChangeStatusProxy('ongoing');
      return;
    }

    const delay = isMobile
      ? colorModeChangeAnimationDuration
      : colorModeChangeAnimationDuration + 750;

    // extra delay to let color theme animation properly finish, then replicate 'finished' state
    const timer = setTimeout(() => {
      setColorModeChangeStatusProxy(colorModeChangeStatus);
      return;
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [colorModeChangeStatus, colorModeChangeAnimationDuration, isMobile]);

  // scroll to nearest row start on theme change so screenshot matches page state
  // may be buggy, still works
  useEffect(() => {
    if (gridRef.current !== null && colorModeChangeStatus === 'ongoing') {
      gridRef.current.scrollToItem({
        columnIndex: rowColPos.columnIndex,
        rowIndex: rowColPos.rowIndex,
        align: 'end',
      });
    }
  }, [gridRef, colorModeChangeStatus, rowColPos]);

  const [forceRerenderFlag, setForceRerenderFlag] = useState(false);

  // reset flag since it's affecting useIsScrolling grid prop
  useEffect(() => {
    if (forceRerenderFlag) {
      setForceRerenderFlag(false);
    }
  }, [forceRerenderFlag]);

  // force rerender items in visible range
  // placeholders being replaced with items, memoized items not touched
  useEffect(() => {
    if (gridRef.current !== null) {
      // forceUpdate not woking, alright, triggering rerender in a BAD way 💀
      // gridRef.current.forceUpdate();
      setForceRerenderFlag((s) => !s);
    }
  }, [gridRef, entitiesList]);

  useEffect(() => {
    if (!mountRenderCompleted.current) mountRenderCompleted.current = true;

    return () => {
      mountRenderCompleted.current = false;
    };
  }, []);

  // compose and memoize props for memoized grid Item component
  const itemData = createItemData(
    entitiesRef,
    columnCount,
    onLikeCb,
    onDislikeCb,
    onBuyCb,
    isThemeChanging,
    variant,
  );

  return (
    <Flex direction={'column'} w={'100%'} h={'100%'} gap={3}>
      <Flex
        w={'100%'}
        minW={{ base: '230px', sm: '375px' }}
        minH={'max-content'}
        pt={8}
        pb={4}
        px={{ base: 6, sm: 8, md: 10 }}
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

      <Box w={'100%'} h={'100%'}>
        <AutoSizer onResize={onResize}>
          {({ height, width }) => (
            <AutoSizedGridWrapContainerMemo
              width={width ?? 0}
              height={height ?? 0}
              columnCount={columnCount}
              gridRef={gridRef}
              itemData={itemData}
              onItemsRenderedCb={onItemsRenderedCb}
              onScrollCb={onScrollCb}
              rowCount={rowCount}
              scrollPos={scrollPos}
              forceRerenderFlag={forceRerenderFlag}
            />
          )}
        </AutoSizer>
      </Box>
    </Flex>
  );
};

export const ItemsGridComponentMemo = memo(ItemsGridContainer);
