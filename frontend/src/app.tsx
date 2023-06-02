import { Box, Button, Flex } from '@chakra-ui/react';
import type { FC } from 'react';
import { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  AuthenticatedAccessContainer,
  ErrorBoundaryGenericContainerMemo,
  LocationTrackerContainerMemo,
  ScreenDetailsTrackerContainerMemo,
} from './containers/functional';
import { HelpComponentMemo } from './components/help';
import { CartContainerMemo } from './containers/cart';
import { CatalogueContainerMemo, LikedContainerMemo } from './containers/items-grid';
import { LayoutContainer } from './containers/layout';
import { LoadingTrackerProgressContainer } from './containers/loading-tracker-progress';
import { LoginContainer } from './containers/login';
import { RegisterContainer } from './containers/register';
import { ThemeSwitchContainerMemo } from './containers/theme-switch';
import { ToastsContainerMemo } from './containers/toast/toast';
import { useAppDispatch } from './hooks/redux';
import { logoutUserAsync } from './store';

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
                home
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
              <Flex w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
                <HelpComponentMemo />
              </Flex>
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
                <div>
                  <p>very cool lk</p>
                  <Button
                    onClick={() => {
                      void d(logoutUserAsync());
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </AuthenticatedAccessContainer>
            </Route>
            {/* <Route exact path="/dashboard">
            <AuthenticatedAccessContainer mustBeAuthenticated={true} redirectLocation={'/login'}>
              <DashboardContainer />
              </AuthenticatedAccessContainer>
              </Route> 
            */}
            <Route path="/">
              <div>Not found</div>
            </Route>
          </Switch>
        </LayoutContainer>
        {/* <DebugContainer /> */}
      </Box>
    </ErrorBoundaryGenericContainerMemo>
  );
};
export { App };
