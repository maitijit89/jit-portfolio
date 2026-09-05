import { ReactNode, MouseEvent, useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useIsMobile } from '@/hooks/useMobile';

/**
 * Design System: iOS Liquid Glass
 * Glassmorphic Card Component — Frosted glass panel with optional 3D tilt
 * - Translucent milk glass with specular inner reflection and soft colored drop shadows
 * - Tactile spring lift on hover (respects prefersReducedMotion)
 * - Top-edge liquid light sheen reflection
 * - Mouse-tracking 3D tilt with dynamic specular highlight (desktop only)
 * - Glow repositions to follow cursor (desktop only)
 */

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  glowColor?: 'indigo' | 'cyan' | 'purple' | 'pink' | 'emerald' | 'amber' | 'none';
  tilt?: boolean;
  maxTilt?: number;
}

const glowColorMap: Record<string, string> = {
  indigo: 'rgba(99, 102, 241, 0.18)',
  cyan: 'rgba(6, 182, 212, 0.18)',
  purple: 'rgba(168, 85, 247, 0.18)',
  pink: 'rgba(236, 72, 153, 0.18)',
  emerald: 'rgba(16, 185, 129, 0.18)',
  amber: 'rgba(245, 158, 11, 0.18)',
  none: 'transparent',
};

const glowColorRgb: Record<string, string> = {
  indigo: '99, 102, 241',
  cyan: '6, 182, 212',
  purple: '168, 85, 247',
  pink: '236, 72, 153',
  emerald: '16, 185, 129',
  amber: '245, 158, 11',
  none: '0, 0, 0',
};

const hoverBorderMap: Record<string, string> = {
  indigo: 'hover:border-indigo-400/40',
  cyan: 'hover:border-cyan-400/40',
  purple: 'hover:border-purple-400/40',
  pink: 'hover:border-pink-400/40',
  emerald: 'hover:border-emerald-400/40',
  amber: 'hover:border-amber-400/40',
  none: 'hover:border-black/8',
};

export function GlassmorphicCard({
  children,
  className = '',
  hover = true,
  delay = 0,
  glowColor = 'indigo',
  tilt = false,
  maxTilt = 6,
}: GlassmorphicCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const glow = glowColorMap[glowColor] || glowColorMap.indigo;
  const hoverBorder = hoverBorderMap[glowColor] || hoverBorderMap.indigo;
  const rgb = glowColorRgb[glowColor] || glowColorRgb.indigo;

  // Tilt state — completely disabled on mobile (no cursor = no tilt, saves GPU)
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltState, setTiltState] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const rafId = useRef<number | null>(null);

  const enableTilt = tilt && !prefersReducedMotion && !isMobile;

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!enableTilt || !cardRef.current) return;
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const rect = cardRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setTiltState({
          rotateX: (y - 0.5) * -maxTilt * 2,
          rotateY: (x - 0.5) * maxTilt * 2,
          glareX: x * 100,
          glareY: y * 100,
        });
      });
    },
    [enableTilt, maxTilt]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setTiltState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
    setIsHovered(false);
  }, []);

  const tiltTransform = enableTilt
    ? {
        transform: `perspective(800px) rotateX(${tiltState.rotateX}deg) rotateY(${tiltState.rotateY}deg)`,
        transition:
          tiltState.rotateX === 0 && tiltState.rotateY === 0
            ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.08s ease-out',
      }
    : {};

  // Dynamic glow shadow follows cursor
  const dynamicGlow = enableTilt && isHovered
    ? `${(tiltState.glareX - 50) * 0.4}px ${(tiltState.glareY - 50) * 0.4}px 40px -8px rgba(${rgb}, 0.22)`
    : undefined;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={
        hover && !enableTilt
          ? {
              y: prefersReducedMotion ? 0 : -6,
              boxShadow: `0 20px 42px -10px ${glow}, 0 0 0 1px rgba(255, 255, 255, 0.95) inset, 0 4px 12px 0 rgba(0, 0, 0, 0.04)`,
              transition: { duration: 0.3, ease: 'easeOut' },
            }
          : {}
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltTransform}
      className={`
        relative overflow-hidden card-shine
        bg-white/75
        backdrop-blur-2xl backdrop-saturate-180
        border border-white/80
        rounded-2xl
        shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06),inset_0_1px_1.5px_0_rgba(255,255,255,0.95)]
        transition-all duration-300
        ${hoverBorder}
        ${className}
      `}
    >
      {/* iOS Liquid Specular Top Rim — moves with cursor when tilt is enabled */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none z-10"
        style={{
          background: enableTilt && isHovered
            ? `linear-gradient(90deg, transparent ${Math.max(0, tiltState.glareX - 30)}%, rgba(255,255,255,0.95) ${tiltState.glareX}%, transparent ${Math.min(100, tiltState.glareX + 30)}%)`
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
        }}
      />

      {/* Dynamic glare overlay for tilt */}
      {enableTilt && (
        <div
          className="absolute inset-0 pointer-events-none z-5 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${tiltState.glareX}% ${tiltState.glareY}%, rgba(255,255,255,0.18) 0%, transparent 55%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Dynamic glow shadow overlay for tilt mode */}
      {enableTilt && dynamicGlow && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none -z-10"
          style={{
            boxShadow: dynamicGlow,
            transition: 'box-shadow 0.1s ease-out',
          }}
        />
      )}

      {children}
    </motion.div>
  );
}
