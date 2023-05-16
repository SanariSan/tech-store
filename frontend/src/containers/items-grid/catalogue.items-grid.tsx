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

  const mountFetched = useRef(false);

  // sub to scroll position hook
  const { isElementEnd } = useElementScrollPosition({
    elementRef: gridRef,
    endOffset: 800,
  });

  // fetch items on mount
  useEffect(() => {
    if (!mountFetched.current && entities.length <= 0) {
      void d(fetchMoreEntitiesAsync());
      mountFetched.current = true;
    }
  }, [entities, d]);

  // fetch more items if reaching container end
  useEffect(() => {
    if (isElementEnd && !areEntitiesLoading) {
      void d(fetchMoreEntitiesAsync());
    }
  }, [isElementEnd, areEntitiesLoading, d]);

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
