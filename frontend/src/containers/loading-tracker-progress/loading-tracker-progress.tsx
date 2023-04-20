import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useDelayedUnmount } from '../../hooks/use-delayed-unmount';
import { useLoadingTracker } from '../../hooks/use-loading-tracker';

const calculateExpPercentage = (x: number, coeff: number) => (x / (x + coeff)) * 100;

const LoadingTrackerProgressContainer: FC = () => {
  const { isLoading } = useLoadingTracker();
  const { isMounted } = useDelayedUnmount({ isVisible: isLoading, delay: 500 });

  const [x, setX] = useState(0);
  const coeff = 20;
  const [percent, setPercent] = useState(() => calculateExpPercentage(x, coeff));

  useEffect(() => {
    let timerId: NodeJS.Timer | undefined;

    if (isLoading && isMounted) {
      setX(0);
      setPercent(0);

      const ms = Math.random() * (250 - 100) + 100;
      timerId = setInterval(() => {
        setX((prev) => prev + 1);
      }, ms);
    } else if (!isLoading && isMounted) {
      clearInterval(timerId);
      setPercent(100);
    } else if (!isLoading && !isMounted) {
      setX(0);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isLoading, isMounted]);

  useEffect(() => {
    setPercent(calculateExpPercentage(x, coeff));
  }, [x]);

  // console.log(isLoading, isMounted, x, percent);

  return (
    <>
      {isMounted && (
        <Box
          // bg={'cyan.600'}
          // opacity={isLoading ? 0.6 : 0}
          bg={'yellow.400'}
          opacity={isLoading ? 1 : 0}
          boxShadow={'0px -2px 5px 0px rgba(0,0,0,0.75)'}
          position={'fixed'}
          top={0}
          left={0}
          h={'4px'}
          transition={'opacity 0.6s linear, max-width 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)'}
          zIndex={1000}
          w={`100%`}
          maxW={`${percent}%`}
        />
      )}
    </>
  );
};

export { LoadingTrackerProgressContainer };
