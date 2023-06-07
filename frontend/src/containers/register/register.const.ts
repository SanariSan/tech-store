import type { InferType } from 'yup';
import { object, ref, string } from 'yup';

const VALIDATION_SCHEMA = object({
  email: string().email().required('Email required'),
  username: string()
    .required('Username required')
    .min(6, 'Username too short')
    .max(28, 'Username too long'),
  password: string()
    .required('Password required')
    .min(6, 'Password too short')
    .max(28, 'Password too long'),
  passwordRe: string()
    .required('Please retype your password')
    .oneOf([ref('password')], 'Your passwords do not match'),
});

type TRegisterFormValues = InferType<typeof VALIDATION_SCHEMA>;

// const INITIAL_VALUES: TRegisterFormValues = {
//   email: '0a8046d4d@gmail.com',
//   username: '0a8046d4d',
//   password: 'pwd123456',
//   passwordRe: 'pwd123456',
// };

export type { TRegisterFormValues };
export { VALIDATION_SCHEMA };
