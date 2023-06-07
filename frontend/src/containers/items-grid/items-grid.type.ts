import type { MutableRefObject } from 'react';
import type { VariableSizeGrid as Grid } from 'react-window';
import type { TEntities } from '../../store';

type TItemsGridContainerProps = {
  entitiesList: TEntities;
  hasMoreEntities: boolean;
  onEntitiesEndReachCb?: () => void;
  gridRef: MutableRefObject<Grid | null>;
};

export type { TItemsGridContainerProps };
