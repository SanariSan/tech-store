import classNames from 'classnames';
import type { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
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
import { LayoutComponent } from './components/layout';

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
        // overflow={'hidden'}
      >
        <LoadingTrackerProgressContainer />
        <Switch>
          <Route exact path="/">
            {/* <LandingNavbarContainer /> */}
            {/* <LandingComponent /> */}
            <LayoutComponent />
          </Route>
          <Route exact path="/login">
            {/* <LandingNavbarContainer /> */}
            <AuthenticatedAccessContainer
              mustBeAuthenticated={false}
              redirectLocation={'/dashboard'}
            >
              <LoginContainer />
            </AuthenticatedAccessContainer>
          </Route>
          <Route exact path="/register">
            {/* <LandingNavbarContainer /> */}
            <AuthenticatedAccessContainer
              mustBeAuthenticated={false}
              redirectLocation={'/dashboard'}
            >
              <RegisterContainer />
            </AuthenticatedAccessContainer>
          </Route>
          <Route exact path="/dashboard">
            <AuthenticatedAccessContainer mustBeAuthenticated={true} redirectLocation={'/login'}>
              {/* <DashboardContainer />  */}
            </AuthenticatedAccessContainer>
          </Route>
          <Route path="/">
            <div>Not found</div>
          </Route>
        </Switch>
        <DebugContainer />
      </Box>
      <div id="bg" className={classNames(style.app, style[theme])} />
    </ErrorBoundaryGenericContainer>
  );
};

export { App };
