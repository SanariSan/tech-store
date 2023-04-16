import { Flex, Spacer } from '@chakra-ui/react';
import type { FC } from 'react';
import { Fragment, memo, useCallback, useEffect, useRef, useState } from 'react';
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
  const [selectedIdxs, setSelectedIdxs] = useState({
    parent: 0,
    sub: -1,
  });
  const [unfoldedIdxs, setUnfoldedIdxs] = useState(new Set<number>());
  const isActive = useRef(true);

  useEffect(
    () => () => {
      isActive.current = false;
    },
    [],
  );

  const updateSelectedIdxs = useCallback(
    ({ parent, sub = -1 }: { parent: number; sub?: number }) => {
      setSelectedIdxs({ parent, sub });
    },
    [],
  );

  const unfold = useCallback((idx: number) => {
    setUnfoldedIdxs((s) => s.add(idx));
  }, []);

  const collapse = useCallback((idx: number) => {
    setUnfoldedIdxs((s) => {
      s.delete(idx);
      return s;
    });
  }, []);

  const onSubUnfold = useCallback(
    (idx: number) => {
      if (unfoldedIdxs.has(idx)) collapse(idx);
      else unfold(idx);
    },
    [collapse, unfold, unfoldedIdxs],
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
      {SIDEBAR_TEMPLATE.map(({ icon, title, sub }, idxParent) => (
        <Fragment key={`side-p-${idxParent}`}>
          {idxParent === SIDEBAR_TEMPLATE.length - 2 && <Spacer />}

          <SidebarParentEntityMemo
            title={title}
            icon={icon}
            hasSub={sub !== null}
            isSidebarOpened={isSidebarOpened}
            isSelected={selectedIdxs.parent === idxParent}
            isSubUnfolded={unfoldedIdxs.has(idxParent)}
            onSelect={() => {
              updateSelectedIdxs({ parent: idxParent });
            }}
            onSubUnfold={() => {
              onSubUnfold(idxParent);
            }}
          />

          {sub !== null && (
            <Flex
              direction={'column'}
              width={'100%'}
              pl={10}
              overflow={'hidden'}
              maxH={isSidebarOpened && unfoldedIdxs.has(idxParent) ? `${sub.length * 50}px` : '0px'}
            >
              {sub.map(({ title: titleSub }, idxSub) => (
                <SidebarSubEntityMemo
                  key={`side-p-${idxParent}-c-${idxSub}`}
                  title={titleSub}
                  isSidebarOpened={isSidebarOpened}
                  isSelected={selectedIdxs.parent === idxParent && selectedIdxs.sub === idxSub}
                  onSelect={() => {
                    updateSelectedIdxs({ parent: idxParent, sub: idxSub });
                  }}
                />
              ))}
            </Flex>
          )}
        </Fragment>
      ))}
    </Flex>
  );
};

const SidebarContainerMemo = memo(SidebarContainer);

export { SidebarContainerMemo };
