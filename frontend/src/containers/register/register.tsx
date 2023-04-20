import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import type { FC } from 'react';
import { useCallback } from 'react';
import { Text } from '@chakra-ui/react';
import { RegisterComponent } from '../../components/register';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  registerUserAsync,
  themeSelector,
  userAuthErrorSelector,
  userAuthLoadingStatusSelector,
} from '../../store';
import { FormSubmitControlContainer } from '../form-submit-control';
import { INITIAL_VALUES, VALIDATION_SCHEMA } from './register.const';
import type { TRegisterFormValues } from './register.const';

const RegisterContainer: FC = () => {
  const theme = useAppSelector(themeSelector);
  const userAuthLoadingState = useAppSelector(userAuthLoadingStatusSelector);
  const userAuthError = useAppSelector(userAuthErrorSelector);
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    (values: TRegisterFormValues, actions: FormikHelpers<TRegisterFormValues>) => {
      console.log({ values });
      void dispatch(
        registerUserAsync({
          email: values.email,
          username: values.username,
          password: values.password,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA} onSubmit={onSubmit}>
      {(formikConfig) => (
        <>
          <RegisterComponent
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

export { RegisterContainer };
