import { useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';
import { useState, useRef, RefObject } from 'react';

/**
 * useScrollProgress — Global page scroll progress (0 → 1)
 * Returns scrollYProgress as a MotionValue for binding to transforms.
 */
export function useScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  return { scrollYProgress, scrollY };
}

/**
 * useScrollDirection — Tracks whether user is scrolling up or down.
 * Returns 'up' | 'down' and the current scrollY value.
 */
export function useScrollDirection() {
  const { scrollY } = useScroll();
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [prevScroll, setPrevScroll] = useState(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (Math.abs(latest - prevScroll) > 5) {
      setDirection(latest > prevScroll ? 'down' : 'up');
      setPrevScroll(latest);
    }
  });

  return { direction, scrollY };
}

/**
 * useParallax — Translates an element based on scroll progress within a container.
 * @param distance - How many px to shift (positive = downward shift)
 * @param containerRef - Optional ref to the scrolling container
 */
export function useParallax(distance: number = 100, containerRef?: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  return { y, opacity, scrollYProgress };
}

/**
 * useSectionParallax — For individual section elements.
 * Returns a ref to attach, plus parallax MotionValues.
 */
export function useSectionParallax(distance: number = 50) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return { ref, y, opacity, scale, scrollYProgress };
}

/**
 * useHeroParallax — Specialized for hero section scroll-away effect.
 * Content fades + translates up as user scrolls past the hero.
 */
export function useHeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  // Background orbs move slower for depth
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return { ref, contentY, contentOpacity, contentScale, bgY1, bgY2, bgY3, scrollYProgress };
}
