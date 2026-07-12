import { motion, useReducedMotion } from 'framer-motion';
import { GlassmorphicCard } from './GlassmorphicCard';

/**
 * Design System: Liquid Glass Futurism
 * Skills Section — Dark with neon-glow pills
 * - Category cards with gradient left-border accent
 * - Skill pills illuminate with matching category color on hover
 * - Staggered reveal with alternating slide direction
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

export function Skills() {
  const prefersReducedMotion = useReducedMotion();

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend & Mobile',
      skills: ['React', 'React Native', 'Next.js', 'Angular', 'Flutter', 'TypeScript', 'Tailwind CSS'],
      gradient: 'from-cyan-400 to-blue-500',
      glowColor: 'cyan',
      pillHoverBg: 'rgba(34, 211, 238, 0.12)',
      pillHoverText: 'rgb(34, 211, 238)',
      pillHoverShadow: '0 0 20px rgba(34, 211, 238, 0.2)',
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Golang', 'Java (Springboot)', 'Python', 'PHP', 'Express', 'NestJS'],
      gradient: 'from-purple-400 to-indigo-500',
      glowColor: 'purple',
      pillHoverBg: 'rgba(192, 132, 252, 0.12)',
      pillHoverText: 'rgb(192, 132, 252)',
      pillHoverShadow: '0 0 20px rgba(192, 132, 252, 0.2)',
    },
    {
      title: 'Databases',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Firebase', 'Supabase'],
      gradient: 'from-pink-400 to-purple-500',
      glowColor: 'pink',
      pillHoverBg: 'rgba(244, 114, 182, 0.12)',
      pillHoverText: 'rgb(244, 114, 182)',
      pillHoverShadow: '0 0 20px rgba(244, 114, 182, 0.2)',
    },
    {
      title: 'Cloud & DevOps',
      skills: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Git'],
      gradient: 'from-amber-400 to-orange-500',
      glowColor: 'amber',
      pillHoverBg: 'rgba(251, 191, 36, 0.12)',
      pillHoverText: 'rgb(251, 191, 36)',
      pillHoverShadow: '0 0 20px rgba(251, 191, 36, 0.2)',
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : (i % 2 === 0 ? -30 : 30),
      y: prefersReducedMotion ? 0 : 20,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const skillPillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay,
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <section className="relative py-16 md:py-20 lg:py-32 bg-slate-950/50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/6 rounded-full filter blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/6 rounded-full filter blur-[120px]" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-medium text-cyan-400 uppercase tracking-widest mb-4">
            Technical Stack
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Skills &{' '}
            <span className="text-gradient-static">Technologies</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            A comprehensive toolkit built through years of development across diverse projects and platforms.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div key={categoryIndex} custom={categoryIndex} variants={cardVariants}>
              <GlassmorphicCard delay={0} glowColor={category.glowColor}>
                <div className="p-5 md:p-6">
                  {/* Category Title with gradient accent bar */}
                  <div className="mb-5 flex items-center gap-3">
                    <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${category.gradient}`} />
                    <span className="text-sm font-bold text-white tracking-wide">
                      {category.title}
                    </span>
                  </div>

                  {/* Skills as pills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        custom={categoryIndex * 0.08 + skillIndex * 0.04}
                        variants={skillPillVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{
                          scale: 1.08,
                          backgroundColor: category.pillHoverBg,
                          color: category.pillHoverText,
                          boxShadow: category.pillHoverShadow,
                          transition: { duration: 0.2 },
                        }}
                        className="px-3 py-1.5 text-sm font-medium text-slate-400 bg-white/[0.04] rounded-full border border-white/[0.06] cursor-default transition-all duration-200"
                      >
                        {skill}
                      </motion.span>
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
          viewport={{ once: true, margin: '-40px' }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
            I'm constantly learning and exploring new technologies. Always open to new challenges and opportunities to expand my skillset.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
