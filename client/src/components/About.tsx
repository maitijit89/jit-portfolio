import { motion, useReducedMotion, useInView } from 'framer-motion';
import { GlassmorphicCard } from './GlassmorphicCard';
import { Code2, Zap, Target } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

/**
 * Design System: Liquid Glass Futurism
 * About Section — Dark with gradient mesh + animated counters
 * - Feature cards with gradient icon backgrounds and glow borders
 * - Stats with counting animation on scroll
 * - Dot grid background texture
 */

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setCount(start);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export function About() {
  const prefersReducedMotion = useReducedMotion();

  const features = [
    {
      icon: Code2,
      title: 'Backend Expertise',
      description: 'Robust architectures with Node.js, Golang, Java, Python, and PHP. Database design, API development, and cloud deployment.',
      glowColor: 'purple' as const,
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Zap,
      title: 'Frontend Mastery',
      description: 'Sleek mobile and web experiences with React, React Native, Next.js, Angular, and Flutter. Responsive, performant, and delightful UIs.',
      glowColor: 'cyan' as const,
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Target,
      title: 'Full-Stack Solutions',
      description: 'End-to-end project delivery from concept to deployment. Startup projects, client work, and innovative personal ventures.',
      glowColor: 'emerald' as const,
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <section className="relative py-16 md:py-20 lg:py-32 bg-slate-950 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/8 rounded-full filter blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full filter blur-[120px]" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-medium text-indigo-400 uppercase tracking-widest mb-4">
            About Me
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Dual Expertise in{' '}
            <span className="text-gradient-static">Full-Stack Development</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            With experience spanning startups, client projects, and personal ventures, I bring a unique blend of technical depth and creative problem-solving to every project.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <GlassmorphicCard delay={0} glowColor={feature.glowColor}>
                  <div className="p-6 md:p-8">
                    <div className="mb-5">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                        className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16"
        >
          {[
            { label: 'Projects', value: 50, suffix: '+' },
            { label: 'Clients', value: 20, suffix: '+' },
            { label: 'Years Experience', value: 5, suffix: '+' },
            { label: 'Technologies', value: 20, suffix: '+' },
          ].map((stat, index) => (
            <motion.div key={index} custom={index} variants={statVariants}>
              <GlassmorphicCard delay={0} glowColor="none">
                <div className="p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient-static mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-slate-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
