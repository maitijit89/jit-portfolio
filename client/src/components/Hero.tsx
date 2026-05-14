import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { TypingEffect } from './TypingEffect';
import { GlassmorphicCard } from './GlassmorphicCard';
import { ArrowRight, Github, Mail } from 'lucide-react';

/**
 * Design System: Liquid Glass Futurism
 * Hero Section - Asymmetric layout with 3D canvas
 * - 3D canvas occupies 60% of viewport (right side)
 * - Text content floats on left with glassmorphic cards
 * - Dynamic typing effect and CTAs
 * - Mobile-responsive with staggered animations
 */

// Lazy load 3D canvas for performance
const Canvas3D = lazy(() => import('./Canvas3D').then(m => ({ default: m.Canvas3D })));

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-16">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-6 z-10"
          >
            {/* Greeting */}
            <motion.div variants={itemVariants}>
              <p className="text-sm font-medium text-cyan-600 uppercase tracking-widest">
                Welcome to my portfolio
              </p>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient">Hi, I'm Jit Maiti</span>
              </h1>
            </motion.div>

            {/* Subtitle with Typing Effect */}
            <motion.div variants={itemVariants} className="text-xl lg:text-2xl text-slate-600">
              <span className="font-medium">
                <TypingEffect
                  text="Full-Stack Developer crafting beautiful digital experiences"
                  speed={40}
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                I specialize in building robust backend architectures and sleek frontend experiences across mobile, web, and cross-platform applications. Let's create something extraordinary together.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-semibold text-slate-700 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 hover:border-indigo-300"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              <motion.a
                href="https://github.com/jitmaiti89"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-slate-700 hover:text-indigo-600 transition-colors"
              >
                <Github className="w-6 h-6" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-96 lg:h-full min-h-96 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-slate-400">Loading 3D canvas...</div>
              </div>
            }>
              <Canvas3D />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-slate-400 rounded-full mt-2"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
}
