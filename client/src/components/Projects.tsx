import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { GlassmorphicCard } from "./GlassmorphicCard";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/useMobile";

/**
 * Design System: iOS Liquid Glass
 * Projects Section — Authentic GitHub showcase with gradient accents
 * - Synchronized directly with @maitijit89 public repositories
 * - 3D tilt on desktop, fast 60fps card rendering on mobile
 */

interface FeaturedProject {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  accent: string;
  glowColor: "indigo" | "cyan" | "purple" | "pink" | "emerald" | "amber";
}

export function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const disableParallax = prefersReducedMotion || isMobile;

  // Section-level parallax (desktop only)
  const { scrollYProgress } = useScroll({
    target: isMobile ? undefined : sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const featuredProjects: FeaturedProject[] = [
    {
      title: "PBC BCA Event Portal",
      category: "Full-Stack Web App",
      description:
        "An interactive university event management and participant registration portal engineered for the PBC BCA Department. Features automated attendee registration, real-time schedule tracking, and dynamic roster administration.",
      technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Vercel"],
      githubUrl: "https://github.com/maitijit89/PBC-BCA-Dep-Event-Portal",
      liveUrl: "https://pbc-bca-dep-event-portal.vercel.app",
      accent: "from-cyan-500 to-blue-600",
      glowColor: "cyan",
    },
    {
      title: "JM-AI-Agent",
      category: "AI & Autonomous Systems",
      description:
        "An autonomous AI Agent architecture capable of workflow execution, dynamic task decomposition, contextual reasoning, and intelligent tool orchestration utilizing advanced Large Language Model APIs.",
      technologies: ["Python", "AI Agents", "LLM APIs", "Automation", "NLP"],
      githubUrl: "https://github.com/maitijit89/JM-Ai-Agent-",
      accent: "from-purple-500 to-indigo-600",
      glowColor: "purple",
    },
    {
      title: "B-Map Navigation Backend",
      category: "Geospatial & REST API",
      description:
        "High-performance geospatial routing and navigation backend engine built to power a cross-platform Flutter map application. Provides low-latency route calculations, location querying, and secure RESTful endpoints.",
      technologies: ["Python", "FastAPI", "Flutter REST API", "Geospatial", "Backend"],
      githubUrl: "https://github.com/maitijit89/B-Map-Backend",
      accent: "from-emerald-500 to-teal-600",
      glowColor: "emerald",
    },
    {
      title: "JM.-OS Custom Android",
      category: "Mobile OS Architecture",
      description:
        "A customized Android-based operating system build engineered with debloated system components, optimized kernel configurations, and custom shell automation scripts for enhanced hardware control and performance.",
      technologies: ["Android AOSP", "Shell Scripting", "Linux Kernel", "ROM Optimization"],
      githubUrl: "https://github.com/maitijit89/JM.-OS",
      accent: "from-amber-500 to-orange-600",
      glowColor: "amber",
    },
    {
      title: "Debjani Medical Platform",
      category: "Healthcare & Appointment Web",
      description:
        "A modern clinical consultation and doctor portfolio web platform designed for patient appointment inquiries, medical credentials showcase, and responsive clinical information delivery.",
      technologies: ["JavaScript", "React", "HTML5/CSS3", "Responsive UI"],
      githubUrl: "https://github.com/maitijit89/Debjani-web",
      accent: "from-pink-500 to-rose-600",
      glowColor: "pink",
    },
    {
      title: "Gym & Fitness Club Hub",
      category: "Fitness & Club Management",
      description:
        "A responsive gym and fitness club web application featuring interactive training program catalogs, membership tier showcases, trainer profiles, and modern liquid glass visual layouts.",
      technologies: ["TypeScript", "React", "Tailwind CSS", "Framer Motion", "Vite"],
      githubUrl: "https://github.com/maitijit89/gym-website",
      accent: "from-indigo-500 to-violet-600",
      glowColor: "indigo",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 0.35 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.06 : 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: isMobile ? 12 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.35 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="projects" ref={sectionRef} className="relative py-14 md:py-20 lg:py-28 bg-slate-50 overflow-hidden transition-colors duration-300">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      {!isMobile && (
        <>
          <div
            style={disableParallax ? undefined : { transform: `translateY(${bgY}px)` }}
            className="absolute top-0 right-0 w-96 h-96 bg-purple-500/8 rounded-full filter blur-[90px] pointer-events-none"
          />
          <div
            style={disableParallax ? undefined : { transform: `translateY(${bgY}px)` }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/8 rounded-full filter blur-[90px] pointer-events-none"
          />
        </>
      )}

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-xs sm:text-sm font-semibold text-purple-600 uppercase tracking-widest mb-2 sm:mb-3">
            Portfolio
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Featured{" "}
            <span className="text-gradient-static">Projects &amp; Open Source</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A curated selection of real-world projects, production web platforms, AI agents, and
            system architectures directly from my GitHub repository.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8"
        >
          {featuredProjects.map((project, index) => (
            <motion.div key={project.title} variants={cardVariants}>
              <GlassmorphicCard delay={0} glowColor={project.glowColor} tilt={!isMobile}>
                <div className="relative overflow-hidden rounded-2xl h-full flex flex-col">
                  {/* Gradient top-border accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${project.accent}`}
                  />

                  <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-2.5 mb-3.5">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <span className="text-xs font-mono font-medium text-slate-600 bg-slate-900/4 px-2 py-0.5 rounded-lg border border-black/6 shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 truncate">
                            {project.title}
                          </h3>
                          <span className="text-xs font-medium text-slate-500 block truncate">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Featured badge */}
                      <div className="relative overflow-hidden px-2.5 py-0.5 rounded-full shrink-0 border border-black/4">
                        <div
                          className={`absolute inset-0 bg-linear-to-r ${project.accent} opacity-15`}
                        />
                        <div className="relative flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-slate-700" />
                          <span className="text-2xs sm:text-xs font-semibold text-slate-800">
                            Featured
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 mb-5 leading-relaxed text-xs sm:text-sm md:text-base flex-1">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 py-1 text-2xs sm:text-xs font-medium bg-slate-900/4 text-slate-700 rounded-lg border border-black/6 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-3.5 border-t border-black/5">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit live demo for ${project.title}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-linear-to-r from-indigo-600 to-indigo-700 active:scale-97 text-white rounded-xl font-semibold text-xs sm:text-sm transition-transform shadow-sm shadow-indigo-500/20"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source code on GitHub`}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm active:scale-97 transition-transform ${
                          project.liveUrl
                            ? "bg-slate-900/4 active:bg-slate-900/8 text-slate-700 border border-black/6"
                            : "bg-linear-to-r from-indigo-600 to-indigo-700 text-white shadow-sm shadow-indigo-500/20"
                        }`}
                      >
                        <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{project.liveUrl ? "GitHub Repo" : "View on GitHub"}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>

        {/* View all on GitHub CTA */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="mt-10 md:mt-16 text-center"
        >
          <a
            href="https://github.com/maitijit89?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-white border border-black/8 active:scale-97 text-slate-700 font-semibold rounded-xl shadow-xs transition-transform text-xs sm:text-sm"
          >
            <Github className="w-4 h-4 text-slate-700" />
            <span>Explore All Repositories on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
