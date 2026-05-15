import { motion, useReducedMotion } from 'framer-motion';
import { GlassmorphicCard } from './GlassmorphicCard';
import { ExternalLink } from 'lucide-react';

/**
 * Design System: Liquid Glass Futurism
 * Projects Section - Featured projects showcase
 * - Cards slide up with stagger
 * - Tech badges pop in
 * - Hover lift with glow
 * - Mobile-optimized layout
 */

interface FeaturedProject {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  featured: boolean;
}

export function Projects() {
  const prefersReducedMotion = useReducedMotion();

  const featuredProjects: FeaturedProject[] = [
    {
      title: 'eDoc Hub',
      description: 'A comprehensive e-healthcare platform connecting patients with healthcare providers. Features appointment booking, medical records management, and telemedicine capabilities.',
      technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
      link: '#',
      featured: true,
    },
    {
      title: 'B Map',
      description: 'A geospatial mapping application with real-time location tracking, route optimization, and collaborative mapping features.',
      technologies: ['React', 'Golang', 'PostgreSQL', 'Google Maps API'],
      link: '#',
      featured: true,
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
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const techBadgeVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.06,
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <section className="relative py-16 md:py-20 lg:py-32 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

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
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Featured Projects & Work
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Explore my latest projects showcasing full-stack development, innovative problem-solving, and creative implementation.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        >
          {featuredProjects.map((project, index) => (
            <motion.div key={index} variants={cardVariants}>
              <GlassmorphicCard delay={0}>
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 flex-1">
                      {project.title}
                    </h3>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full whitespace-nowrap ml-4"
                    >
                      Featured
                    </motion.span>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2 mb-6"
                  >
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        custom={techIndex}
                        variants={techBadgeVariants}
                        whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
                        className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.a
                    href={project.link}
                    whileHover={{ x: 5, color: '#06b6d4' }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 text-indigo-600 font-semibold transition-colors"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
