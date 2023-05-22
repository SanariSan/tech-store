import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import type { FC } from 'react';
// import { useCallback, useState, useEffect, useMemo } from 'react';
// import { debounceLeadingWrap, debounceWrap } from '../../helpers/util';
import { useCallback } from 'react';
import { LoginComponent } from '../../components/login';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginUserAsync, userAuthLoadingStatusSelector } from '../../store';
import { FormSubmitControlContainer } from '../form-submit-control';
import type { TLoginFormValues } from './login.const';
import { INITIAL_VALUES, VALIDATION_SCHEMA } from './login.const';

const LoginContainer: FC = () => {
  const userAuthLoadingState = useAppSelector(userAuthLoadingStatusSelector);
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
          <LoginComponent isLoading={userAuthLoadingState === 'loading'} {...formikConfig} />
          <FormSubmitControlContainer isLoading={userAuthLoadingState === 'loading'} />
        </>
      )}
    </Formik>
  );
};

export { LoginContainer };
