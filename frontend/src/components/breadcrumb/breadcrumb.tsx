import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import { COLORS_MAP_DARK, COLORS_MAP_LIGHT } from '../../chakra-setup';

type TBreadcrumbProps = {
  list: Array<{ title: string; pathname: string }>;
};

const BreadcrumbComponent: FC<TBreadcrumbProps> = ({ list }) => {
  const [secondaryAlt] = [
    useColorModeValue(COLORS_MAP_LIGHT.secondaryAlt, COLORS_MAP_DARK.secondaryAlt),
  ];

  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color={secondaryAlt} />}>
      {list.map(({ title, pathname }) => (
        <BreadcrumbItem key={`${title}_${pathname}`}>
          <BreadcrumbLink href={'#'}>
            <Text variant={{ base: 'base', sm: 'sm' }} color={secondaryAlt}>
              {`${title.charAt(0).toUpperCase()}${title.slice(1)}`}
            </Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export const BreadcrumbComponentMemo = memo(BreadcrumbComponent);
