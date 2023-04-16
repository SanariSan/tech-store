import classNames from 'classnames';
import type { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import style from './app.module.scss';
import { AuthenticatedAccessContainer } from './containers/authenticated-access';
import { DebugContainer } from './containers/debug';
import { ErrorBoundaryGenericContainer } from './containers/error-boundary-generic';
// import { ErrorBoundaryNativeContainer } from './containers/error-boundary-native';
import { LoadingTrackerProgressContainer } from './containers/loading-tracker-progress';
import { LoginContainer } from './containers/login';
import { RegisterContainer } from './containers/register';
import { useAppSelector } from './hooks/redux';
import { themeSelector } from './store';
import { LayoutContainer } from './containers/layout';
import { CatalogueComponent } from './components/catalogue';

const App: FC = () => {
  const theme = useAppSelector(themeSelector);

  return (
    <ErrorBoundaryGenericContainer>
      <Box
        display={'flex'}
        w={'100%'}
        h={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <LoadingTrackerProgressContainer />
        <LayoutContainer>
          <Switch>
            <Route exact path={'/'}>
              <Flex w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
                home
              </Flex>
            </Route>
            <Route exact path={'/catalogue'}>
              <CatalogueComponent />
            </Route>
            <Route exact path={'/liked'}>
              <Flex w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
                liked
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
              <div>Not found</div>
            </Route>
          </Switch>
        </LayoutContainer>
        <DebugContainer />
      </Box>
      <div id="bg" className={classNames(style.app, style[theme])} />
    </ErrorBoundaryGenericContainer>
  );
};

export { App };
