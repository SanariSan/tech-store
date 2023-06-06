import { useBreakpointValue } from '@chakra-ui/react';
import type { CSSProperties, LegacyRef, MutableRefObject } from 'react';
import { forwardRef, memo, useCallback, useEffect, useMemo } from 'react';
import { VariableSizeGrid as Grid, areEqual } from 'react-window';
import type { TItemData } from './grid.type';
import { ItemContainerMemo } from './item.grid';

const InnerContainer = memo(
  forwardRef(
    (
      { width, style, ...rest }: { width: number; style?: CSSProperties },
      ref: LegacyRef<HTMLDivElement>,
    ) => (
      <div
        style={{
          ...style,
          width,
        }}
        ref={ref}
        {...rest}
      />
    ),
  ),
  areEqual,
);

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
  const heightBuffer = 30;
  const minReasonableItemHeight =
    useBreakpointValue(
      {
        base: 425 + heightBuffer,
        sm: 490 + heightBuffer,
      },
      {
        fallback: 'base',
      },
    ) ?? 425 + heightBuffer;
  const w = useMemo(() => width, [width]);
  const h = useMemo(() => height, [height]);
  const innerCorrectedWidth = useMemo(() => w - 40, [w]);

  const colW = useMemo(() => Math.max(w / columnCount - 25, 0), [w, columnCount]);
  const rowH = useMemo(
    () => (h < 480 ? Math.max(minReasonableItemHeight, h) : Math.min(minReasonableItemHeight, h)),
    [h, minReasonableItemHeight],
  );

  useEffect(() => {
    if (gridRef.current !== null) {
      gridRef.current.resetAfterIndices({ columnIndex: 0, rowIndex: 0, shouldForceUpdate: true });
    }
  }, [gridRef, w, h, colW, rowH]);

  const innerElementTypeCb = useCallback(
    (rest) => <InnerContainer width={innerCorrectedWidth} {...rest} />,
    [innerCorrectedWidth],
  );

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
      overscanRowCount={2}
      onScroll={onScrollCb}
      onItemsRendered={onItemsRenderedCb}
      ref={gridRef}
      style={{
        overscrollBehavior: 'contain',
        overflow: 'auto',
      }}
      // most sane force rerendering 💀
      useIsScrolling={forceRerenderFlag}
      innerElementType={innerElementTypeCb}
    >
      {ItemContainerMemo}
    </Grid>
  );
};

const AutoSizedGridWrapContainerMemo = memo(AutoSizedGridWrapContainer);

export { AutoSizedGridWrapContainerMemo };
