import type { FC } from 'react';
import { useMemo, useRef, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useDelayedUnmount } from '../../hooks/use-delayed-unmount';
import { useLoadingTracker } from '../../hooks/use-loading-tracker';

const LoadingTrackerProgressContainer: FC = () => {
  const calculateExpPercentage = useMemo(
    () => (_x: number, _coeff: number) => (_x / (_x + _coeff)) * 100,
    [],
  );

  const { isLoading } = useLoadingTracker();
  const { isMounted } = useDelayedUnmount({ isVisible: isLoading, delay: 500 });

  const [x, setX] = useState(0);
  const coeff = 20;
  const [percent, setPercent] = useState(() => calculateExpPercentage(x, coeff));

  const timerRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (isLoading && isMounted) {
      if (timerRef.current === undefined) {
        const ms = Math.random() * (250 - 100) + 100;
        timerRef.current = setInterval(() => {
          if (percent >= 100) return;
          setX((prev) => prev + 1);
        }, ms);
      }
    } else if (!isLoading && isMounted) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
      setPercent(100);
    } else if (!isLoading && !isMounted) {
      setX(0);
    }
  }, [isLoading, isMounted, percent]);

  useEffect(() => {
    setPercent(calculateExpPercentage(x, coeff));
  }, [x, calculateExpPercentage]);

  useEffect(
    () => () => {
      clearInterval(timerRef.current);
    },
    [],
  );

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
          h={'5px'}
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
