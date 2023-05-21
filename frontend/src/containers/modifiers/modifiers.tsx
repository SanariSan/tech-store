import type { FC } from 'react';
import { useCallback } from 'react';
import { Flex } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { goodsSelectedModifierSelector, setSelectedModifier } from '../../store';
import { ModifierComponent } from '../../components/modifier';

type TModifiersProps = {
  list: Array<{
    title: string;
  }>;
};

export const ModifiersContainer: FC<TModifiersProps> = ({ list }) => {
  const selectedModifier = useAppSelector(goodsSelectedModifierSelector);
  const d = useAppDispatch();

  const cb = useCallback(
    (modifier?: string) => {
      void d(
        setSelectedModifier({
          modifier,
        }),
      );
    },
    [d],
  );

  return (
    <Flex w={'100%'} alignItems={'center'} justifyContent={'flex-start'} flexWrap={'wrap'} gap={3}>
      {list.map(({ title }) => (
        <ModifierComponent
          key={`${title}`}
          title={`${title.charAt(0).toUpperCase()}${title.slice(1)}`}
          isSelected={
            (selectedModifier === undefined && title === 'all') || selectedModifier?.title === title
          }
          onClick={() => {
            cb(title === 'all' ? undefined : title);
          }}
        />
      ))}
    </Flex>
  );
};
