import type { FormikProps } from 'formik';
import type { TLoginFormValues } from '../../containers/login/login.const';

type TProps = FormikProps<TLoginFormValues>;

type TLogin = {
  [TKey in keyof TProps]: TProps[TKey];
} & {
  isLoading: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

export type { TLogin };
