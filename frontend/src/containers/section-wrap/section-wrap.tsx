import { Flex, Text } from '@chakra-ui/react';
import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import { BreadcrumbComponentMemo } from '../../components/breadcrumb';
import { ModifiersContainer } from '../modifiers';

type TSectionWrapContainer = {
  title: string;
  breadcrumbList?: Parameters<typeof BreadcrumbComponentMemo>['0']['list'];
  modifiersList?: Parameters<typeof ModifiersContainer>['0']['list'];
  children?: ReactNode;
};

const SectionWrapContainer: FC<TSectionWrapContainer> = ({
  title,
  breadcrumbList,
  modifiersList,
  children,
}) => (
  <Flex direction={'column'} w={'100%'} h={'100%'}>
    <Flex
      w={'100%'}
      minW={{ base: '230px', sm: '375px' }}
      minH={'max-content'}
      py={8}
      px={{ base: 6, sm: 8, md: 10 }}
      gap={6}
      direction={'column'}
    >
      <Flex w={'100%'} minH={'max-content'} gap={3} direction={'column'}>
        <BreadcrumbComponentMemo list={breadcrumbList} />
        <Text variant={{ base: 'md', sm: 'lg' }} fontWeight={'bold'} whiteSpace={'normal'}>
          {title}
        </Text>
      </Flex>
      <ModifiersContainer list={modifiersList} />
    </Flex>
    {children}
  </Flex>
);

const SectionWrapContainerMemo = memo(SectionWrapContainer);

export { SectionWrapContainerMemo };
