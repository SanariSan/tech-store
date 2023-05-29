import type { MutableRefObject } from 'react';
import type { TEntities } from '../../../store';

export type TItemData = {
  entitiesList: MutableRefObject<TEntities>;
  columnCount: number;
  onLikeCb: ({ id }: { id: string }) => void;
  onDislikeCb: ({ id }: { id: string }) => void;
  onBuyCb: ({ id }: { id: string }) => void;
  isThemeChanging: boolean;
  variant: 'infinite' | 'static';
};
