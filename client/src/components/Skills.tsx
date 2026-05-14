import { motion } from 'framer-motion';
import { GlassmorphicCard } from './GlassmorphicCard';

/**
 * Design System: Liquid Glass Futurism
 * Skills Section - Categorized technology showcase
 * - Frontend, Backend, Databases, Cloud & DevOps
 * - Glassmorphic cards with staggered animations
 * - Responsive grid layout
 */

interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
}

export function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend & Mobile',
      skills: ['React', 'Next.js', 'Angular', 'Flutter', 'TypeScript', 'Tailwind CSS'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Golang', 'Java (Springboot)', 'Python', 'Express', 'NestJS'],
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-cyan-600 uppercase tracking-widest mb-4">
            Technical Stack
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Skills & Technologies
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A comprehensive toolkit built through years of development across diverse projects and platforms.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div key={categoryIndex} variants={categoryVariants}>
              <GlassmorphicCard delay={categoryIndex * 0.1}>
                <div className="p-6">
                  {/* Category Title */}
                  <div className="mb-6">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${category.color}`}>
                      {category.title}
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}></div>
                        <span className="text-slate-700 font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            I'm constantly learning and exploring new technologies. Always open to new challenges and opportunities to expand my skillset.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
