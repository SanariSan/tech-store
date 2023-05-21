import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchMoreEntitiesAsync,
  goodsEntitiesSelector,
  goodsLoadingStatusSelector,
  goodsSelectedCategoryRouteSelector,
  goodsSelectedCategorySelector,
  goodsSelectedSectionSelector,
} from '../../store';
import { ItemsGridComponentMemo } from './items-grid';
import { useElementScrollPosition } from '../../hooks/use-scroll-position';

const CatalogueContainer = () => {
  const d = useAppDispatch();
  const entities = useAppSelector(goodsEntitiesSelector);
  const selectedSection = useAppSelector(goodsSelectedSectionSelector);
  const selectedCategory = useAppSelector(goodsSelectedCategorySelector);
  const selectedCategoryRoute = useAppSelector(goodsSelectedCategoryRouteSelector);

  const entitiesLoadingStatus = useAppSelector(goodsLoadingStatusSelector);
  const areEntitiesLoading = entitiesLoadingStatus === 'loading';
  const gridRef = useRef<HTMLDivElement | null>(null);

  const mountRenderCompleted = useRef(false);

  // sub to scroll position hook
  const { isElementEnd } = useElementScrollPosition({
    elementRef: gridRef,
    endOffset: 1600,
  });

  // fetch items on category change
  // TODO: maybe move to saga (category change -> fetch entities)
  useEffect(() => {
    // prevent from fetching on mount
    if (mountRenderCompleted.current) void d(fetchMoreEntitiesAsync());
  }, [selectedCategory, d]);

  /**
   * Fetch more items if reaching container end
   * areEntitiesLoading here to trigger effect in case view
   * is still at the end after loading finished so it'd trigger fetch again
   * Checking if loading is ongoing not needed, saga will handle auto-cancel
   */
  useEffect(() => {
    if (isElementEnd) void d(fetchMoreEntitiesAsync());
  }, [isElementEnd, areEntitiesLoading, d]);

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

  return (
    <ItemsGridComponentMemo
      title={'Best Selling Electronics Products - Weekly Update.'}
      breadcrumbList={breadcrumbList}
      modifiersList={modifiersList}
      entitiesList={entities}
      areEntitiesLoading={areEntitiesLoading}
      gridRef={gridRef}
    />
  );
};

export const CatalogueContainerMemo = memo(CatalogueContainer);
