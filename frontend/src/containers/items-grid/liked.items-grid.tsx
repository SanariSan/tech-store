import { Text } from '@chakra-ui/react';
import { memo, useMemo, useRef } from 'react';
import type { VariableSizeGrid as Grid } from 'react-window';
import { useAppSelector } from '../../hooks/redux';
import { goodsLikedEntitiesSelector, uiSelectedSectionSelector } from '../../store';
import { ItemsGridComponentMemo } from './items-grid';

const LikedContainer = () => {
  const entities = useAppSelector(goodsLikedEntitiesSelector);
  const selectedSection = useAppSelector(uiSelectedSectionSelector);
  const gridRef = useRef<Grid | null>(null);

  const breadcrumbList = useMemo(() => [selectedSection], [selectedSection]);
  const modifiersList = useMemo(() => [], []);

  return (
    <>
      <ItemsGridComponentMemo
        gridRef={gridRef}
        title={'Your favourite items all in one place!'}
        breadcrumbList={breadcrumbList}
        modifiersList={modifiersList}
        entitiesList={entities}
        variant="static"
      />
      {entities.length <= 0 && (
        <Text
          position={'absolute'}
          top={{ base: '250px', sm: '175px' }}
          left={{ base: '100px', sm: '125px', md: '140px' }}
          variant={{ base: 'sm', sm: 'md' }}
        >
          Nothing here yet 😥
        </Text>
      )}
    </>
  );
};

export const LikedContainerMemo = memo(LikedContainer);
