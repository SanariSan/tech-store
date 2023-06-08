import { Flex } from '@chakra-ui/react';
import type { CSSProperties } from 'react';
import { memo } from 'react';
import { areEqual } from 'react-window';
import { GridCardComponentMemo } from '../../../components/grid-card';
import { SkeletonPlaceholderComponentMemo } from '../../../components/skeleton';
import type { TEntities } from '../../../store';
import type { TItemData } from './grid.type';

const getRelativeIdx = ({
  rowIndex,
  columnIndex,
  columnCount,
}: {
  rowIndex: number;
  columnIndex: number;
  columnCount: number;
}) => rowIndex * columnCount + columnIndex;

const ItemContainer = ({
  columnIndex,
  rowIndex,
  style,
  data,
}: {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
  data: TItemData;
}) => {
  const {
    entitiesList,
    columnCount,
    isThemeChanging,
    hasMoreEntities,
    onBuyCb,
    onDislikeCb,
    onLikeCb,
  } = data;
  const idx = getRelativeIdx({ rowIndex, columnIndex, columnCount });
  const entity = entitiesList.current[idx] as TEntities[number] | undefined;

  // infinite catalogue/liked
  let content;

  if (isThemeChanging) {
    content = <SkeletonPlaceholderComponentMemo isLoading={true} />;
  } else if (entity === undefined) {
    content = hasMoreEntities ? <SkeletonPlaceholderComponentMemo isLoading={true} /> : null;
  } else {
    content = (
      <GridCardComponentMemo
        onLike={onLikeCb}
        onDislike={onDislikeCb}
        onBuy={onBuyCb}
        {...entity}
      />
    );
  }

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      key={`${idx}`}
      style={{
        ...style,
        // absolute offset based on current cell position
        left: columnIndex * ((style.width as number) + 25) + 25,
        // min cell width is min grid card width + buffer to not clip into screen side
        width: Math.max((style.width as number) - 50, 230 + 25),
      }}
    >
      {content}
    </Flex>
  );
};

const ItemContainerMemo = memo(ItemContainer, areEqual);

export { ItemContainerMemo };
