import { Box, Button, Flex } from '@chakra-ui/react';
import type { FC } from 'react';
import { useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { getCategoriesAsync, goodsCategoriesSelector } from './store';

const App: FC = () => {
  const d = useAppDispatch();
  const categories = useAppSelector(goodsCategoriesSelector);

  useEffect(() => {
    if (categories === undefined || categories.length <= 0) {
      void d(getCategoriesAsync());
    }
  }, [categories, d]);

  return (
    <ErrorBoundaryGenericContainerMemo>
      <Box
        display={'flex'}
        w={'100%'}
        h={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <LoadingTrackerProgressContainer />
        <CartContainerMemo />
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
              // onClick={() => {
              //   dispatch(logoutUserAsync());
              // }}
              />
              <div>Not found</div>
            </Route>
          </Switch>
        </LayoutContainer>
        <DebugContainer />
      </Box>
      {/* <div id="bg" className={classNames(style.app, style[theme])} /> */}
    </ErrorBoundaryGenericContainerMemo>
  );
};
export { App };
