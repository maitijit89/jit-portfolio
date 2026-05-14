import { motion } from 'framer-motion';
import { GlassmorphicCard } from './GlassmorphicCard';
import { Code2, Zap, Target } from 'lucide-react';

/**
 * Design System: Liquid Glass Futurism
 * About Section - Dual expertise showcase
 * - Highlights backend and frontend capabilities
 * - Glassmorphic cards with icons
 * - Staggered entrance animations
 */

export function About() {
  const features = [
    {
      icon: Code2,
      title: 'Backend Expertise',
      description: 'Robust architectures with Node.js, Golang, Java, and Python. Database design, API development, and cloud deployment.',
    },
    {
      icon: Zap,
      title: 'Frontend Mastery',
      description: 'Sleek mobile and web experiences with React, Next.js, Angular, and Flutter. Responsive, performant, and delightful UIs.',
    },
    {
      icon: Target,
      title: 'Full-Stack Solutions',
      description: 'End-to-end project delivery from concept to deployment. Startup projects, client work, and innovative personal ventures.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-20 lg:py-32 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

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
            About Me
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Dual Expertise in Full-Stack Development
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            With experience spanning startups, client projects, and personal ventures, I bring a unique blend of technical depth and creative problem-solving to every project.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <GlassmorphicCard delay={index * 0.1}>
                  <div className="p-8">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { label: 'Projects', value: '50+' },
            { label: 'Clients', value: '20+' },
            { label: 'Years Experience', value: '5+' },
            { label: 'Technologies', value: '20+' },
          ].map((stat, index) => (
            <GlassmorphicCard key={index} delay={0.4 + index * 0.05}>
              <div className="p-6 text-center">
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </GlassmorphicCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
