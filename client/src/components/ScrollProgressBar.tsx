import { motion, useScroll, useSpring } from 'framer-motion';
import { useIsMobile } from '@/hooks/useMobile';

/**
 * ScrollProgressBar — Fixed gradient progress line at the top of the viewport
 * Smoothly tracks page scroll position from 0% to 100%
 */
export function ScrollProgressBar() {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const springScaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.75 z-60 origin-left pointer-events-none"
      style={{
        scaleX: isMobile ? scrollYProgress : springScaleX,
        background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
      }}
    />
  );
}
