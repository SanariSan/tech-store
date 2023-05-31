import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import type { VariableSizeGrid as Grid } from 'react-window';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchMoreEntitiesAsync,
  getCategoriesAsync,
  goodsCategoriesSelector,
  goodsEntitiesSelector,
  goodsLoadingStatusSelector,
  goodsSelectedCategoryRouteSelector,
  goodsSelectedCategorySelector,
  goodsSelectedModifierSelector,
  goodsSelectedSectionSelector,
} from '../../store';
import { ItemsGridComponentMemo } from './items-grid';

const CatalogueContainer = () => {
  const d = useAppDispatch();
  const entities = useAppSelector(goodsEntitiesSelector);
  const loadingStatus = useAppSelector(goodsLoadingStatusSelector);
  const categories = useAppSelector(goodsCategoriesSelector);
  const selectedSection = useAppSelector(goodsSelectedSectionSelector);
  const selectedCategory = useAppSelector(goodsSelectedCategorySelector);
  const selectedModifier = useAppSelector(goodsSelectedModifierSelector);
  const selectedCategoryRoute = useAppSelector(goodsSelectedCategoryRouteSelector);
  const loadingStatusRef = useRef(loadingStatus);
  const gridRef = useRef<Grid | null>(null);

  const mountRenderCompleted = useRef(false);

  const fetchMoreEntities = useCallback(() => d(fetchMoreEntitiesAsync()), [d]);

  // scroll to the top on selectedCategory change
  useLayoutEffect(() => {
    if (gridRef.current !== null) {
      gridRef.current.scrollTo({ scrollTop: 0 });
    }
  }, [gridRef, selectedCategory, selectedModifier]);

  // fetch global categories
  useEffect(() => {
    if (categories === undefined || categories.length <= 0) {
      void d(getCategoriesAsync());
    }
  }, [categories, d]);

  // fetch items on category/modifier change
  // TODO: maybe move to saga (category change -> fetch entities)
  useEffect(() => {
    // prevent from fetching on mount
    if (mountRenderCompleted.current) fetchMoreEntities();
  }, [selectedCategory, selectedModifier, fetchMoreEntities]);

  useEffect(() => {
    if (!mountRenderCompleted.current) mountRenderCompleted.current = true;

    return () => {
      mountRenderCompleted.current = false;
    };
  }, []);

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
    // prevent infinite fetch-cancel on constant calls (bcs of saga's take latest)
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
