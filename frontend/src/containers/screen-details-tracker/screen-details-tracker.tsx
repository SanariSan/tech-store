import type { FC } from 'react';
import { memo, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { useScreenDetails } from '../../hooks/use-screen-details';
import { setScreenDetails } from '../../store';

type TScreenDetailsTrackerContainer = {
  [key: string]: unknown;
};

const ScreenDetailsTrackerContainer: FC<TScreenDetailsTrackerContainer> = () => {
  const d = useAppDispatch();
  const {
    screenResolutionDetails: {
      default: { w, h },
    },
  } = useScreenDetails();

  useEffect(() => {
    void d(setScreenDetails({ w, h }));
  }, [w, h, d]);

  return null;
};

const ScreenDetailsTrackerContainerMemo = memo(ScreenDetailsTrackerContainer);

export { ScreenDetailsTrackerContainerMemo };
