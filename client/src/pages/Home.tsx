import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { ArrowUp, Github, Mail, Instagram } from 'lucide-react';

/**
 * Design System: Liquid Glass Futurism
 * Home Page — Dark immersive portfolio
 * - Smooth CSS scroll-behavior
 * - Section dividers with gradient accents
 * - Premium footer with social links and back-to-top
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white scroll-smooth">
      <Navigation />

      <Hero />

      <section id="about">
        <About />
      </section>

      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <section id="skills">
        <Skills />
      </section>

      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <section id="projects">
        <Projects />
      </section>

      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <section id="contact">
        <Contact />
      </section>

      {/* ═══ Footer ═══ */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-slate-950 border-t border-white/[0.06] pt-12 pb-8"
      >
        {/* Gradient glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            {/* Logo */}
            <div className="text-2xl font-bold text-gradient select-none">JM</div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: 'https://github.com/jitmaiti89', label: 'GitHub' },
                { icon: Mail, href: 'mailto:maitidebjit2@gmail.com', label: 'Email' },
                { icon: Instagram, href: 'https://www.instagram.com/jit.kumar.207', label: 'Instagram' },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
                  </motion.a>
                );
              })}
            </div>

            {/* Back to top */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 text-sm text-slate-400 hover:text-white"
            >
              <ArrowUp className="w-4 h-4" />
              Back to top
            </motion.button>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-slate-600 text-sm">
              © {new Date().getFullYear()} Jit Maiti. Crafted with passion & precision.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
