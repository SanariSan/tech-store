import { Button, Flex, Input, Text, useColorModeValue } from '@chakra-ui/react';
import { ErrorMessage, Field, Form as FormikForm } from 'formik';
import type { FC } from 'react';
import { COLORS } from '../../chakra-setup';
import { changeRoute } from '../../containers/functional/history-catcher';
import type { TRegister } from './register.type';

const RegisterComponent: FC<TRegister> = ({ isLoading, ...rest }) => {
  const { handleSubmit, errors, touched } = rest;
  const [impact, btnColor, errorMsg] = [
    useColorModeValue(COLORS.yellow[400], COLORS.yellow[400]),
    useColorModeValue(COLORS.blue[800], COLORS.darkBlue[600]),
    useColorModeValue(COLORS.red[500], COLORS.red[300]),
  ];

  return (
    <FormikForm
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Flex w={'100%'} h={'100%'} alignItems={'center'} justifyContent={'center'} p={9}>
        <Flex
          w={'max-content'}
          h={'max-content'}
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={5}
        >
          <Text variant={'xxxl'}>Register</Text>

          <Flex direction={'column'} alignItems={'flex-start'} gap={3}>
            <Text fontWeight={'bold'} variant={'md'}>
              Email
            </Text>
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
              {(errorMessage: string) => (
                <Text variant={'sm'} color={errorMsg}>
                  {errorMessage}
                </Text>
              )}
            </ErrorMessage>
          </Flex>

          <Flex direction={'column'} alignItems={'flex-start'} gap={3}>
            <Text fontWeight={'bold'} variant={'md'}>
              Username
            </Text>
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
              {(errorMessage: string) => (
                <Text variant={'sm'} color={errorMsg}>
                  {errorMessage}
                </Text>
              )}
            </ErrorMessage>
          </Flex>

          <Flex direction={'column'} alignItems={'flex-start'} gap={3}>
            <Text fontWeight={'bold'} variant={'md'}>
              Password
            </Text>
            <Input
              as={Field}
              className="mb-1"
              isInvalid={touched.password !== undefined && errors.password !== undefined}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password">
              {(errorMessage: string) => (
                <Text variant={'sm'} color={errorMsg}>
                  {errorMessage}
                </Text>
              )}
            </ErrorMessage>
          </Flex>

          <Flex direction={'column'} alignItems={'flex-start'} gap={3}>
            <Text fontWeight={'bold'} variant={'md'}>
              Password again
            </Text>
            <Input
              as={Field}
              className="mb-1"
              isInvalid={touched.passwordRe !== undefined && errors.passwordRe !== undefined}
              type="password"
              name="passwordRe"
              placeholder="Repeat password"
            />
            <ErrorMessage name="passwordRe">
              {(errorMessage: string) => (
                <Text variant={'sm'} color={errorMsg}>
                  {errorMessage}
                </Text>
              )}
            </ErrorMessage>
          </Flex>

          <Flex w={'100%'} alignItems={'center'} justifyContent={'center'} gap={6}>
            <Button
              type={'submit'}
              colorScheme={'yellow'}
              size={{ base: 'sm', sm: 'md' }}
              bg={impact}
              color={btnColor}
              opacity={1}
              _disabled={{
                opacity: 0.5,
              }}
              isDisabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Register'}
            </Button>
            <Button
              variant={'outline'}
              size={{ base: 'sm', sm: 'md' }}
              isDisabled={isLoading}
              onClick={() => {
                changeRoute('/login');
              }}
            >
              Login instead
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </FormikForm>
  );
};

export { RegisterComponent };
