import { useLayoutEffect, useMemo, useState } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useLayoutEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  const isMobile = useMemo(() => windowSize.width <= 600, [windowSize]);

  return { windowSize, isMobile };
}
