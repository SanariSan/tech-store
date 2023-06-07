import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { RegisterComponent } from '../../components/register';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { registerUserAsync, userAuthLoadingStatusSelector } from '../../store';
import { FormControlContainerMemo } from '../form-control';
import type { TRegisterFormValues } from './register.const';
import { VALIDATION_SCHEMA } from './register.const';

const RegisterContainer: FC = () => {
  const userAuthLoadingState = useAppSelector(userAuthLoadingStatusSelector);
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState<TRegisterFormValues>({
    email: '',
    username: '',
    password: '',
    passwordRe: '',
  });

  const generateRandomDataCb = useCallback(() => {
    const rndUsernameStr = Array.from({ length: Math.floor(Math.random() * (12 - 8) + 8) }, () =>
      String.fromCharCode(Math.floor(Math.random() * (122 - 97) + 97)),
    ).join('');
    const rndEmailStr = `${rndUsernameStr}@gmail.com`;
    const rndPasswordStr = Array.from({ length: Math.floor(Math.random() * (18 - 12) + 12) }, () =>
      String.fromCharCode(Math.floor(Math.random() * (122 - 48) + 48)),
    ).join('');

    setFormValues({
      email: rndEmailStr,
      username: rndUsernameStr,
      password: rndPasswordStr,
      passwordRe: rndPasswordStr,
    });
  }, []);

  const onSubmit = useCallback(
    (values: TRegisterFormValues, actions: FormikHelpers<TRegisterFormValues>) => {
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
    <Formik initialValues={formValues} validationSchema={VALIDATION_SCHEMA} onSubmit={onSubmit}>
      {(formikConfig) => (
        <>
          <RegisterComponent
            isLoading={userAuthLoadingState === 'loading'}
            onGenerateRandomData={generateRandomDataCb}
            {...formikConfig}
          />
          <FormControlContainerMemo
            isLoading={userAuthLoadingState === 'loading'}
            formValues={formValues}
          />
        </>
      )}
    </Formik>
  );
};

export { RegisterContainer };
