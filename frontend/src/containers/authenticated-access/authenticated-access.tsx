import type { FC } from 'react';
import { useMemo, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner, useColorModeValue } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkUserAuthStatusAsync, userAuthIsAuthenticatedSelector } from '../../store';
import type { TAuthRoute } from './authenticated-access.type';
import { COLORS } from '../../chakra-setup';

const AuthenticatedAccessContainer: FC<TAuthRoute> = ({
  children,
  mustBeAuthenticated,
  redirectLocation,
}) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(userAuthIsAuthenticatedSelector);
  const isLoading = useMemo(() => isAuthenticated === 'idle', [isAuthenticated]);
  const [inactive] = [useColorModeValue(COLORS.blue[500], COLORS.blue[600])];

  useEffect(() => {
    if (isAuthenticated === 'idle') {
      void dispatch(checkUserAuthStatusAsync());
    }

    return () => {
      // cleanup for react test mount, but causing re-check session each time user
      // visits main page after login/reg/dashboard since this wrapper unmounts
      // void dispatch(setUserIsAuthenticated({ status: 'idle' }));
    };
  }, [dispatch, isAuthenticated]);

  console.log(
    `isAuthenticated-${isAuthenticated};mustBeAuthenticated-${mustBeAuthenticated};${
      isAuthenticated !== mustBeAuthenticated ? redirectLocation : ''
    }`,
  );

  if (isAuthenticated === 'idle')
    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          visibility: isLoading ? 'visible' : 'hidden',
          zIndex: 2,
        }}
      >
        <Spinner size={'xl'} color={inactive} />
      </div>
    );

  return (
    <>{isAuthenticated === mustBeAuthenticated ? children : <Redirect to={redirectLocation} />}</>
  );
};

export { AuthenticatedAccessContainer };
