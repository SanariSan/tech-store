import { Button, Flex, Input, Text } from '@chakra-ui/react';
import classNames from 'classnames';
import { ErrorMessage, Field, Form as FormikForm } from 'formik';
import type { FC } from 'react';
import { changeRoute } from '../../containers/history-catcher';
import style from './register.module.scss';
import type { TRegister } from './register.type';

const RegisterComponent: FC<TRegister> = ({ isLoading, theme, ...rest }) => {
  const { handleSubmit, errors, touched } = rest;

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      className={classNames('h-100', 'd-flex', 'flex-column', 'align-items-center', style[theme])}
    >
      <FormikForm onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>

        <Text className={style[theme]}>Email</Text>
        <Input
          as={Field}
          className="mb-1"
          isInvalid={touched.email !== undefined && errors.email !== undefined}
          type="text"
          name="email"
          aria-label="email"
          placeholder="Enter email"
        />
        <ErrorMessage name="email">
          {(errorMessage: string) => <Text className="ms-1 text-danger">{errorMessage}</Text>}
        </ErrorMessage>

        <Text className={style[theme]}>Username</Text>
        <Input
          as={Field}
          className="mb-1"
          isInvalid={touched.username !== undefined && errors.username !== undefined}
          type="text"
          name="username"
          aria-label="username"
          placeholder="Enter username"
        />
        <ErrorMessage name="username">
          {(errorMessage: string) => <Text className="ms-1 text-danger">{errorMessage}</Text>}
        </ErrorMessage>

        <Text>Password</Text>
        <Input
          as={Field}
          className="mb-1"
          isInvalid={touched.password !== undefined && errors.password !== undefined}
          type="password"
          name="password"
          placeholder="Password"
        />
        <ErrorMessage name="password">
          {(errorMessage: string) => <Text className="ms-1 text-danger">{errorMessage}</Text>}
        </ErrorMessage>

        <Text>Password again</Text>
        <Input
          as={Field}
          className="mb-1"
          isInvalid={touched.passwordRe !== undefined && errors.passwordRe !== undefined}
          type="password"
          name="passwordRe"
          placeholder="Repeat password"
        />
        <ErrorMessage name="passwordRe">
          {(errorMessage: string) => <Text className="ms-1 text-danger">{errorMessage}</Text>}
        </ErrorMessage>

        <Button variant="primary" type="submit" className="me-1" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Register'}
        </Button>
        <Button
          variant="secondary"
          type="button"
          className="ms-1"
          disabled={isLoading}
          onClick={() => {
            changeRoute('/login');
          }}
        >
          Login instead
        </Button>
      </FormikForm>
    </Flex>
  );
};

export { RegisterComponent };
