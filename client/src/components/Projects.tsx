import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from './GlassmorphicCard';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';

/**
 * Design System: Liquid Glass Futurism
 * Projects Section - GitHub API integration + featured projects
 * - Fetches repositories from GitHub API
 * - Displays stars, forks, and links
 * - Featured projects with custom descriptions
 * - Glassmorphic cards with hover effects
 */

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

interface FeaturedProject {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  featured: boolean;
}

export function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/jitmaiti89/repos?sort=stars&per_page=6');
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        setRepos(data.filter((repo: GitHubRepo) => !repo.description?.includes('archived')));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
        console.error('Error fetching repos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

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
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

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
            Portfolio
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Featured Projects & Work
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore my latest projects showcasing full-stack development, innovative problem-solving, and creative implementation.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {featuredProjects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassmorphicCard delay={index * 0.1}>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 flex-1">
                      {project.title}
                    </h3>
                    <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full whitespace-nowrap ml-4">
                      Featured
                    </span>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href={project.link}
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-cyan-600 transition-colors"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub Projects */}
        <div className="mb-8">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-slate-900 mb-6"
          >
            Recent GitHub Projects
          </motion.h3>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-48 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center text-slate-600">
              <p>{error}</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {repos.map((repo, index) => (
                <motion.div key={repo.id} variants={itemVariants}>
                  <GlassmorphicCard delay={index * 0.05}>
                    <div className="p-6 h-full flex flex-col">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 mb-3 hover:text-indigo-600 transition-colors group"
                      >
                        <Github className="w-5 h-5 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <h4 className="font-bold text-slate-900 text-lg break-words flex-1">
                          {repo.name}
                        </h4>
                      </a>

                      <p className="text-slate-600 text-sm mb-4 flex-grow">
                        {repo.description || 'No description available'}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.language && (
                          <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded">
                            {repo.language}
                          </span>
                        )}
                        {repo.topics?.slice(0, 2).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-600 pt-4 border-t border-slate-200">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {repo.stargazers_count}
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="w-4 h-4" />
                            {repo.forks_count}
                          </div>
                        </div>
                        <motion.a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          className="text-indigo-600 hover:text-cyan-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                  </GlassmorphicCard>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* View All Projects Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/jitmaiti89"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
