import { Box, Image, keyframes, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { FC, MutableRefObject } from 'react';
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { sleep } from '../../helpers/util';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useScreenshot } from '../../hooks/use-screenshot';
import {
  finalizeColorModeChangeUi,
  uiColorModeAnimationDurationSelector,
  uiColorModeChangeStatusSelector,
  uiColorModeToogleCoordsSelector,
  uiScreenDetailsSelector,
} from '../../store';

type TFancyThemeSwitchContainer = {
  screenshotTargetRef: MutableRefObject<HTMLElement | null>;
};
const FancyThemeSwitchContainer: FC<TFancyThemeSwitchContainer> = ({ screenshotTargetRef }) => {
  const d = useAppDispatch();
  const mountRenderCompleted = useRef(false);
  const { image, takeScreenshot } = useScreenshot({ type: 'image/png' });
  const [imageLocal, setImageLocal] = useState<string | null>(null);
  const { toggleColorMode } = useColorMode();
  const colorModeChangeStatus = useAppSelector(uiColorModeChangeStatusSelector);
  const overlayCleanupTimer = useRef<NodeJS.Timer>();
  const overlayAnimationDuration = useAppSelector(uiColorModeAnimationDurationSelector);
  const colorModeToogleCoords = useAppSelector(uiColorModeToogleCoordsSelector);
  const screenDetails = useAppSelector(uiScreenDetailsSelector);
  const [colorModeChangeStatusProxy, setColorModeChangeStatusProxy] =
    useState(colorModeChangeStatus);

  const animationEndPoint = useMemo(
    () => ({
      x: (colorModeToogleCoords.x / screenDetails.w) * 100,
      y: (colorModeToogleCoords.y / screenDetails.h) * 100,
    }),
    [colorModeToogleCoords, screenDetails],
  );
  const animationKeyframes = useMemo(
    () => keyframes`
        0% { clip-path: circle(110% at 50% 50%); }
        100% { clip-path: circle(0% at ${animationEndPoint.x}% ${animationEndPoint.y}%);  }
      `,
    [animationEndPoint],
  );
  const animationOpacityKeyframes = useMemo(
    () => keyframes`
        0% { opacity: 0; }
        100% { opacity: 1; }
      `,
    [],
  );
  const animation = useMemo(
    () =>
      `${animationKeyframes} ${overlayAnimationDuration}ms ease-in-out forwards, 
      ${animationOpacityKeyframes} ${300}ms ease-in-out forwards`,
    [animationKeyframes, overlayAnimationDuration, animationOpacityKeyframes],
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
    const ac = new AbortController();

    if (colorModeChangeStatus === 'ongoing') {
      setColorModeChangeStatusProxy('ongoing');
      return;
    }

    // delay to let animation properly finish before removing
    // transparent overlay box
    void sleep(overlayAnimationDuration).then(() => {
      if (ac.signal.aborted) return;
      setColorModeChangeStatusProxy(colorModeChangeStatus);
      return;
    });

    return () => {
      ac.abort();
    };
  }, [colorModeChangeStatus, overlayAnimationDuration]);

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' &&
      mountRenderCompleted.current &&
      colorModeChangeStatus === 'ongoing'
    ) {
      takeScreenshotCb();
    }
  }, [colorModeChangeStatus, takeScreenshotCb]);

  useEffect(() => {
    if (image !== undefined) setImageLocal(image);
  }, [image]);

  useLayoutEffect(() => {
    if (imageLocal !== null && overlayCleanupTimer.current === undefined) {
      void sleep(300).then(() => {
        toggleColorMode();
        void d(finalizeColorModeChangeUi());
        return;
      });

      overlayCleanupTimer.current = setTimeout(() => {
        overlayCleanupTimer.current = undefined;
        setImageLocal(null);
      }, overlayAnimationDuration);
    }
  }, [imageLocal, overlayAnimationDuration, d, toggleColorMode]);

  useEffect(() => {
    if (!mountRenderCompleted.current) mountRenderCompleted.current = true;

    return () => {
      mountRenderCompleted.current = false;
    };
  }, []);

  return (
    <>
      {colorModeChangeStatus === 'ongoing' ||
        (colorModeChangeStatusProxy === 'ongoing' && (
          // overlay Box will stay until animation is fully done
          // prevents user from interrupting anything
          <Box
            position={'absolute'}
            zIndex={999_999}
            w={'100%'}
            h={'100%'}
            left={0}
            top={0}
            background={'transparent'}
          />
        ))}
      <Image
        as={motion.image}
        position={'absolute'}
        zIndex={999_999}
        w={'100%'}
        h={'100%'}
        backgroundImage={imageLocal !== null ? image : undefined}
        left={0}
        top={0}
        transform={'perspective(500px) translateX(1px) translateY(1px) translateZ(1px)'}
        opacity={0}
        animation={animation}
        display={imageLocal !== null ? 'block' : 'none'}
      />
    </>
  );
};

const FancyThemeSwitchContainerMemo = memo(FancyThemeSwitchContainer);

export { FancyThemeSwitchContainerMemo };
