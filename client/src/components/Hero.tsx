import { lazy, Suspense, useRef, useCallback, MouseEvent, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { TypingEffect } from './TypingEffect';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/useMobile';

const Canvas3D = lazy(() => import('./Canvas3D').then((mod) => ({ default: mod.Canvas3D })));

/**
 * Design System: iOS Liquid Glass
 * Hero Section — Immersive hero with scroll-reactive 3D background
 * - Desktop: 3D floating badges, subtle parallax, magnetic CTA buttons
 * - Mobile: Ultra-lightweight, 60fps native performance, no Three.js or heavy blur
 */

/* Magnetic button subcomponent — desktop only */
function DesktopMagneticButton({
  children,
  className = '',
  href,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  [key: string]: any;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - centerX) * 0.15,
      y: (e.clientY - centerY) * 0.15,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.5 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);

  // Desktop parallax only
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion || isMobile ? 0.08 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 pt-20 pb-12 transition-colors duration-300"
    >
      {/* ── 3D Canvas Background (DESKTOP ONLY to prevent mobile GPU lag) ── */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <Canvas3D />
          </Suspense>
        </div>
      )}

      {/* ── Radial vignette ── */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 75% at 50% 50%, rgba(248, 250, 252, 0.92) 0%, rgba(248, 250, 252, 0.65) 60%, rgba(248, 250, 252, 0.2) 100%)',
        }}
      />

      {/* ── Ambient background orbs (Static on mobile, animated on desktop) ── */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-[8%] right-[8%] w-72 md:w-100 h-72 md:h-100 bg-indigo-500/15 rounded-full filter blur-[60px] md:blur-[100px] ${
            !isMobile && !prefersReducedMotion ? 'animate-blob' : ''
          }`}
        />
        <div
          className={`absolute bottom-[10%] left-[5%] w-72 md:w-100 h-72 md:h-100 bg-cyan-400/15 rounded-full filter blur-[60px] md:blur-[100px] ${
            !isMobile && !prefersReducedMotion ? 'animate-blob animation-delay-2000' : ''
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-125 h-80 md:h-125 bg-purple-500/10 rounded-full filter blur-[70px] md:blur-[120px] ${
            !isMobile && !prefersReducedMotion ? 'animate-blob animation-delay-4000' : ''
          }`}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        className="container max-w-5xl mx-auto px-4 py-8 relative z-10"
        style={!isMobile && !prefersReducedMotion ? { y: contentY, opacity: contentOpacity, scale: contentScale } : undefined}
      >
        <div className="flex justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-6 max-w-2xl text-center items-center"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-black/6 shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-slate-700 tracking-wide">Available for work</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
                <span className="text-gradient">Hi, I'm Jit Maiti</span>
              </h1>
              <div className="flex justify-center pt-2">
                <div className="h-1 w-24 rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-70" />
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              variants={itemVariants}
              className="text-base sm:text-xl lg:text-2xl text-slate-700 font-medium px-2"
            >
              <TypingEffect
                text="Full-Stack Developer crafting beautiful digital experiences"
                speed={30}
              />
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-lg px-2">
                I specialize in building robust backend architectures and sleek frontend experiences across mobile, web, and cross-platform applications. Let's create something extraordinary together.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center w-full sm:w-auto px-4">
              {isMobile ? (
                <>
                  <a
                    href="#projects"
                    className="flex items-center justify-center gap-2 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-md shadow-indigo-500/25 active:scale-98 transition-transform"
                  >
                    <Sparkles className="w-4 h-4" />
                    View My Work
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-2 bg-white border border-black/10 px-7 py-3.5 rounded-xl font-semibold text-slate-800 text-base shadow-xs active:scale-98 transition-transform"
                  >
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </a>
                </>
              ) : (
                <>
                  <DesktopMagneticButton
                    href="#projects"
                    className="group flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-size-[200%_100%] hover:bg-right text-white px-8 py-4 rounded-xl font-semibold transition-all duration-500 shadow-lg shadow-indigo-500/25 hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]"
                  >
                    <Sparkles className="w-4 h-4" />
                    View My Work
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </DesktopMagneticButton>

                  <DesktopMagneticButton
                    href="#contact"
                    className="bg-white/85 backdrop-blur-xl border border-black/8 px-8 py-4 rounded-xl font-semibold text-slate-700 hover:text-slate-950 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white shadow-xs hover:border-indigo-400/40"
                  >
                    <Mail className="w-5 h-5" />
                    Get in Touch
                  </DesktopMagneticButton>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
        <div className="w-5 h-9 border-2 border-slate-400/40 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-indigo-500 rounded-full mt-1.5"
          />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-slate-50 to-transparent z-3 pointer-events-none" />
    </section>
  );
}
