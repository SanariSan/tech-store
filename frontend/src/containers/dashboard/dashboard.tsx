import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { COLORS } from '../../chakra-setup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logoutUserAsync, uiColorModeChangeStatusSelector, userInfoSelector } from '../../store';
import { SectionWrapContainerMemo } from '../section-wrap';

type TDashboardContainer = {
  [key: string]: unknown;
};

const DashboardContainer: FC<TDashboardContainer> = () => {
  const d = useAppDispatch();
  const { username, email } = useAppSelector(userInfoSelector);
  const [border] = [useColorModeValue(COLORS.white[300], COLORS.darkBlue[200])];
  const colorModeChangeStatus = useAppSelector(uiColorModeChangeStatusSelector);

  const logoutCb = useCallback(() => {
    void d(logoutUserAsync());
  }, [d]);

  return (
    <SectionWrapContainerMemo title={'Dashboard - Your very own place!'}>
      <Flex
        w={'100%'}
        h={'100%'}
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={3}
        px={8}
        py={8}
      >
        <Text
          fontWeight={'bold'}
          variant={'lg'}
          whiteSpace={colorModeChangeStatus === 'ongoing' ? 'nowrap' : 'normal'}
          textAlign={'center'}
        >
          Magnificent personal dashboard 🤔
        </Text>

        {(username !== undefined || email !== undefined) && (
          <Flex
            w={'max-content'}
            h={'max-content'}
            direction={'column'}
            gap={6}
            borderColor={border}
            borderWidth={'1px'}
            borderStyle={'dashed'}
            borderRadius={'25px'}
            alignItems={'center'}
            p={6}
          >
            {username !== undefined && (
              <Flex w={'max-content'} direction={'column'} gap={1} alignItems={'center'}>
                <Text as={'kbd'} w={'max-content'} variant={'md'} whiteSpace={'normal'}>
                  Username:
                </Text>
                <Text as={'kbd'} w={'max-content'} variant={'md'} whiteSpace={'normal'}>
                  {username}
                </Text>
              </Flex>
            )}
            {email !== undefined && (
              <Flex w={'max-content'} direction={'column'} gap={1} alignItems={'center'}>
                <Text as={'kbd'} w={'max-content'} variant={'md'} whiteSpace={'normal'}>
                  Email:
                </Text>
                <Text as={'kbd'} w={'max-content'} variant={'md'} whiteSpace={'normal'}>
                  {email}
                </Text>
              </Flex>
            )}
          </Flex>
        )}

        <Text
          fontWeight={'bold'}
          variant={'lg'}
          whiteSpace={colorModeChangeStatus === 'ongoing' ? 'nowrap' : 'normal'}
          textAlign={'center'}
        >
          Don't waste time here, traveler 🤨
        </Text>
        <Button onClick={logoutCb}>Logout</Button>
      </Flex>
    </SectionWrapContainerMemo>
  );
};

const DashboardContainerMemo = memo(DashboardContainer);

export { DashboardContainerMemo };
