import { useEffect, useState } from 'react';

type TLazyImage = { lSrc: string; hSrc: string };
type TLazyImageReturn = [string, { blur: boolean }];

function useLazyImg({ lSrc, hSrc }: TLazyImage): TLazyImageReturn {
  const [src, setSrc] = useState(lSrc);

  useEffect(() => {
    setSrc(lSrc);

    const img = new Image();
    img.src = hSrc;
    img.addEventListener('load', () => {
      setSrc(hSrc);
    });
  }, [lSrc, hSrc]);

  return [src, { blur: src === lSrc }];
}

export { useLazyImg };
