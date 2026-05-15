import { motion, useReducedMotion } from 'framer-motion';
import { TypingEffect } from './TypingEffect';
import { GlassmorphicCard } from './GlassmorphicCard';
import { ArrowRight, Mail } from 'lucide-react';

/**
 * Design System: Liquid Glass Futurism
 * Hero Section - Centered layout with polished entrance
 * - Cascading fade-slide-in with spring physics
 * - Background blobs with gentle drift
 * - Reduced-motion aware
 * - Mobile-optimized (smaller transforms, no parallax)
 */

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
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
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const blobVariants = {
    animate: (i: number) => ({
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.1, 0.95, 1],
      transition: {
        duration: 18 + i * 4,
        repeat: Infinity,
        ease: 'linear',
      },
    }),
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-16">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          custom={0}
          variants={blobVariants}
          animate="animate"
          className="absolute top-[10%] right-[10%] w-72 md:w-96 h-72 md:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          custom={1}
          variants={blobVariants}
          animate="animate"
          className="absolute bottom-[10%] left-[5%] w-72 md:w-96 h-72 md:h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          custom={2}
          variants={blobVariants}
          animate="animate"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="flex justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-6 z-10 max-w-2xl text-center items-center"
          >
            {/* Greeting */}
            <motion.div variants={itemVariants}>
              <p className="text-sm font-medium text-cyan-600 uppercase tracking-widest">
                Welcome to my portfolio
              </p>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient">Hi, I'm Jit Maiti</span>
              </h1>
            </motion.div>

            {/* Subtitle with Typing Effect */}
            <motion.div variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl text-slate-600">
              <span className="font-medium">
                <TypingEffect
                  text="Full-Stack Developer crafting beautiful digital experiences"
                  speed={40}
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-md">
                I specialize in building robust backend architectures and sleek frontend experiences across mobile, web, and cross-platform applications. Let's create something extraordinary together.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4 justify-center w-full sm:w-auto">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, borderColor: 'rgba(99, 102, 241, 0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-semibold text-slate-700 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 hover:border-indigo-300"
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
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 bg-slate-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
