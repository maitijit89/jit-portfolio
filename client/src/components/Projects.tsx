import { motion, useReducedMotion } from "framer-motion";
import { GlassmorphicCard } from "./GlassmorphicCard";
import { ExternalLink, Sparkles } from "lucide-react";

/**
 * Design System: Liquid Glass Futurism
 * Projects Section — Dark showcase with gradient top-borders
 * - Cards with colored gradient top-border accent
 * - Featured badge with shimmer animation
 * - Tech badges with subtle colored backgrounds
 * - Numbered project indicators
 * - Hover: colored glow shadow
 */

interface FeaturedProject {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  accent: string;
  accentGlow: string;
  glowColor: "indigo" | "cyan" | "purple" | "pink" | "emerald" | "amber";
}

export function Projects() {
  const prefersReducedMotion = useReducedMotion();

  const featuredProjects: FeaturedProject[] = [
    {
      title: "eDoc Hub",
      description:
        "A comprehensive e-healthcare platform connecting patients with healthcare providers. Features appointment booking, medical records management, and telemedicine capabilities.",
      technologies: ["React", "Node.js", "MongoDB", "WebRTC"],
      link: "https://github.com/maitijit89",
      accent: "from-cyan-400 to-blue-500",
      accentGlow: "rgba(34, 211, 238, 0.15)",
      glowColor: "cyan",
    },
    {
      title: "B Map",
      description:
        "A geospatial mapping application with real-time location tracking, route optimization, and collaborative mapping features.",
      technologies: ["React", "Golang", "PostgreSQL", "Google Maps API"],
      link: "https://github.com/maitijit89",
      accent: "from-purple-400 to-indigo-500",
      accentGlow: "rgba(192, 132, 252, 0.15)",
      glowColor: "purple",
    },
    {
      title: "Sdev Ai LLM",
      description:
        "An advanced AI-powered platform leveraging Large Language Models to assist developers in code generation, debugging, and architectural planning.",
      technologies: ["Python", "LLM", "React", "FastAPI"],
      link: "https://github.com/maitijit89",
      accent: "from-emerald-400 to-teal-500",
      accentGlow: "rgba(52, 211, 153, 0.15)",
      glowColor: "emerald",
    },
    {
      title: "JM Android Custom OS",
      description:
        "A highly optimized, privacy-focused custom Android operating system with enhanced performance kernels and a bespoke user interface.",
      technologies: ["Android NDK", "C++", "Java", "Shell Scripting"],
      link: "https://github.com/maitijit89",
      accent: "from-amber-400 to-orange-500",
      accentGlow: "rgba(251, 191, 36, 0.15)",
      glowColor: "amber",
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
    <section className="relative py-16 md:py-20 lg:py-32 bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/6 rounded-full filter blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/6 rounded-full filter blur-[120px]" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-medium text-purple-400 uppercase tracking-widest mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Featured{" "}
            <span className="text-gradient-static">Projects & Work</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Explore my latest projects showcasing full-stack development,
            innovative problem-solving, and creative implementation.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        >
          {featuredProjects.map((project, index) => (
            <motion.div key={index} variants={cardVariants}>
              <GlassmorphicCard delay={0} glowColor={project.glowColor}>
                <div className="relative overflow-hidden rounded-2xl">
                  {/* Gradient top-border accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${project.accent}`}
                  />

                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      {/* Project number + title */}
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-xs font-mono text-slate-600 bg-white/[0.04] px-2 py-1 rounded-md border border-white/[0.06]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {project.title}
                        </h3>
                      </div>

                      {/* Featured badge with shimmer */}
                      <div className="relative overflow-hidden px-3 py-1 rounded-full ml-4 flex-shrink-0">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${project.accent} opacity-20`}
                        />
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
                        </div>
                        <div className="relative flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-white/70" />
                          <span className="text-xs font-semibold text-white/80">
                            Featured
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-400 mb-6 leading-relaxed text-sm md:text-base">
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
                          whileHover={{
                            scale: 1.08,
                            transition: { duration: 0.15 },
                          }}
                          className="px-3 py-1 text-xs font-medium bg-white/[0.06] text-slate-300 rounded-full border border-white/[0.06]"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.a
                      href={project.link}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 text-indigo-400 font-semibold transition-colors hover:text-indigo-300 text-sm"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
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
