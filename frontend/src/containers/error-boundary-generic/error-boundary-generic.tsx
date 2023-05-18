import { Button } from '@chakra-ui/react';
import type { FC, ReactNode } from 'react';
import { memo, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallbackComponent: FC<{
  error: Error;
  resetErrorBoundary: () => void;
}> = ({ error, resetErrorBoundary }) => (
  <div>
    <p>Something went wrong:</p>
    <Button
      type={'button'}
      onClick={() => {
        window.location.reload();
      }}
    >
      {/* onClick={resetErrorBoundary} */}
      Reload page
    </Button>
  </div>
);

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  // E.g. log to an error logging client here
  console.group('err');
  console.log(error.message);
  console.log(error.stack);
  console.log(info.componentStack);
  console.groupEnd();
};

const ErrorBoundaryGenericContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const isActive = useRef(true);

  useEffect(
    () => () => {
      isActive.current = false;
    },
    [],
  );

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackComponent}
      onError={myErrorHandler}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

const ErrorBoundaryGenericContainerMemo = memo(ErrorBoundaryGenericContainer);

export { ErrorBoundaryGenericContainerMemo };
