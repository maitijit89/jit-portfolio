import { motion, useInView } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { ArrowUp, Github, Mail, Instagram, Linkedin } from 'lucide-react';
import { useRef } from 'react';

/**
 * Design System: iOS Liquid Glass
 * Home Page — Seamless Light Theme Portfolio
 * - Smooth CSS scroll-behavior
 * - Animated gradient section dividers
 * - Premium frosted liquid glass footer with social links and back-to-top
 * - Top ScrollProgressBar
 */

/* Animated Divider */
function AnimatedDivider({ color = 'indigo' }: { color?: 'indigo' | 'purple' | 'cyan' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  const colorMap = {
    indigo: 'via-indigo-500/30',
    purple: 'via-purple-500/30',
    cyan: 'via-cyan-500/30',
  };

  return (
    <div ref={ref} className="relative py-1">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`h-px bg-linear-to-r from-transparent ${colorMap[color]} to-transparent origin-center`}
      />
      {/* Glow dot at center */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.6 } : { scale: 0, opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
          color === 'indigo' ? 'bg-indigo-500' : color === 'purple' ? 'bg-purple-500' : 'bg-cyan-500'
        } shadow-[0_0_8px_rgba(99,102,241,0.4)]`}
      />
    </div>
  );
}

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 scroll-smooth selection:bg-indigo-500/20 selection:text-indigo-600 transition-colors duration-300">
      <ScrollProgressBar />
      <Navigation />

      <Hero />

      <About />

      <AnimatedDivider color="indigo" />

      <Skills />

      <AnimatedDivider color="purple" />

      <Projects />

      <AnimatedDivider color="cyan" />

      <Contact />

      {/* ═══ Footer ═══ */}
      <footer className="relative bg-white/80 backdrop-blur-xl border-t border-black/6 pt-14 pb-10 transition-colors duration-300">
        {/* Gradient glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 md:w-1/2 h-px bg-linear-to-r from-transparent via-indigo-500/40 to-transparent" />

        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 mb-8 md:mb-10">
            {/* Logo */}
            <div 
              className="text-2xl font-bold text-gradient select-none tracking-tight cursor-pointer"
              onClick={scrollToTop}
            >
              JM
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {[
                { icon: Github, href: 'https://github.com/maitijit89', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/debjit-maiti-307269347', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:maitidebjit2@gmail.com', label: 'Email' },
                { icon: Instagram, href: 'https://www.instagram.com/jit.kumar.207', label: 'Instagram' },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-xl bg-slate-900/4 border border-black/6 active:scale-95 hover:bg-slate-900/8 hover:border-indigo-400/40 shadow-2xs transition-all duration-200 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                  </a>
                );
              })}
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-slate-900/4 border border-black/6 active:scale-95 hover:bg-slate-900/8 hover:border-indigo-400/40 shadow-2xs transition-all duration-200 text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
              Back to top
            </button>
          </div>

          {/* Gradient divider */}
          <div className="w-full h-px bg-linear-to-r from-transparent via-indigo-500/20 to-transparent mb-6 sm:mb-8" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-slate-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} Jit Maiti. Crafted with{' '}
              <span className="inline-block text-red-500">❤️</span>{' '}
              & precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
