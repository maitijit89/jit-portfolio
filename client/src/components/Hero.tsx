import { lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TypingEffect } from './TypingEffect';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';

const Canvas3D = lazy(() => import('./Canvas3D').then((mod) => ({ default: mod.Canvas3D })));

/**
 * Design System: Liquid Glass Futurism
 * Hero Section — Immersive dark hero with scroll-reactive 3D background
 * - 3D shapes float at edges, center kept clear for text
 * - Radial dark vignette ensures text readability
 * - Gradient mesh orbs for ambient color
 * - Glassmorphic text backdrop for maximum contrast
 */

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: 'easeOut' as any,
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-16">
      {/* ── 3D Canvas Background ── */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas3D />
        </Suspense>
      </div>

      {/* ── Radial dark vignette — keeps center dark for text readability ── */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(2, 6, 23, 0.85) 0%, rgba(2, 6, 23, 0.4) 60%, rgba(2, 6, 23, 0.1) 100%)',
        }}
      />

      {/* ── Gradient mesh orbs (behind vignette) ── */}
      <div className="absolute inset-0 z-2 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[5%] right-[10%] w-[400px] h-[400px] bg-indigo-600/15 rounded-full filter blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 30, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[5%] left-[5%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full filter blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full filter blur-[120px]"
        />
      </div>

      {/* ── Content ── */}
      <div className="container max-w-7xl mx-auto px-4 py-16 lg:py-20 relative z-10">
        <div className="flex justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-6 max-w-2xl text-center items-center"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span className="text-xs font-medium text-slate-300 tracking-wide">Available for work</span>
              </div>
            </motion.div>

            {/* Main Heading — strong text shadow for contrast */}
            <motion.div variants={itemVariants}>
              <h1
                className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
                style={{ textShadow: '0 2px 30px rgba(0, 0, 0, 0.6)' }}
              >
                <span className="text-gradient">Hi, I'm Jit Maiti</span>
              </h1>
            </motion.div>

            {/* Subtitle with Typing Effect */}
            <motion.div
              variants={itemVariants}
              className="text-lg sm:text-xl lg:text-2xl text-slate-300"
              style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)' }}
            >
              <span className="font-medium">
                <TypingEffect
                  text="Full-Stack Developer crafting beautiful digital experiences"
                  speed={35}
                />
              </span>
            </motion.div>

            {/* Description — glassmorphic backdrop for readability */}
            <motion.div variants={itemVariants}>
              <p
                className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg"
                style={{ textShadow: '0 1px 10px rgba(0, 0, 0, 0.4)' }}
              >
                I specialize in building robust backend architectures and sleek frontend experiences across mobile, web, and cross-platform applications. Let's create something extraordinary together.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4 justify-center w-full sm:w-auto">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(129, 140, 248, 0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] hover:bg-right text-white px-8 py-4 rounded-xl font-semibold transition-all duration-500 shadow-lg shadow-indigo-500/20"
              >
                <Sparkles className="w-4 h-4" />
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, borderColor: 'rgba(129, 140, 248, 0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] px-8 py-4 rounded-xl font-semibold text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/[0.08] hover:border-white/[0.2]"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 bg-indigo-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-3" />
    </section>
  );
}
