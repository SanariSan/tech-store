import { Image, keyframes, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { FC, MutableRefObject } from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { sleep } from '../../helpers/util';
import { useAppSelector } from '../../hooks/redux';
import { useScreenshot } from '../../hooks/use-screenshot';
import { uiColorModeAnimationDurationSelector, uiColorModeFlagSelector } from '../../store';

type TThemeSplashContainer = {
  screenshotTargetRef: MutableRefObject<HTMLElement | null>;
};
// todo: pass scroll position to screenshoter
const ThemeSplashContainer: FC<TThemeSplashContainer> = ({ screenshotTargetRef }) => {
  const mountRenderCompleted = useRef(false);
  const splashCleanupTimer = useRef<NodeJS.Timer>();
  const { image, takeScreenshot } = useScreenshot({ type: 'image/png' });
  const [imageLocal, setImageLocal] = useState<string | null>(null);
  const { toggleColorMode } = useColorMode();
  const colorModeFlag = useAppSelector(uiColorModeFlagSelector);
  const splashAnimationDuration = useAppSelector(uiColorModeAnimationDurationSelector);
  const [lastFlag, setLastFlag] = useState<boolean>(colorModeFlag);
  // to let react first render image in dom, then toggle theme through useEffect on next re-render
  const [colorModeToggleProxy, setColorModeToggleProxy] = useState<boolean>(false);

  // const animationKeyframes = useMemo(
  //   () => keyframes`
  //   0% { clip-path: circle(110% at 50% 50%); }
  //   100% { clip-path: circle(0% at 100% 0%);  }
  //   `,
  //   [],
  // );
  const animationKeyframes = useMemo(
    () => keyframes`
    0% { clip-path: circle(110% at 50% 50%); }
    100% { clip-path: circle(0% at 0% 0%);  }
    `,
    [],
  );
  const animation = useMemo(
    () => `${animationKeyframes} ${splashAnimationDuration}ms ease-in-out forwards`,
    [animationKeyframes, splashAnimationDuration],
  );

  const takeScreenshotCb = useCallback(() => {
    void takeScreenshot({
      node: screenshotTargetRef.current,
      options: {
        foreignObjectRendering: true,
      },
    });
  }, [takeScreenshot, screenshotTargetRef]);

  useEffect(() => {
    if (mountRenderCompleted.current && colorModeFlag !== lastFlag) {
      takeScreenshotCb();
      setLastFlag(colorModeFlag);
    }
  }, [lastFlag, colorModeFlag, takeScreenshotCb]);

  useEffect(() => {
    if (image !== undefined) setImageLocal(image);
  }, [image]);

  useEffect(() => {
    if (colorModeToggleProxy) {
      // extra delay before toggling theme to guarantee react's rendering of the image in the dom
      void sleep(200).then(() => {
        toggleColorMode();
        return;
      });
      setColorModeToggleProxy(false);
    }
  }, [colorModeToggleProxy, toggleColorMode]);

  useEffect(() => {
    if (imageLocal !== null && splashCleanupTimer.current === undefined) {
      setColorModeToggleProxy(true);
      splashCleanupTimer.current = setTimeout(() => {
        splashCleanupTimer.current = undefined;
        setImageLocal(null);
      }, splashAnimationDuration);
    }
  }, [imageLocal, splashAnimationDuration]);

  useEffect(() => {
    if (!mountRenderCompleted.current) mountRenderCompleted.current = true;

    return () => {
      mountRenderCompleted.current = false;
    };
  }, []);

  return (
    <Image
      as={motion.div}
      position={'absolute'}
      zIndex={999_999}
      w={'100%'}
      h={'100%'}
      backgroundImage={imageLocal !== null ? image : undefined}
      left={0}
      top={0}
      // transform={'translate(-1px, -1px) scale(1.01)'}
      // transform={'scale(1.01)'}
      transform={'perspective(500px) translateX(1px) translateY(1px) translateZ(1px)'}
      animation={animation}
      display={imageLocal !== null ? 'block' : 'none'}
    />
  );
};

const ThemeSplashContainerMemo = memo(ThemeSplashContainer);

type TThemeSwitchContainer = {
  [key: string]: unknown;
};

const ThemeSwitchContainer: FC<TThemeSwitchContainer> = () => {
  const mountRenderCompleted = useRef(false);
  const colorModeFlag = useAppSelector(uiColorModeFlagSelector);
  const [lastFlag, setLastFlag] = useState<boolean>(colorModeFlag);
  const { toggleColorMode } = useColorMode();

  useEffect(() => {
    if (mountRenderCompleted.current && colorModeFlag !== lastFlag) {
      toggleColorMode();
      setLastFlag(colorModeFlag);
    }
  }, [lastFlag, colorModeFlag, toggleColorMode]);

  useEffect(() => {
    if (!mountRenderCompleted.current) mountRenderCompleted.current = true;

    return () => {
      mountRenderCompleted.current = false;
    };
  }, []);

  return <></>;
};

const ThemeSwitchContainerMemo = memo(ThemeSwitchContainer);

export { ThemeSplashContainerMemo, ThemeSwitchContainerMemo };
