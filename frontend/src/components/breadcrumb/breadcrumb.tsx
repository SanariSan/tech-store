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
import { COLORS } from '../../chakra-setup';

type TBreadcrumbProps = {
  list: Array<{ title: string; pathname: string } | undefined>;
};

const BreadcrumbComponent: FC<TBreadcrumbProps> = ({ list }) => {
  const [secondaryAlt] = [useColorModeValue(COLORS.blue[600], COLORS.blue[500])];

  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color={secondaryAlt} />}>
      {list.map((el) => {
        if (el === undefined) return null;
        const { title, pathname } = el;
        return (
          <BreadcrumbItem key={`${title}_${pathname}`}>
            <BreadcrumbLink href={'#'}>
              <Text variant={{ base: 'base', sm: 'sm' }} color={secondaryAlt}>
                {`${title.charAt(0).toUpperCase()}${title.slice(1)}`}
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export const BreadcrumbComponentMemo = memo(BreadcrumbComponent);
