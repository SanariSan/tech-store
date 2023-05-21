import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { ErrorMessage, Field, Form as FormikForm } from 'formik';
import type { FC } from 'react';
import { changeRoute } from '../../containers/history-catcher';
import type { TLogin } from './login.type';

const LoginComponent: FC<TLogin> = ({ isLoading, ...rest }) => {
  const { handleSubmit, errors, touched } = rest;

  return (
    <Flex w={'100%'} h={'100%'}>
      <FormikForm onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Log in</h2>

        <Text>Username</Text>
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

        <Button variant="primary" type="submit" className="me-1" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Log in'}
        </Button>

        <Button
          variant="secondary"
          type="button"
          className="ms-1"
          disabled={isLoading}
          onClick={() => {
            changeRoute('/register');
          }}
        >
          Sign up instead
        </Button>
      </FormikForm>
    </Flex>
  );
};

export { LoginComponent };
