import type { FC } from 'react';
import { useMemo, useRef, useEffect, useState } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { useDelayedUnmount } from '../../hooks/use-delayed-unmount';
import { useLoadingTracker } from '../../hooks/use-loading-tracker';
import { COLORS_MAP_DARK, COLORS_MAP_LIGHT } from '../../chakra-setup';

const LoadingTrackerProgressContainer: FC = () => {
  const [impact] = [useColorModeValue(COLORS_MAP_LIGHT.impact, COLORS_MAP_DARK.impact)];

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

        const increaseX = () => {
          if (percent >= 100) {
            clearTimeout(timerRef.current);
            return;
          }

          setX((prev) => prev + 1);
          setTimeout(increaseX, ms);
        };
        timerRef.current = setTimeout(increaseX, ms);
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
    if (x === 0) {
      setPercent(0);
      return;
    }

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
          bg={impact}
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
