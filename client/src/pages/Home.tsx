import { Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';

/**
 * Design System: Liquid Glass Futurism
 * Home Page - Complete portfolio with all sections
 * - Hero with 3D canvas and typing effect
 * - About, Skills, Projects, and Contact sections
 * - Smooth scrolling and staggered animations
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
        <Hero />
      </Suspense>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400">
            © 2024 Jit Maiti. All rights reserved. Built with React, Three.js, and Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
}
