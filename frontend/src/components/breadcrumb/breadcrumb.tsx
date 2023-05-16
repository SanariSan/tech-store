import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';

type TBreadcrumbProps = {
  list: Array<{ title: string; pathname: string }>;
};

const BreadcrumbComponent: FC<TBreadcrumbProps> = ({ list }) => (
  <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
    {list.map(({ title, pathname }) => (
      <BreadcrumbItem key={`${title}_${pathname}`}>
        <BreadcrumbLink href={'#'}>
          <Text variant={{ base: 'base', sm: 'sm' }} color={'blue.600'}>
            {`${title.charAt(0).toUpperCase()}${title.slice(1)}`}
          </Text>
        </BreadcrumbLink>
      </BreadcrumbItem>
    ))}
  </Breadcrumb>
);

export const BreadcrumbComponentMemo = memo(BreadcrumbComponent);
