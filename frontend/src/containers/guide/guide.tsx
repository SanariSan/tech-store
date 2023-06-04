import type { PlacementWithLogical } from '@chakra-ui/react';
import { Image, Tooltip, useBreakpointValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useRef, useEffect, useState, memo } from 'react';

import hint from '../../../assets/hint.webp';
import { useAppSelector } from '../../hooks/redux';
import { uiIsMobileSelector, uiPathnameSelector } from '../../store';

type TGuideContainer = {
  [key: string]: unknown;
};

// q = [{id: cart}, {id: help}, {id: theme}]

// watch selectors and add events to q
// if selector became negative - filter q and remove event

// current msg to show is separate object
// when user aknowledged info by pressing button OR making the action - empty it

// button is easy, making action is...selector state change
// so I not only filter q, but also remove event from current msg

const GuideContainer: FC<TGuideContainer> = () => {
  const a = 1;
  const t = useRef<NodeJS.Timer | undefined>();
  const pathname = useAppSelector(uiPathnameSelector);
  //   const isMobile = useAppSelector(uiIsMobileSelector);

  // const tooltipPos = (useBreakpointValue({
  //   base: 'top',
  //   md: 'left',
  // }) ?? 'top') as PlacementWithLogical;
  const tooltipPos = 'top';
  const [pos, setPos] = useState(-50);
  const [msgFin, setMsgFin] = useState('');
  const [msg, setMsg] = useState('');
  const msgFinRef = useRef(msgFin);
  const msgRef = useRef(msg);

  msgFinRef.current = msgFin;
  msgRef.current = msg;

  useEffect(() => {
    if (pathname === '/help') {
      setMsgFin('No elp for ya bud...');
    } else if (pathname === '/') {
      setMsgFin('Did you know you can log in here too?');
    }
  }, [pathname]);

  useEffect(() => {
    msgRef.current = '';
    setMsg('');
  }, [msgFin]);

  useEffect(() => {
    if (t.current !== undefined) return;

    const cb = () => {
      if (msgRef.current.length >= msgFinRef.current.length) {
        t.current = undefined;
        return;
      }

      setMsg((_) => _ + msgFinRef.current.charAt(_.length));
      t.current = setTimeout(() => {
        cb();
      }, 50);
    };

    cb();
  }, [msgFin]);

  return null;
  return (
    <Tooltip
      label={msg}
      placement={tooltipPos}
      isOpen
      hasArrow
      arrowSize={10}
      whiteSpace={'normal'}
    >
      <Image
        src={hint}
        position={'fixed'}
        bottom={-25}
        right={0}
        objectFit={'contain'}
        maxH={'150px'}
        filter={'auto'}
        brightness={'80%'}
        zIndex={2}
      />
    </Tooltip>
  );
};

const GuideContainerMemo = memo(GuideContainer);

export { GuideContainerMemo };
