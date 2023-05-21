import type { FormikProps } from 'formik';
import type { TRegisterFormValues } from '../../containers/register/register.const';

type TProps = FormikProps<TRegisterFormValues>;

type TRegister = {
  [TKey in keyof TProps]: TProps[TKey];
} & {
  isLoading: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

export type { TRegister };
