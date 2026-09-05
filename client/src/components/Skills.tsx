import { motion, useReducedMotion, useScroll, useTransform, useInView } from 'framer-motion';
import { GlassmorphicCard } from './GlassmorphicCard';
import { useRef, useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useMobile';

/**
 * Design System: iOS Liquid Glass
 * Skills Section — Light theme with iOS frosted pills
 * - Category cards with gradient left-border accent
 * - Skill pills with hover illumination
 * - 60fps mobile performance with instant responsiveness
 */

interface SkillCategory {
  title: string;
  skills: string[];
  gradient: string;
  glowColor: 'indigo' | 'cyan' | 'purple' | 'pink' | 'emerald' | 'amber';
  pillHoverBg: string;
  pillHoverText: string;
  pillHoverShadow: string;
}

function AnimatedSkillCount({ count }: { count: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = () => {
      current++;
      setDisplayCount(current);
      if (current < count) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, count]);

  return <span ref={ref}>{displayCount} skills</span>;
}

export function Skills() {
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

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend & Mobile',
      skills: ['React', 'React Native', 'Next.js', 'Angular', 'Flutter', 'TypeScript', 'Tailwind CSS'],
      gradient: 'from-cyan-500 to-blue-600',
      glowColor: 'cyan',
      pillHoverBg: 'rgba(6, 182, 212, 0.12)',
      pillHoverText: '#0891b2',
      pillHoverShadow: '0 4px 14px rgba(6, 182, 212, 0.18)',
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Golang', 'Java (Springboot)', 'Python', 'PHP', 'Express', 'NestJS'],
      gradient: 'from-purple-500 to-indigo-600',
      glowColor: 'purple',
      pillHoverBg: 'rgba(168, 85, 247, 0.12)',
      pillHoverText: '#9333ea',
      pillHoverShadow: '0 4px 14px rgba(168, 85, 247, 0.18)',
    },
    {
      title: 'Databases',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Firebase', 'Supabase'],
      gradient: 'from-pink-500 to-purple-600',
      glowColor: 'pink',
      pillHoverBg: 'rgba(236, 72, 153, 0.12)',
      pillHoverText: '#db2777',
      pillHoverShadow: '0 4px 14px rgba(236, 72, 153, 0.18)',
    },
    {
      title: 'Cloud & DevOps',
      skills: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Git'],
      gradient: 'from-amber-500 to-orange-600',
      glowColor: 'amber',
      pillHoverBg: 'rgba(245, 158, 11, 0.12)',
      pillHoverText: '#d97706',
      pillHoverShadow: '0 4px 14px rgba(245, 158, 11, 0.18)',
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 0.4 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
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
      transition: { duration: isMobile ? 0.4 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section id="skills" ref={sectionRef} className="relative py-14 md:py-20 lg:py-28 bg-slate-50 overflow-hidden transition-colors duration-300">
      {/* Background ambient orbs */}
      <div
        style={disableParallax ? undefined : { transform: `translateY(${bgY}px)` }}
        className="absolute top-1/3 left-0 w-72 md:w-125 h-72 md:h-125 bg-indigo-500/6 rounded-full filter blur-[60px] md:blur-[120px] pointer-events-none"
      />
      <div
        style={disableParallax ? undefined : { transform: `translateY(${bgY}px)` }}
        className="absolute bottom-10 right-0 w-72 md:w-md h-72 md:h-112 bg-purple-500/6 rounded-full filter blur-[60px] md:blur-[120px] pointer-events-none"
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
            Capabilities
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Skills &amp;{' '}
            <span className="text-gradient-static">Technologies</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical toolkit honed across production projects,
            mobile applications, and scalable backend architectures.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.title} variants={cardVariants}>
              <GlassmorphicCard delay={0} glowColor={category.glowColor} tilt={!isMobile}>
                <div className="p-5 sm:p-6 md:p-8 relative">
                  {/* Accent left line */}
                  <div
                    className={`absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-linear-to-b ${category.gradient}`}
                  />

                  {/* Category Title */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`w-3 h-3 rounded-full bg-linear-to-br ${category.gradient} shadow-xs`}
                    />
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                      {category.title}
                    </h3>
                    <span className="ml-auto text-xs font-medium text-slate-400 bg-slate-900/3 px-2.5 py-1 rounded-lg border border-black/4">
                      <AnimatedSkillCount count={category.skills.length} />
                    </span>
                  </div>

                  {/* Skills as pills */}
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white/90 rounded-xl border border-black/6 shadow-xs select-none transition-colors duration-150 hover:bg-indigo-50/60 hover:text-indigo-700 hover:border-indigo-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="mt-10 md:mt-16 text-center"
        >
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            I'm constantly learning and exploring new technologies. Always open to new challenges and opportunities to expand my skillset.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
