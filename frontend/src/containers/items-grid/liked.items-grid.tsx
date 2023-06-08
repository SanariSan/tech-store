import { Flex, Text } from '@chakra-ui/react';
import { memo, useMemo, useRef } from 'react';
import type { VariableSizeGrid as Grid } from 'react-window';
import { useAppSelector } from '../../hooks/redux';
import { goodsLikedEntitiesSelector, uiSelectedSectionSelector } from '../../store';
import { SectionWrapContainerMemo } from '../section-wrap';
import { ItemsGridComponentMemo } from './items-grid';

const LikedContainer = () => {
  const entities = useAppSelector(goodsLikedEntitiesSelector);

  const selectedSection = useAppSelector(uiSelectedSectionSelector);
  const gridRef = useRef<Grid | null>(null);

  const breadcrumbList = useMemo(() => [selectedSection], [selectedSection]);

  return (
    <SectionWrapContainerMemo
      title={'Your favourite items all in one place!'}
      breadcrumbList={breadcrumbList}
    >
      {entities.length > 0 ? (
        <ItemsGridComponentMemo gridRef={gridRef} entitiesList={entities} hasMoreEntities={false} />
      ) : (
        <Flex direction={'column'} px={{ base: 6, sm: 8, md: 10 }} gap={3} pt={8}>
          <Text variant={{ base: 'sm', sm: 'md' }} whiteSpace={'normal'}>
            Nothing here yet... 😥
          </Text>
          <Text variant={{ base: 'sm', sm: 'md' }} whiteSpace={'normal'}>
            Go like something! 🤨
          </Text>
        </Flex>
      )}
    </SectionWrapContainerMemo>
  );
};

export const LikedContainerMemo = memo(LikedContainer);
