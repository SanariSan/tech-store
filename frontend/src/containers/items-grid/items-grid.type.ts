import type { MutableRefObject } from 'react';
import type { VariableSizeGrid as Grid } from 'react-window';
import type { TEntities } from '../../store';
import type { BreadcrumbComponentMemo } from '../../components/breadcrumb';
import type { ModifiersContainer } from '../modifiers';

type TItemsGridContainerProps = {
  title: string;
  breadcrumbList: Parameters<typeof BreadcrumbComponentMemo>['0']['list'];
  modifiersList: Parameters<typeof ModifiersContainer>['0']['list'];
  entitiesList: TEntities;
  onEntitiesEndReachCb?: () => void;
  gridRef: MutableRefObject<Grid | null>;
  variant: 'infinite' | 'static';
};

export type { TItemsGridContainerProps };
