import { Box, Button, Flex } from '@chakra-ui/react';
import type { FC } from 'react';
import { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthenticatedAccessContainer } from './containers/functional/authenticated-access';
import { DebugContainer } from './containers/functional/debug';
import { ErrorBoundaryGenericContainerMemo } from './containers/functional/error-boundary-generic';
// import { ErrorBoundaryNativeContainer } from './containers/error-boundary-native';
import { CartContainerMemo } from './containers/cart';
import { ScreenDetailsTrackerContainerMemo } from './containers/functional/screen-details-tracker';
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
                help
              </Flex>
            </Route>
            <Route exact path="/login">
              <AuthenticatedAccessContainer mustBeAuthenticated={false} redirectLocation={'/'}>
                <LoginContainer />
              </AuthenticatedAccessContainer>
            </Route>
            <Route exact path="/register">
              <AuthenticatedAccessContainer mustBeAuthenticated={false} redirectLocation={'/'}>
                <RegisterContainer />
              </AuthenticatedAccessContainer>
            </Route>
            {/* <Route exact path="/dashboard">
            <AuthenticatedAccessContainer mustBeAuthenticated={true} redirectLocation={'/login'}>
              <DashboardContainer />
              </AuthenticatedAccessContainer>
              </Route> 
            */}
            <Route path="/">
              <Button
                onClick={() => {
                  void d(logoutUserAsync());
                }}
              />
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
