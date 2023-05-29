import type { FC } from 'react';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { useScreenDetails } from '../../../hooks/use-screen-details';
import { useMousePos } from '../../../hooks/use-mouse-pos';
import { setScreenDetails } from '../../../store';

const DebugContainer: FC = () => {
  const d = useAppDispatch();
  const {
    screenResolutionDetails: {
      default: { w, h },
    },
  } = useScreenDetails();

  const { x, y } = useMousePos();

  useEffect(() => {
    console.log(w, h);
    void d(setScreenDetails({ w, h }));
  }, [w, h, d]);

  // const isAuthenticated = useAppSelector(userAuthIsAuthenticatedSelector);
  // useEffect(() => {
  //   console.log(`isAuthenticated ${isAuthenticated} = ${Date.now()}`);
  // }, [isAuthenticated]);

  return (
    <>
      <pre
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          fontSize: '10px',
          width: 'max-content',
          zIndex: 99_999,
          display: 'block',
        }}
      >
        {/* Current page size - {`${w} x ${h}`} */}
        {`${x} : ${y} : ${w} : ${h} : ${(x / w) * 100}`}
      </pre>
      <textarea
        readOnly
        // value={`isAuthenticated: ${isAuthenticated}\nusername: ${username}`}
        // value={JSON.stringify(liked, null, 2)}
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
