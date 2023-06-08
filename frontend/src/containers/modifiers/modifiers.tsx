import { Flex } from '@chakra-ui/react';
import type { FC } from 'react';
import { useCallback } from 'react';
import { ModifierComponent } from '../../components/modifier';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { goodsSelectedModifierSelector, setSelectedModifierIdx } from '../../store';

type TModifiersProps = {
  list?: Array<{
    title: string;
  }>;
};

export const ModifiersContainer: FC<TModifiersProps> = ({ list }) => {
  const selectedModifier = useAppSelector(goodsSelectedModifierSelector);
  const d = useAppDispatch();

  const onClickCb = useCallback(
    ({ modifierIdx }: { modifierIdx: number }) => {
      void d(
        setSelectedModifierIdx({
          modifierIdx,
        }),
      );
    },
    [d],
  );

  if (list === undefined) return null;
  if (list.length <= 0) return null;

  return (
    <Flex w={'100%'} alignItems={'center'} justifyContent={'flex-start'} flexWrap={'wrap'} gap={3}>
      {list.map(({ title }, modifierIdx) => (
        <ModifierComponent
          key={`${title}`}
          title={`${title.charAt(0).toUpperCase()}${title.slice(1)}`}
          isSelected={
            (selectedModifier === undefined && title === 'all') || selectedModifier?.title === title
          }
          onClick={() => {
            // (modifierIdx - 1) because 0 is reserved for custom "all", which means others being shifted by 1
            onClickCb({ modifierIdx: title === 'all' ? -1 : modifierIdx - 1 });
          }}
        />
      ))}
    </Flex>
  );
};
