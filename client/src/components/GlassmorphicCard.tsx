import { ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Design System: Liquid Glass Futurism
 * Glassmorphic Card Component - Reusable frosted glass panel
 * - 15-20% opacity with backdrop blur
 * - Soft shadows and hover effects
 * - Smooth animations on interaction
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -5, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)' } : {}}
      className={`
        bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl
        shadow-lg hover:shadow-xl transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
