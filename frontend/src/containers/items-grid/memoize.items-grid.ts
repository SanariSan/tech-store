import memoizeOne from 'memoize-one';
import type { TItemData } from './grid/grid.type';

type TItemDataMemo = (
  entitiesList: TItemData['entitiesList'],
  columnCount: TItemData['columnCount'],
  onLikeCb: TItemData['onLikeCb'],
  onDislikeCb: TItemData['onDislikeCb'],
  onBuyCb: TItemData['onBuyCb'],
  isThemeChanging: TItemData['isThemeChanging'],
  hasMoreEntities: TItemData['hasMoreEntities'],
) => {
  entitiesList: TItemData['entitiesList'];
  columnCount: TItemData['columnCount'];
  onLikeCb: TItemData['onLikeCb'];
  onDislikeCb: TItemData['onDislikeCb'];
  onBuyCb: TItemData['onBuyCb'];
  isThemeChanging: TItemData['isThemeChanging'];
  hasMoreEntities: TItemData['hasMoreEntities'];
};

const createItemData = memoizeOne<TItemDataMemo>(
  (
    entitiesList,
    columnCount,
    onLikeCb,
    onDislikeCb,
    onBuyCb,
    isThemeChanging,
    hasMoreEntities,
  ) => ({
    entitiesList,
    columnCount,
    onLikeCb,
    onDislikeCb,
    onBuyCb,
    isThemeChanging,
    hasMoreEntities,
  }),
);

export type { TItemDataMemo };
export { createItemData };
