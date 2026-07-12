import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Design System: Liquid Glass Futurism
 * Glassmorphic Card Component — Dark-first frosted glass panel
 * - Dark glass: white/5% bg with strong backdrop-blur
 * - Optional gradient glow border on hover
 * - Smooth reveal on scroll
 * - Reduced-motion aware
 */

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  glowColor?: 'indigo' | 'cyan' | 'purple' | 'pink' | 'emerald' | 'amber' | 'none';
}

const glowColorMap: Record<string, string> = {
  indigo: 'rgba(129, 140, 248, 0.25)',
  cyan: 'rgba(34, 211, 238, 0.25)',
  purple: 'rgba(192, 132, 252, 0.25)',
  pink: 'rgba(244, 114, 182, 0.25)',
  emerald: 'rgba(52, 211, 153, 0.25)',
  amber: 'rgba(251, 191, 36, 0.25)',
  none: 'transparent',
};

export function GlassmorphicCard({
  children,
  className = '',
  hover = true,
  delay = 0,
  glowColor = 'indigo',
}: GlassmorphicCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const glow = glowColorMap[glowColor] || glowColorMap.indigo;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={
        hover
          ? {
              y: -6,
              boxShadow: `0 20px 50px ${glow}, 0 0 0 1px rgba(255, 255, 255, 0.12)`,
              transition: { duration: 0.3, ease: 'easeOut' },
            }
          : {}
      }
      className={`
        bg-white/[0.04] backdrop-blur-xl
        border border-white/[0.08] rounded-2xl
        shadow-lg shadow-black/10
        transition-all duration-300
        hover:border-white/[0.15]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
