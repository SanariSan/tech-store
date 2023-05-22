import { useCallback } from 'react';
import { setIsMobile } from '../../store';
import { useAppDispatch } from '../redux';
import { useScreenDetails } from '../use-screen-details';

const useIsMobile = () => {
  const d = useAppDispatch();
  const {
    screenResolutionDetails: {
      default: { w, h },
    },
  } = useScreenDetails();

  const setTypeDebounced = useCallback(
    ({ isMobile }: { isMobile: boolean }) => {
      d(setIsMobile({ isMobile }));
    },
    [d],
  );

  if ((w <= 400 && h <= 800) || (w <= 800 && h <= 400)) {
    setTypeDebounced({ isMobile: true });
    return;
  }

  setTypeDebounced({ isMobile: false });
};

export { useIsMobile };
