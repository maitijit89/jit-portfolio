import { useState, useCallback, useRef, MouseEvent } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
}

const defaultState: TiltState = { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 };

/**
 * useTilt — Mouse-tracking 3D tilt for cards.
 * @param maxTilt - Maximum tilt angle in degrees (default 8)
 * @param perspective - CSS perspective value (default 800)
 */
export function useTilt(maxTilt: number = 8, perspective: number = 800) {
  const [tilt, setTilt] = useState<TiltState>(defaultState);
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      // Cancel previous rAF to avoid stacking
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const rect = ref.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setTilt({
          rotateX: (y - 0.5) * -maxTilt * 2,
          rotateY: (x - 0.5) * maxTilt * 2,
          glareX: x * 100,
          glareY: y * 100,
        });
      });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setTilt(defaultState);
  }, []);

  const style = {
    perspective: `${perspective}px`,
  };

  const innerStyle = {
    transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
    transition: tilt.rotateX === 0 && tilt.rotateY === 0
      ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      : 'transform 0.1s ease-out',
  };

  const glareStyle = {
    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
    opacity: Math.abs(tilt.rotateX) + Math.abs(tilt.rotateY) > 0 ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };

  return {
    ref,
    tilt,
    style,
    innerStyle,
    glareStyle,
    handleMouseMove,
    handleMouseLeave,
  };
}
