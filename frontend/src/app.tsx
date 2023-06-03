import { Box, Button, Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HelpComponentMemo } from './components/help';
import { HomeContainerMemo } from './components/home';
import { CartContainerMemo } from './containers/cart';
import {
  AuthenticatedAccessContainer,
  ErrorBoundaryGenericContainerMemo,
  LocationTrackerContainerMemo,
  ScreenDetailsTrackerContainerMemo,
  changeRoute,
} from './containers/functional';
import { CatalogueContainerMemo, LikedContainerMemo } from './containers/items-grid';
import { LayoutContainer } from './containers/layout';
import { LoadingTrackerProgressContainer } from './containers/loading-tracker-progress';
import { LoginContainer } from './containers/login';
import { RegisterContainer } from './containers/register';
import { ThemeSwitchContainerMemo } from './containers/theme-switch';
import { ToastsContainerMemo } from './containers/toast/toast';
import { useAppDispatch } from './hooks/redux';
import { logoutUserAsync } from './store';
import { GuideContainerMemo } from './containers/guide';

const App: FC = () => {
  const d = useAppDispatch();

  const screenshotTargetRef = useRef(null);

  return (
    <ErrorBoundaryGenericContainerMemo>
      <ThemeSwitchContainerMemo screenshotTargetRef={screenshotTargetRef} />
      <LoadingTrackerProgressContainer />
      <LocationTrackerContainerMemo />
      <ScreenDetailsTrackerContainerMemo />
      <ToastsContainerMemo />
      <CartContainerMemo />
      <GuideContainerMemo />

      <Box
        ref={screenshotTargetRef}
        display={'flex'}
        w={'100%'}
        h={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <LayoutContainer>
          <Switch>
            <Route exact path={'/'}>
              <Flex w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
                <HomeContainerMemo />
              </Flex>
            </Route>
            <Route exact path={'/catalogue'}>
              <CatalogueContainerMemo />
            </Route>
            <Route exact path={'/liked'}>
              <Flex w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
                <LikedContainerMemo />
              </Flex>
            </Route>
            <Route exact path={'/settings'}>
              <Flex w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
                settings
              </Flex>
            </Route>
            <Route exact path={'/help'}>
              <HelpComponentMemo />
            </Route>
            <Route exact path="/login">
              <AuthenticatedAccessContainer mustBeAuthenticated={false} redirectLocation={'/lk'}>
                <LoginContainer />
              </AuthenticatedAccessContainer>
            </Route>
            <Route exact path="/register">
              <AuthenticatedAccessContainer mustBeAuthenticated={false} redirectLocation={'/lk'}>
                <RegisterContainer />
              </AuthenticatedAccessContainer>
            </Route>
            <Route exact path="/lk">
              <AuthenticatedAccessContainer mustBeAuthenticated={true} redirectLocation={'/login'}>
                <Flex
                  w={'100%'}
                  h={'100%'}
                  direction={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={3}
                >
                  <Text fontWeight={'bold'} variant={'md'}>
                    Very cool lk
                  </Text>
                  <Button
                    onClick={() => {
                      void d(logoutUserAsync());
                    }}
                  >
                    Logout
                  </Button>
                </Flex>
              </AuthenticatedAccessContainer>
            </Route>
            {/* <Route exact path="/dashboard">
            <AuthenticatedAccessContainer mustBeAuthenticated={true} redirectLocation={'/login'}>
              <DashboardContainer />
              </AuthenticatedAccessContainer>
              </Route> 
            */}
            <Route path="/">
              <Flex
                w={'100%'}
                h={'100%'}
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={3}
              >
                <Text variant={'lg'}>Not found</Text>
                <Button
                  onClick={() => {
                    changeRoute('/');
                  }}
                >
                  Go home
                </Button>
              </Flex>
            </Route>
          </Switch>
        </LayoutContainer>
        {/* <DebugContainer /> */}
      </Box>
    </ErrorBoundaryGenericContainerMemo>
  );
};
export { App };
