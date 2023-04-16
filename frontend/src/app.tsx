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
        <Switch>
          <Route exact path="/">
            <LayoutContainer>
              <SimpleGrid
                h={'max-content'}
                w={'100%'}
                spacing={10}
                py={10}
                px={10}
                minChildWidth={'350px'}
              >
                {Array.from({ length: 30 }, (el, idx) => (
                  <Flex
                    key={`cat-${idx}`}
                    direction={'column'}
                    minH={'350px'}
                    bg={'blue.300'}
                    borderRadius={'20px'}
                  />
                ))}
              </SimpleGrid>
            </LayoutContainer>
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
        <DebugContainer />
      </Box>
      <div id="bg" className={classNames(style.app, style[theme])} />
    </ErrorBoundaryGenericContainer>
  );
};

export { App };
