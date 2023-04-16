import { Flex, Spacer } from '@chakra-ui/react';
import type { FC } from 'react';
import { Fragment, memo, useMemo, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarParentEntityMemo, SidebarSubEntityMemo } from '../../components/sidebar';
import { SIDEBAR_TEMPLATE } from './sidebar.const';

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
  const [selectedParent, setSelectedParent] = useState(() =>
    SIDEBAR_TEMPLATE.findIndex((_) => _.pathname === pathname),
  );
  const [selectedSub, setSelectedSub] = useState(-1);
  const [unfoldedIdxs, setUnfoldedIdxs] = useState<number[]>([]);

  const updateSelectedIdxs = useCallback(
    ({ parent, sub = -1 }: { parent: number; sub?: number }) => {
      setSelectedParent(parent);
      setSelectedSub(sub);
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

  // more of a showcase optimization, almost no impact on perf (still less rerenders)
  // and could be further optimized to prevent sublist from rerendering, but TOO messy
  const memoizedCbs = useMemo(
    () =>
      SIDEBAR_TEMPLATE.map(({ sideAction: onSelectSideActionParent }, idxParent) => ({
        onSelect: () => {
          onSelectSideActionParent();
          updateSelectedIdxs({ parent: idxParent });
        },
        onSubUnfold: () => {
          onSubUnfold(idxParent);
        },
      })),
    [onSubUnfold, updateSelectedIdxs],
  );

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
        ({ icon, title, sub, sideAction: onSelectSideActionParent }, idxParent) => (
          <Fragment key={`side-p-${idxParent}`}>
            {idxParent === SIDEBAR_TEMPLATE.length - 2 && <Spacer />}

            <SidebarParentEntityMemo
              title={title}
              icon={icon}
              hasSub={sub !== null}
              isSidebarOpened={isSidebarOpened}
              isSelected={selectedParent === idxParent}
              isSubUnfolded={unfoldedIdxs.includes(idxParent)}
              // memoized
              onSelect={memoizedCbs[idxParent].onSelect}
              onSubUnfold={memoizedCbs[idxParent].onSubUnfold}
            />

            {sub !== null && (
              <Flex
                direction={'column'}
                width={'100%'}
                pl={10}
                overflow={'hidden'}
                maxH={
                  isSidebarOpened && unfoldedIdxs.includes(idxParent)
                    ? `${sub.length * 50}px`
                    : '0px'
                }
              >
                {sub.map(({ title: titleSub, sideAction: onSelectSideActionSub }, idxSub) => (
                  <SidebarSubEntityMemo
                    key={`side-p-${idxParent}-c-${idxSub}`}
                    title={titleSub}
                    isSidebarOpened={isSidebarOpened}
                    isSelected={selectedParent === idxParent && selectedSub === idxSub}
                    // could be memoized but naaah
                    onSelect={() => {
                      if (selectedParent !== idxParent) onSelectSideActionParent();
                      if (selectedParent !== idxParent || selectedSub !== idxSub) {
                        onSelectSideActionSub();
                      }
                      updateSelectedIdxs({ parent: idxParent, sub: idxSub });
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
