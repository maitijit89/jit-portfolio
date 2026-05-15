import { motion, useReducedMotion } from 'framer-motion';
import { GlassmorphicCard } from './GlassmorphicCard';

/**
 * Design System: Liquid Glass Futurism
 * Skills Section - Categorized technology showcase
 * - Staggered card reveals with alternating slide direction
 * - Skill pills with pop-in animation
 * - Responsive grid layout
 * - Reduced-motion friendly
 */

interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
}

export function Skills() {
  const prefersReducedMotion = useReducedMotion();

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend & Mobile',
      skills: ['React', 'React Native', 'Next.js', 'Angular', 'Flutter', 'TypeScript', 'Tailwind CSS'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Golang', 'Java (Springboot)', 'Python', 'PHP', 'Express', 'NestJS'],
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Databases',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Firebase', 'Supabase'],
      color: 'from-pink-500 to-purple-500',
    },
    {
      title: 'Cloud & DevOps',
      skills: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Git'],
      color: 'from-orange-500 to-red-500',
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
    <section className="relative py-16 md:py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-medium text-cyan-600 uppercase tracking-widest mb-4">
            Technical Stack
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Skills & Technologies
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
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
              <GlassmorphicCard delay={0}>
                <div className="p-5 md:p-6">
                  {/* Category Title */}
                  <div className="mb-5">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${category.color}`}>
                      {category.title}
                    </div>
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
                          backgroundColor: 'rgba(99, 102, 241, 0.1)',
                          transition: { duration: 0.2 },
                        }}
                        className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100/80 rounded-full border border-slate-200/50 cursor-default transition-colors"
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
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            I'm constantly learning and exploring new technologies. Always open to new challenges and opportunities to expand my skillset.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
