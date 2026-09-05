import { useState, useMemo } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { GlassmorphicCard } from "./GlassmorphicCard";
import { Mail, Instagram, MessageCircle, Send, Linkedin, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/useMobile";

/**
 * Design System: iOS Liquid Glass
 * Contact Section — Light theme with iOS frosted form & cards
 * - Floating label inputs
 * - Form progress indicator
 * - 60fps mobile responsiveness
 */

export function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const disableParallax = prefersReducedMotion || isMobile;

  // Section parallax (desktop only)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form completion progress (0-100)
  const formProgress = useMemo(() => {
    let filled = 0;
    if (formData.name.trim().length > 0) filled++;
    if (formData.email.trim().length > 0) filled++;
    if (formData.message.trim().length > 0) filled++;
    return Math.round((filled / 3) * 100);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/debjit-maiti-307269347?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      hoverBg: "hover:bg-blue-600/[0.08]",
      hoverBorder: "hover:border-blue-600/30",
      hoverText: "hover:text-blue-600",
    },
    {
      icon: Mail,
      label: "Email",
      url: "mailto:maitidebjit2@gmail.com",
      hoverBg: "hover:bg-red-500/[0.08]",
      hoverBorder: "hover:border-red-500/30",
      hoverText: "hover:text-red-600",
    },
    {
      icon: Instagram,
      label: "Instagram",
      url: "https://www.instagram.com/jit.kumar.207?igsh=Y2w3djNjODloZTN1",
      hoverBg: "hover:bg-pink-500/[0.08]",
      hoverBorder: "hover:border-pink-500/30",
      hoverText: "hover:text-pink-600",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      url: "https://wa.me/919475603215",
      hoverBg: "hover:bg-green-500/[0.08]",
      hoverBorder: "hover:border-green-500/30",
      hoverText: "hover:text-green-600",
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

  const itemVariants = {
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

  const inputClasses = `
    w-full px-4 sm:px-5 py-3.5 sm:py-4 pt-6
    bg-white/90
    border border-black/8
    rounded-xl
    text-slate-900 text-sm sm:text-base
    placeholder:text-transparent
    shadow-xs
    hover:border-indigo-400/30 hover:bg-white
    focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60
    focus:bg-white
    transition-all duration-200
    disabled:opacity-50
    peer
  `;

  const floatingLabelClasses = `
    absolute left-4 sm:left-5 top-1/2 -translate-y-1/2
    text-xs sm:text-sm text-slate-400 pointer-events-none
    transition-all duration-200 ease-out
    peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-2xs sm:peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:font-semibold
  `;

  return (
    <section id="contact" ref={sectionRef} className="relative py-14 md:py-20 lg:py-28 bg-slate-100/50 overflow-hidden transition-colors duration-300">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div
        style={disableParallax ? undefined : { transform: `translateY(${bgY}px)` }}
        className="absolute top-0 left-0 w-72 md:w-125 h-72 md:h-125 bg-cyan-500/8 rounded-full filter blur-[60px] md:blur-[120px] pointer-events-none"
      />
      <div
        style={disableParallax ? undefined : { transform: `translateY(${bgY}px)` }}
        className="absolute bottom-0 right-0 w-72 md:w-125 h-72 md:h-125 bg-purple-500/8 rounded-full filter blur-[60px] md:blur-[120px] pointer-events-none"
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-xs sm:text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-2 sm:mb-3">
            Get In Touch
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Let's <span className="text-gradient-static">Work Together</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you. Reach out through the form below or connect on social
            media.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start"
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <GlassmorphicCard delay={0} glowColor="indigo" tilt={!isMobile}>
              <div className="relative overflow-hidden rounded-2xl">
                {/* Gradient top-border */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500" />

                {/* Form Progress Bar */}
                <div className="absolute top-0.5 left-0 right-0">
                  <div className="form-progress">
                    <div
                      className="form-progress-bar"
                      style={{ width: `${formProgress}%` }}
                    />
                  </div>
                </div>

                <div className="p-5 sm:p-6 md:p-8">
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                      Send me a message
                    </h3>
                    {formProgress === 100 && (
                      <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Ready
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Name Input */}
                    <div className="floating-label-group relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={inputClasses}
                        placeholder="Your Name"
                      />
                      <label
                        htmlFor="name"
                        className={`${floatingLabelClasses} ${formData.name ? 'top-2.5 translate-y-0 text-2xs sm:text-xs text-indigo-600 font-semibold' : ''}`}
                      >
                        Your Name
                      </label>
                    </div>

                    {/* Email Input */}
                    <div className="floating-label-group relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={inputClasses}
                        placeholder="Email Address"
                      />
                      <label
                        htmlFor="email"
                        className={`${floatingLabelClasses} ${formData.email ? 'top-2.5 translate-y-0 text-2xs sm:text-xs text-indigo-600 font-semibold' : ''}`}
                      >
                        Email Address
                      </label>
                    </div>

                    {/* Message Textarea */}
                    <div className="floating-label-group relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        rows={4}
                        className={`${inputClasses} resize-none pt-7!`}
                        placeholder="Message"
                      ></textarea>
                      <label
                        htmlFor="message"
                        className={`absolute left-4 sm:left-5 top-3.5 text-xs sm:text-sm text-slate-400 pointer-events-none transition-all duration-200 ease-out peer-focus:top-2 peer-focus:text-2xs sm:peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:font-semibold ${formData.message ? 'top-2 text-2xs sm:text-xs text-indigo-600 font-semibold' : ''}`}
                      >
                        Message
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3.5 sm:py-4 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-xl active:scale-98 transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20 text-sm sm:text-base cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Sent Successfully!
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
            {/* Direct Contact */}
            <GlassmorphicCard delay={0} glowColor="purple" tilt={!isMobile}>
              <div className="p-5 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
                  Direct Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 shrink-0">
                      <Mail className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">Email</p>
                      <a
                        href="mailto:maitidebjit2@gmail.com"
                        className="text-slate-900 font-semibold hover:text-indigo-600 transition-colors text-sm sm:text-base truncate block"
                      >
                        maitidebjit2@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>

            {/* Social Links */}
            <GlassmorphicCard delay={0} glowColor="cyan" tilt={!isMobile}>
              <div className="p-5 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 p-3 sm:p-4 bg-white/90 border border-black/6 rounded-xl shadow-2xs active:scale-97 transition-transform text-slate-700 ${social.hoverBg} ${social.hoverBorder} ${social.hoverText}`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold truncate">
                          {social.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </GlassmorphicCard>

            {/* Availability */}
            <GlassmorphicCard delay={0} glowColor="emerald" tilt={false}>
              <div className="p-5 sm:p-6 md:p-8">
                <div className="flex items-start gap-3">
                  <div className="relative mt-1 shrink-0">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Availability</p>
                    <p className="text-slate-900 font-semibold text-xs sm:text-sm">
                      Available for freelance & full-time opportunities
                    </p>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
