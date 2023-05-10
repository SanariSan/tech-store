import { Flex, Spacer } from '@chakra-ui/react';
import type { FC } from 'react';
import { useEffect, Fragment, memo, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarParentEntityMemo, SidebarSubEntityMemo } from '../../components/sidebar';
import { SIDEBAR_TEMPLATE } from './sidebar.const';
import { useAppDispatch } from '../../hooks/redux';
import { setSelectedSection as setSelectedSectionStore } from '../../store';

interface ISidebarContainer {
  isSidebarOpened: boolean;
}

const SidebarContainer: FC<ISidebarContainer> = ({
  isSidebarOpened,
}: {
  isSidebarOpened: boolean;
}) => {
  // ensuring right initial menu entry is chosen based on current pathname
  const { pathname } = useLocation();
  const [selectedSection, setSelectedSection] = useState(() =>
    SIDEBAR_TEMPLATE.findIndex((_) => _.pathname === pathname),
  );
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [unfoldedIdxs, setUnfoldedIdxs] = useState<number[]>([]);

  const updateSelectedIdxs = useCallback(
    ({ section, category = -1 }: { section: number; category?: number }) => {
      setSelectedSection(section);
      setSelectedCategory(category);
    },
    [],
  );

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

  // TODO: move this to...? probably separate component with logic for tracking location?
  const d = useAppDispatch();
  useEffect(() => {
    const currSection = SIDEBAR_TEMPLATE[selectedSection].title;
    void d(setSelectedSectionStore({ section: currSection }));
  }, [pathname, d, selectedSection]);

  return (
    <Flex
      direction={'column'}
      alignItems={'flex-start'}
      gap={0}
      w={'100%'}
      h={'100%'}
      py={9}
      pb={6}
      pr={2}
    >
      {SIDEBAR_TEMPLATE.map(
        ({ icon, title, sub, sideAction: onSelectSideActionParent }, idxSection) => (
          <Fragment key={`side-p-${idxSection}`}>
            {idxSection === SIDEBAR_TEMPLATE.length - 2 && <Spacer />}

            <SidebarParentEntityMemo
              title={title}
              icon={icon}
              hasSub={sub !== null}
              isSidebarOpened={isSidebarOpened}
              isSelected={selectedSection === idxSection}
              isSubUnfolded={unfoldedIdxs.includes(idxSection)}
              onSelect={() => {
                onSelectSideActionParent();
                updateSelectedIdxs({ section: idxSection });
              }}
              onSubUnfold={() => {
                onSubUnfold(idxSection);
              }}
            />

            {sub !== null && (
              <Flex
                direction={'column'}
                width={'100%'}
                pl={10}
                overflow={'hidden'}
                maxH={
                  isSidebarOpened && unfoldedIdxs.includes(idxSection)
                    ? `${sub.length * 50}px`
                    : '0px'
                }
              >
                {sub.map(({ title: titleSub, sideAction: onSelectSideActionSub }, idxCategory) => (
                  <SidebarSubEntityMemo
                    key={`side-p-${idxSection}-c-${idxCategory}`}
                    title={titleSub}
                    isSidebarOpened={isSidebarOpened}
                    isSelected={selectedSection === idxSection && selectedCategory === idxCategory}
                    onSelect={() => {
                      if (selectedSection !== idxSection) onSelectSideActionParent();
                      if (selectedSection !== idxSection || selectedCategory !== idxCategory) {
                        onSelectSideActionSub();
                      }
                      updateSelectedIdxs({ section: idxSection, category: idxCategory });
                    }}
                  />
                ))}
              </Flex>
            )}
          </Fragment>
        ),
      )}
    </Flex>
  );
};

const SidebarContainerMemo = memo(SidebarContainer);

export { SidebarContainerMemo };
