import { ErrorMessage, Field, Form as FormikForm } from 'formik';
import type { FC } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import Col from 'react-bootstrap/Col';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
import classNames from 'classnames';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { changeRoute } from '../../containers/history-catcher';
import type { TLogin } from './login.type';
import style from './login.module.scss';

const LoginComponent: FC<TLogin> = ({ theme, isLoading, ...rest }) => {
  const { handleSubmit, errors, touched } = rest;

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      className={classNames('h-100', 'd-flex', 'flex-column', 'align-items-center', style[theme])}
    >
      <FormikForm onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Log in</h2>
        {/* <Form.Group className="mb-3" controlId="formUsername"> */}
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
        {/* </Form.Group> */}
        {/* <Form.Group className="mb-3" controlId="formPassword"> */}
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
        {/* </Form.Group> */}
        {/* <Form.Group className="mb-3" controlId="formCheckbox">
          <Form.Check as={Field} type="checkbox" name="checkbox1" label="Check to continue" />
        </Form.Group> */}
        {/* <Form.Group className="mb-3 d-flex justify-content-center" controlId="formSubmit"> */}
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
        {/* </Form.Group> */}
      </FormikForm>
    </Flex>
  );
};

export { LoginComponent };
