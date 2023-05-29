import { Icon } from '@chakra-ui/react';
import { useState, useRef, useEffect, useMemo, memo } from 'react';
import type { FC } from 'react';
import { FaQuestion } from 'react-icons/fa';

type THelpComponent = {
  [key: string]: unknown;
};

const HelpComponent: FC<THelpComponent> = () => {
  const isActive = useRef(true);

  useEffect(
    () => () => {
      isActive.current = false;
    },
    [],
  );

  return <Icon as={FaQuestion}></Icon>;
};

const HelpComponentMemo = memo(HelpComponent);

export { HelpComponentMemo };
