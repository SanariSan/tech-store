import type { CSSProperties } from 'react';
import { memo } from 'react';
import { Flex } from '@chakra-ui/react';
import { areEqual } from 'react-window';
import type { TItemData } from './grid.type';
import type { TEntities } from '../../../store';
import { SkeletonPlaceholderComponentMemo } from '../../../components/skeleton';
import { GridCardComponentMemo } from '../../../components/grid-card';

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
  const { entitiesList, columnCount, isThemeChanging, onBuyCb, onDislikeCb, onLikeCb, variant } =
    data;
  const idx = getRelativeIdx({ rowIndex, columnIndex, columnCount });
  const entity = entitiesList.current[idx] as TEntities[number] | undefined;

  // prevent placeholders showing is liked section
  let content;
  if (variant === 'infinite') {
    content =
      entity === undefined || isThemeChanging ? (
        <SkeletonPlaceholderComponentMemo isLoading={true} />
      ) : (
        <GridCardComponentMemo
          onLike={onLikeCb}
          onDislike={onDislikeCb}
          onBuy={onBuyCb}
          {...entity}
        />
      );
  } else {
    content = isThemeChanging ? (
      <SkeletonPlaceholderComponentMemo isLoading={true} />
    ) : entity === undefined ? null : (
      <GridCardComponentMemo
        onLike={onLikeCb}
        onDislike={onDislikeCb}
        onBuy={onBuyCb}
        {...entity}
      />
    );
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} px={6} key={`${idx}`} style={style}>
      {content}
    </Flex>
  );
};

const ItemContainerMemo = memo(ItemContainer, areEqual);

export { ItemContainerMemo };
