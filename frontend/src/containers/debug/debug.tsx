import type { FC } from 'react';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { useScreenDetails } from '../../hooks/use-screen-details';
import {
  themeSelector,
  userInfoUsernameSelector,
  userAuthIsAuthenticatedSelector,
  goodsLikedEntitiesSelector,
} from '../../store';
import style from './debug.module.scss';

const DebugContainer: FC = () => {
  const {
    screenResolutionDetails: {
      default: { w, h },
    },
  } = useScreenDetails();
  const theme = useAppSelector(themeSelector);
  const username = useAppSelector(userInfoUsernameSelector);
  const isAuthenticated = useAppSelector(userAuthIsAuthenticatedSelector);
  const liked = useAppSelector(goodsLikedEntitiesSelector);

  useEffect(() => {
    console.log(`isAuthenticated ${isAuthenticated} = ${Date.now()}`);
  }, [isAuthenticated]);

  return (
    <>
      {/* <pre style={{ position: 'fixed', bottom: 0, width: '100%' }} className={style[theme]}>
        Current page size - {`${w} x ${h}`}
      </pre> */}
      <textarea
        readOnly
        // value={`isAuthenticated: ${isAuthenticated}\nusername: ${username}`}
        value={JSON.stringify(liked, null, 2)}
        style={{
          display: 'none',
          position: 'fixed',
          bottom: 20,
          right: 20,
          height: '150px',
        }}
      />
    </>
  );
};

export { DebugContainer };
