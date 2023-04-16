import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux';
import { userAuthLoadingStatusSelector } from '../../store';

const useLoadingTracker = () => {
  const authLoadingStatus = useAppSelector(userAuthLoadingStatusSelector);
  const [isLoading, setIsLoading] = useState(false);

  // path change fake loading just for UI consistency
  // if another loading source switches to TRUE then loading would just continue
  const { pathname } = useLocation();
  const [pageChangedLoading, setPageChangedLoading] = useState(false);
  useEffect(() => {
    setPageChangedLoading(true);
    setTimeout(() => {
      setPageChangedLoading(false);
    }, Math.floor(Math.random() * (400 - 200)) + 200);
  }, [pathname]);

  useEffect(() => {
    // || dashboardLoadingStatus === 'loading' || smthElse === true ...
    if (authLoadingStatus === 'loading' || pageChangedLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [authLoadingStatus, pageChangedLoading]);

  return { isLoading };
};

export { useLoadingTracker };
