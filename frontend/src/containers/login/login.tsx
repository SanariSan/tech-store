import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import type { FC } from 'react';
// import { useCallback, useState, useEffect, useMemo } from 'react';
// import { debounceLeadingWrap, debounceWrap } from '../../helpers/util';
import { useCallback } from 'react';
import { Text } from '@chakra-ui/react';
import { LoginComponent } from '../../components/login';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  loginUserAsync,
  themeSelector,
  userAuthErrorSelector,
  userAuthLoadingStatusSelector,
} from '../../store';
import { FormSubmitControlContainer } from '../form-submit-control';
import { INITIAL_VALUES, VALIDATION_SCHEMA } from './login.const';
import type { TLoginFormValues } from './login.const';

const LoginContainer: FC = () => {
  const theme = useAppSelector(themeSelector);
  const userAuthLoadingState = useAppSelector(userAuthLoadingStatusSelector);
  const userAuthError = useAppSelector(userAuthErrorSelector);
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    (values: TLoginFormValues, actions: FormikHelpers<TLoginFormValues>) => {
      console.log({ values });
      void dispatch(loginUserAsync({ username: values.username, password: values.password }));
    },
    [dispatch],
  );

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA} onSubmit={onSubmit}>
      {(formikConfig) => (
        <>
          <LoginComponent
            theme={theme}
            isLoading={userAuthLoadingState === 'loading'}
            {...formikConfig}
          />
          <Text color={'white.300'}>{userAuthError ?? undefined}</Text>
          <FormSubmitControlContainer isLoading={userAuthLoadingState === 'loading'} />
        </>
      )}
    </Formik>
  );
};

export { LoginContainer };
