import type { FC } from 'react';
import { memo, useMemo } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/redux';
import { uiSelectedSectionSelector } from '../../store';
import { SectionWrapContainerMemo } from '../section-wrap';

type TSettingsContainer = {
  [key: string]: unknown;
};

const SettingsContainer: FC<TSettingsContainer> = () => {
  const selectedSection = useAppSelector(uiSelectedSectionSelector);
  const breadcrumbList = useMemo(() => [selectedSection], [selectedSection]);

  return (
    <SectionWrapContainerMemo title={'Tweak them as you like!'} breadcrumbList={breadcrumbList}>
      <Flex direction={'column'} px={{ base: 6, sm: 8, md: 10 }} pt={8}>
        <Text variant={{ base: 'sm', sm: 'md' }} whiteSpace={'normal'}>
          Under construction
        </Text>
      </Flex>
    </SectionWrapContainerMemo>
  );
};

const SettingsContainerMemo = memo(SettingsContainer);

export { SettingsContainerMemo };
