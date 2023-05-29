import { useBreakpointValue } from '@chakra-ui/react';
import type { MutableRefObject } from 'react';
import { useEffect, memo, useMemo } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import type { TItemData } from './grid.type';
import { ItemContainerMemo } from './item.grid';

const AutoSizedGridWrapContainer = ({
  width,
  height,
  itemData,
  columnCount,
  rowCount,
  scrollPos,
  onScrollCb,
  onItemsRenderedCb,
  gridRef,
  forceRerenderFlag,
}: {
  width: number;
  height: number;
  itemData: TItemData;
  columnCount: number;
  rowCount: number;
  scrollPos: { top: number; left: number };
  onScrollCb: ({ scrollTop, scrollLeft }: { scrollTop: number; scrollLeft: number }) => void;
  onItemsRenderedCb: ({
    visibleRowStartIndex,
    visibleColumnStartIndex,
  }: {
    visibleRowStartIndex: number;
    visibleColumnStartIndex: number;
  }) => void;
  gridRef: MutableRefObject<Grid | null>;
  forceRerenderFlag: boolean;
}) => {
  const buffer = 25;
  const minReasonableItemSize = useBreakpointValue(
    {
      base: 425 + buffer,
      sm: 490 + buffer,
    },
    {
      fallback: 'base',
    },
  ) as number;
  const w = useMemo(() => width, [width]);
  const h = useMemo(() => height, [height]);
  const colW = useMemo(() => w / columnCount, [w, columnCount]);
  const rowH = useMemo(
    () => (h < 480 ? Math.max(minReasonableItemSize, h) : Math.min(minReasonableItemSize, h)),
    [h, minReasonableItemSize],
  );

  useEffect(() => {
    if (gridRef.current !== null) {
      gridRef.current.resetAfterIndices({ columnIndex: 0, rowIndex: 0, shouldForceUpdate: true });
    }
  }, [gridRef, w, h, colW, rowH]);

  return (
    <Grid
      itemData={itemData}
      width={w}
      height={h}
      rowHeight={() => rowH}
      columnWidth={() => colW}
      rowCount={rowCount}
      columnCount={columnCount}
      initialScrollTop={rowH * scrollPos.top}
      initialScrollLeft={colW * scrollPos.left}
      overscanRowCount={1}
      onScroll={onScrollCb}
      onItemsRendered={onItemsRenderedCb}
      ref={gridRef}
      style={{ overscrollBehavior: 'contain' }}
      // most sane force rerendering 💀
      useIsScrolling={forceRerenderFlag}
    >
      {ItemContainerMemo}
    </Grid>
  );
};

const AutoSizedGridWrapContainerMemo = memo(AutoSizedGridWrapContainer);

export { AutoSizedGridWrapContainerMemo };
