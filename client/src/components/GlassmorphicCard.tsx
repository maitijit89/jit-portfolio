import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Design System: Liquid Glass Futurism
 * Glassmorphic Card Component - Reusable frosted glass panel
 * - Smooth reveal on scroll
 * - Soft hover lift with colored shadow
 * - Reduced-motion aware
 */

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function GlassmorphicCard({
  children,
  className = '',
  hover = true,
  delay = 0,
}: GlassmorphicCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: '0 16px 40px rgba(99, 102, 241, 0.15)',
              transition: { duration: 0.25, ease: 'easeOut' },
            }
          : {}
      }
      className={`
        bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-2xl
        shadow-md hover:shadow-lg transition-shadow duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
