import type { FC } from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useReactiveToast } from '../../hooks/use-reactive-toast';
import {
  setErrorMessage,
  setInfoMessage,
  setSuccessMessage,
  setWarningMessage,
  uiErrorSelector,
  uiInfoSelector,
  uiSuccessSelector,
  uiWarningSelector,
} from '../../store';

type TToastsContainer = {
  [key: string]: unknown;
};

const ToastsContainer: FC<TToastsContainer> = () => {
  const d = useAppDispatch();

  const success = useAppSelector(uiSuccessSelector);
  useReactiveToast({
    type: 'success',
    title: success?.title,
    description: success?.description,
    storeCleanupCb: () => d(setSuccessMessage()),
  });

  const warning = useAppSelector(uiWarningSelector);
  useReactiveToast({
    type: 'warning',
    title: warning?.title,
    description: warning?.description,
    storeCleanupCb: () => d(setWarningMessage()),
  });

  const info = useAppSelector(uiInfoSelector);
  useReactiveToast({
    type: 'info',
    title: info?.title,
    description: info?.description,
    storeCleanupCb: () => d(setInfoMessage()),
  });

  const error = useAppSelector(uiErrorSelector);
  useReactiveToast({
    type: 'error',
    title: error?.title,
    description: error?.description,
    storeCleanupCb: () => d(setErrorMessage()),
  });

  return <></>;
};

const ToastsContainerMemo = memo(ToastsContainer);

export { ToastsContainerMemo };
