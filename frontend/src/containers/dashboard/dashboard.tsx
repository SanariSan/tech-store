import { Button, Flex, Text } from '@chakra-ui/react';
import { useState, useRef, useEffect, useMemo, memo } from 'react';
import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logoutUserAsync, userInfoUsernameSelector } from '../../store';

type TDashboardContainer = {
  [key: string]: unknown;
};

const DashboardContainer: FC<TDashboardContainer> = () => {
  const d = useAppDispatch();
  const username = useAppSelector(userInfoUsernameSelector);

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={3}
    >
      <Text fontWeight={'bold'} variant={'lg'}>
        Very cool personal dashboard 🤔
      </Text>
      <Text fontWeight={'bold'} variant={'lg'}>
        Don't waste your time here
        {username !== undefined ? ', Mr. ' : ''}
        {username !== undefined ? (
          <Text as={'kbd'} variant={'md'}>
            {username}{' '}
          </Text>
        ) : (
          ''
        )}
        🤨
      </Text>
      <Button
        onClick={() => {
          void d(logoutUserAsync());
        }}
      >
        Logout
      </Button>
    </Flex>
  );
};

const DashboardContainerMemo = memo(DashboardContainer);

export { DashboardContainerMemo };
