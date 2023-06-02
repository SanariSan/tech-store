import { Flex, Spacer } from '@chakra-ui/react';
import type { FC } from 'react';
import { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { SidebarCategoryEntityMemo, SidebarSectionEntityMemo } from '../../components/sidebar';
import { SIDEBAR_TEMPLATE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchCategoriesAsync,
  goodsCategoriesSelector,
  goodsLoadingStatusSelector,
  goodsSelectedCategoryIdxSelector,
  setSelectedCategoryIdx,
  uiSelectedSectionIdxSelector,
  uiSidebarStateSelector,
} from '../../store';
import { changeRoute } from '../functional';

interface ISidebarContainer {
  [key: string]: unknown;
}

const SidebarContainer: FC<ISidebarContainer> = () => {
  const d = useAppDispatch();
  const categories = useAppSelector(goodsCategoriesSelector);
  const isSidebarOpened = useAppSelector(uiSidebarStateSelector);
  const selectedSectionIdx = useAppSelector(uiSelectedSectionIdxSelector);
  const selectedCategoryIdx = useAppSelector(goodsSelectedCategoryIdxSelector);
  const loadingStatus = useAppSelector(goodsLoadingStatusSelector);

  const [unfoldedIdxs, setUnfoldedIdxs] = useState<number[]>([]);

  const unfold = useCallback((idx: number) => {
    setUnfoldedIdxs((s) => [...s, idx]);
  }, []);

  const collapse = useCallback((idx: number) => {
    setUnfoldedIdxs((s) => s.filter((_) => _ !== idx));
  }, []);

  const onSubUnfold = useCallback(
    (idx: number) => {
      if (unfoldedIdxs.includes(idx)) collapse(idx);
      else unfold(idx);
    },
    [collapse, unfold, unfoldedIdxs],
  );

  // fetch global categories
  useEffect(() => {
    // constant retry in case of fail
    if (loadingStatus !== 'loading' && categories.length <= 0) {
      void d(fetchCategoriesAsync());
    }
  }, [loadingStatus, categories, d]);

  return (
    <Flex
      direction={'column'}
      alignItems={'flex-start'}
      gap={0}
      w={'100%'}
      h={'100%'}
      py={9}
      pb={6}
      pr={{ base: 1, sm: 2 }}
    >
      {SIDEBAR_TEMPLATE.map((section, idxSection) => {
        if (section === undefined) return;
        const { icon, title, subCategory, pathname } = section;
        const isUnfolded = unfoldedIdxs.includes(idxSection);
        const subH =
          isSidebarOpened && isUnfolded && subCategory === 'catalogue'
            ? `${categories.length * 50}px`
            : '0px';

        return (
          <Fragment key={`side-p-${idxSection}`}>
            {idxSection === SIDEBAR_TEMPLATE.length - 2 && <Spacer />}
            <SidebarSectionEntityMemo
              title={title}
              icon={icon}
              hasCategory={subCategory === 'catalogue'}
              isSidebarOpened={isSidebarOpened}
              isSelected={selectedSectionIdx === idxSection}
              isCategoryUnfolded={isUnfolded}
              onSelect={() => {
                changeRoute(pathname);

                // for now there is only 1 sub category possible - catalogue, so here's just explicit check
                // allows to not refetch on ANY category choice + prevent refetch on subsequent section clicks
                if (
                  subCategory === 'catalogue' &&
                  (selectedSectionIdx === -1 || selectedCategoryIdx !== -1)
                ) {
                  void d(setSelectedCategoryIdx({ categoryIdx: -1 }));
                }
              }}
              onSubUnfold={() => {
                onSubUnfold(idxSection);
              }}
            />

            {
              // for now there is only 1 sub category possible - catalogue, so here's just explicit check
              subCategory === 'catalogue' && categories.length > 0 && (
                <Flex
                  direction={'column'}
                  w={'100%'}
                  pl={{ base: 8, sm: 10 }}
                  overflow={'hidden'}
                  h={subH}
                  minH={subH}
                >
                  {categories.map((category, categoryIdx) => {
                    if (category === undefined) return;
                    const { title: titleCategory } = category;
                    return (
                      <SidebarCategoryEntityMemo
                        key={`side-p-${idxSection}-c-${categoryIdx}`}
                        title={titleCategory}
                        isSidebarOpened={isSidebarOpened}
                        isSelected={
                          selectedSectionIdx === idxSection && selectedCategoryIdx === categoryIdx
                        }
                        onSelect={() => {
                          if (selectedSectionIdx !== idxSection) changeRoute(pathname);
                          if (selectedCategoryIdx !== categoryIdx)
                            void d(setSelectedCategoryIdx({ categoryIdx }));
                        }}
                      />
                    );
                  })}
                </Flex>
              )
            }
          </Fragment>
        );
      })}
    </Flex>
  );
};

const SidebarContainerMemo = memo(SidebarContainer);

export { SidebarContainerMemo };
