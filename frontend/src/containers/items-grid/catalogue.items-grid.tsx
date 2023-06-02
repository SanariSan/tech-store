import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import type { VariableSizeGrid as Grid } from 'react-window';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchMoreEntitiesAsync,
  goodsEntitiesSelector,
  goodsEntitiesLoadingStatusSelector,
  goodsSelectedCategorySelector,
  goodsSelectedModifierSelector,
  uiSelectedCategoryRouteBreadcrumbFormattedSelector,
  uiSelectedSectionSelector,
} from '../../store';
import { ItemsGridComponentMemo } from './items-grid';

const CatalogueContainer = () => {
  const d = useAppDispatch();
  const entities = useAppSelector(goodsEntitiesSelector);
  const loadingStatus = useAppSelector(goodsEntitiesLoadingStatusSelector);

  const selectedSection = useAppSelector(uiSelectedSectionSelector);
  const selectedCategory = useAppSelector(goodsSelectedCategorySelector);
  const selectedModifier = useAppSelector(goodsSelectedModifierSelector);
  const selectedCategoryRoute = useAppSelector(uiSelectedCategoryRouteBreadcrumbFormattedSelector);
  const loadingStatusRef = useRef(loadingStatus);
  const gridRef = useRef<Grid | null>(null);

  const fetchMoreEntities = useCallback(() => d(fetchMoreEntitiesAsync()), [d]);

  // scroll to the top on selectedCategory change
  useLayoutEffect(() => {
    if (gridRef.current !== null) {
      gridRef.current.scrollTo({ scrollTop: 0 });
    }
  }, [gridRef, selectedCategory, selectedModifier]);

  const breadcrumbList = useMemo(
    () => [selectedSection, ...selectedCategoryRoute],
    [selectedSection, selectedCategoryRoute],
  );

  const modifiersList = useMemo(
    () =>
      selectedCategory !== undefined && selectedCategory.modifiers !== undefined
        ? [{ title: 'all' }, ...selectedCategory.modifiers]
        : [],
    [selectedCategory],
  );

  useEffect(() => {
    loadingStatusRef.current = loadingStatus;
  }, [loadingStatus]);

  const onEntitiesEndReachCb = useCallback(() => {
    // prevent "infinite" fetch-cancel on burst calls bcs of saga's take latest (e.g. scroll up-down nonstop)
    if (loadingStatusRef.current !== 'loading') fetchMoreEntities();
  }, [fetchMoreEntities]);

  return (
    <ItemsGridComponentMemo
      title={'Best Selling Electronics Products - Weekly Update.'}
      breadcrumbList={breadcrumbList}
      modifiersList={modifiersList}
      entitiesList={entities}
      onEntitiesEndReachCb={onEntitiesEndReachCb}
      gridRef={gridRef}
      variant="infinite"
    />
  );
};

export const CatalogueContainerMemo = memo(CatalogueContainer);
