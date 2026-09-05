import { motion, useReducedMotion, useInView, useScroll, useTransform } from 'framer-motion';
import { GlassmorphicCard } from './GlassmorphicCard';
import { Code2, Zap, Target } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/useMobile';

/**
 * Design System: iOS Liquid Glass
 * About Section — Light theme with iOS frosted cards
 * - Feature cards with gradient icon backgrounds and specular reflections
 * - Stats with counting animation on scroll
 * - 3D tilt on desktop, lightweight 60fps on mobile
 */

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    let rafId: number;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setCount(start);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isInView, value]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export function About() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const disableParallax = prefersReducedMotion || isMobile;

  // Section-level parallax (desktop only)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.08 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 + i * 0.06,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-14 md:py-20 lg:py-28 bg-slate-50 overflow-hidden transition-colors duration-300">
      {/* Background decorations */}
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
      <div
        style={disableParallax ? undefined : { transform: `translateY(${bgY}px)` }}
        className="absolute top-0 right-0 w-72 md:w-125 h-72 md:h-125 bg-cyan-500/10 rounded-full filter blur-[60px] md:blur-[120px] pointer-events-none"
      />
      <div
        style={disableParallax ? undefined : { transform: `translateY(${bgY}px)` }}
        className="absolute bottom-0 left-0 w-72 md:w-125 h-72 md:h-125 bg-purple-500/10 rounded-full filter blur-[60px] md:blur-[120px] pointer-events-none"
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-xs sm:text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2 sm:mb-3">
            About Me
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Dual Expertise in{' '}
            <span className="text-gradient-static">Full-Stack Development</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            With experience spanning startups, client projects, and personal ventures, I bring a unique blend of technical depth and creative problem-solving to every project.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <GlassmorphicCard delay={0} glowColor={feature.glowColor} tilt={!isMobile}>
                  <div className="p-5 sm:p-6 md:p-8">
                    <div className="mb-4 sm:mb-5">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-md`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-sm md:text-base">
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
          viewport={{ once: true, margin: '-30px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 md:gap-6 mt-10 md:mt-16"
        >
          {[
            { label: 'Projects', value: 50, suffix: '+', color: 'from-indigo-500 to-purple-500' },
            { label: 'Clients', value: 20, suffix: '+', color: 'from-cyan-500 to-blue-500' },
            { label: 'Years Experience', value: 5, suffix: '+', color: 'from-purple-500 to-pink-500' },
            { label: 'Technologies', value: 20, suffix: '+', color: 'from-emerald-500 to-teal-500' },
          ].map((stat, index) => (
            <motion.div key={index} custom={index} variants={statVariants}>
              <GlassmorphicCard delay={0} glowColor="none" tilt={false}>
                <div className="p-4 sm:p-5 md:p-6 text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-static mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="w-full h-0.5 rounded-full bg-slate-900/5 mb-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.08, duration: 1.0, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-linear-to-r ${stat.color} opacity-60`}
                    />
                  </div>
                  <div className="text-xs md:text-sm text-slate-500 font-medium tracking-wide">
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
