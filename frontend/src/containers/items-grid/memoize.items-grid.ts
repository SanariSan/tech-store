import memoizeOne from 'memoize-one';
import type { TItemData } from './grid/grid.type';

type TItemDataMemo = (
  entitiesList: TItemData['entitiesList'],
  columnCount: TItemData['columnCount'],
  onLikeCb: TItemData['onLikeCb'],
  onDislikeCb: TItemData['onDislikeCb'],
  onBuyCb: TItemData['onBuyCb'],
  isThemeChanging: TItemData['isThemeChanging'],
  variant: TItemData['variant'],
) => {
  entitiesList: TItemData['entitiesList'];
  columnCount: TItemData['columnCount'];
  onLikeCb: TItemData['onLikeCb'];
  onDislikeCb: TItemData['onDislikeCb'];
  onBuyCb: TItemData['onBuyCb'];
  isThemeChanging: TItemData['isThemeChanging'];
  variant: TItemData['variant'];
};

const createItemData = memoizeOne<TItemDataMemo>(
  (entitiesList, columnCount, onLikeCb, onDislikeCb, onBuyCb, isThemeChanging, variant) => ({
    entitiesList,
    columnCount,
    onLikeCb,
    onDislikeCb,
    onBuyCb,
    isThemeChanging,
    variant,
  }),
);

export type { TItemDataMemo };
export { createItemData };
