import { Box, Button, Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CartContainerMemo } from './containers/cart';
import { DashboardContainerMemo } from './containers/dashboard';
import {
  AuthenticatedAccessContainer,
  DebugContainer,
  ErrorBoundaryGenericContainerMemo,
  LocationTrackerContainerMemo,
  ScreenDetailsTrackerContainerMemo,
  changeRoute,
} from './containers/functional';
import { GuideContainerMemo } from './containers/guide';
import { HelpComponentMemo } from './containers/help';
import { HomeContainerMemo } from './containers/home';
import { CatalogueContainerMemo, LikedContainerMemo } from './containers/items-grid';
import { LayoutContainer } from './containers/layout';
import { LoadingTrackerProgressContainer } from './containers/loading-tracker-progress';
import { LoginContainer } from './containers/login';
import { RegisterContainer } from './containers/register';
import { ThemeSwitchContainerMemo } from './containers/theme-switch';
import { ToastsContainerMemo } from './containers/toast/toast';
import { SettingsContainerMemo } from './containers/settings';

const App: FC = () => {
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
              <AuthenticatedAccessContainer mustBe={'any'}>
                <HomeContainerMemo />
              </AuthenticatedAccessContainer>
            </Route>
            <Route exact path={'/catalogue'}>
              <AuthenticatedAccessContainer mustBe={'any'}>
                <CatalogueContainerMemo />
              </AuthenticatedAccessContainer>
            </Route>
            <Route exact path={'/liked'}>
              <AuthenticatedAccessContainer mustBe={'any'}>
                <LikedContainerMemo />
              </AuthenticatedAccessContainer>
            </Route>
            <Route exact path={'/settings'}>
              <AuthenticatedAccessContainer mustBe={'authenticated'} redirectLocation={'/login'}>
                <SettingsContainerMemo />
              </AuthenticatedAccessContainer>
            </Route>
            <Route exact path={'/help'}>
              <AuthenticatedAccessContainer mustBe={'any'}>
                <HelpComponentMemo />
              </AuthenticatedAccessContainer>
            </Route>
            <Route exact path="/login">
              <AuthenticatedAccessContainer
                mustBe={'unauthenticated'}
                redirectLocation={'/dashboard'}
              >
                <LoginContainer />
              </AuthenticatedAccessContainer>
            </Route>
            <Route exact path="/register">
              <AuthenticatedAccessContainer
                mustBe={'unauthenticated'}
                redirectLocation={'/dashboard'}
              >
                <RegisterContainer />
              </AuthenticatedAccessContainer>
            </Route>
            <Route exact path="/dashboard">
              <AuthenticatedAccessContainer mustBe={'authenticated'} redirectLocation={'/login'}>
                <DashboardContainerMemo />
              </AuthenticatedAccessContainer>
            </Route>
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
