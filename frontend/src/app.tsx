import { Box, Button, Flex } from '@chakra-ui/react';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthenticatedAccessContainer } from './containers/authenticated-access';
import { DebugContainer } from './containers/debug';
import { ErrorBoundaryGenericContainerMemo } from './containers/error-boundary-generic';
// import { ErrorBoundaryNativeContainer } from './containers/error-boundary-native';
import { CartContainerMemo } from './containers/cart';
import { CatalogueContainerMemo, LikedContainerMemo } from './containers/items-grid';
import { LayoutContainer } from './containers/layout';
import { LoadingTrackerProgressContainer } from './containers/loading-tracker-progress';
import { LoginContainer } from './containers/login';
import { RegisterContainer } from './containers/register';
import { ThemeSplashContainerMemo, ThemeSwitchContainerMemo } from './containers/theme-splash';
import { ToastsContainerMemo } from './containers/toast/toast';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { useIsMobile } from './hooks/use-is-mobile';
import {
  getCategoriesAsync,
  goodsCategoriesSelector,
  logoutUserAsync,
  uiIsMobileSelector,
} from './store';

const App: FC = () => {
  const d = useAppDispatch();
  const categories = useAppSelector(goodsCategoriesSelector);
  const screenshotTargetRef = useRef(null);
  const isMobile = useAppSelector(uiIsMobileSelector);

  useIsMobile();

  useEffect(() => {
    if (categories === undefined || categories.length <= 0) {
      void d(getCategoriesAsync());
    }
  }, [categories, d]);

  return (
    <Box
      display={'flex'}
      w={'100%'}
      h={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
    >
      <ErrorBoundaryGenericContainerMemo>
        {isMobile ? (
          <ThemeSwitchContainerMemo />
        ) : (
          <ThemeSplashContainerMemo screenshotTargetRef={screenshotTargetRef} />
        )}
        <Box
          ref={screenshotTargetRef}
          display={'flex'}
          w={'100%'}
          h={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <LoadingTrackerProgressContainer />
          <ToastsContainerMemo />
          <CartContainerMemo />
          <LayoutContainer>
            <Switch>
              <Route exact path={'/'}>
                <Flex w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
                  home
                  {/* <Button onClick={getImage}>OK</Button> */}
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
                {/* <LandingNavbarContainer /> */}
                <AuthenticatedAccessContainer mustBeAuthenticated={false} redirectLocation={'/'}>
                  <LoginContainer />
                </AuthenticatedAccessContainer>
              </Route>
              <Route exact path="/register">
                {/* <LandingNavbarContainer /> */}
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
          <DebugContainer />
        </Box>
        {/* <div id="bg" className={classNames(style.app, style[theme])} /> */}
      </ErrorBoundaryGenericContainerMemo>
    </Box>
  );
};
export { App };
