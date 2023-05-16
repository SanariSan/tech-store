import { memo, useMemo, useRef } from 'react';
import { Text } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/redux';
import { goodsLikedEntitiesSelector, goodsSelectedSectionSelector } from '../../store';
import { ItemsGridComponentMemo } from './items-grid';

const LikedContainer = () => {
  const entities = useAppSelector(goodsLikedEntitiesSelector);
  const selectedSection = useAppSelector(goodsSelectedSectionSelector);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const breadcrumbList = useMemo(() => [selectedSection], [selectedSection]);
  const modifiersList = useMemo(() => [], []);

  return (
    <>
      <ItemsGridComponentMemo
        title={'Your favourite items all in one place!'}
        breadcrumbList={breadcrumbList}
        modifiersList={modifiersList}
        entitiesList={entities}
        gridRef={gridRef}
      />
      {entities.length <= 0 && (
        <Text
          position={'absolute'}
          top={{ base: '250px', sm: '175px' }}
          left={{ base: '25px', sm: '35px', md: '40px' }}
          variant={{ base: 'sm', sm: 'md' }}
        >
          Nothing here yet 😥
        </Text>
      )}
    </>
  );
};

export const LikedContainerMemo = memo(LikedContainer);
