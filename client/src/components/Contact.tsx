import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GlassmorphicCard } from "./GlassmorphicCard";
import { Mail, Instagram, MessageCircle, Send, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";


/**
 * Design System: Liquid Glass Futurism
 * Contact Section — Dark glass form with glowing inputs
 * - Animated gradient border on form card
 * - Dark glass input fields with colored focus rings
 * - Social links with brand-color glow on hover
 * - Availability badge with green glow pulse
 */

export function Contact() {
  const prefersReducedMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
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
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
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
      hoverBorder: "hover:border-blue-600/20",
      hoverText: "hover:text-blue-400",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(37,99,235,0.15)]",
    },
    {
      icon: Mail,
      label: "Email",
      url: "mailto:maitidebjit2@gmail.com",
      hoverBg: "hover:bg-red-500/[0.08]",
      hoverBorder: "hover:border-red-500/20",
      hoverText: "hover:text-red-400",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]",
    },
    {
      icon: Instagram,
      label: "Instagram",
      url: "https://www.instagram.com/jit.kumar.207?igsh=Y2w3djNjODloZTN1",
      hoverBg: "hover:bg-pink-500/[0.08]",
      hoverBorder: "hover:border-pink-500/20",
      hoverText: "hover:text-pink-400",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      url: "https://wa.me/919475603215",
      hoverBg: "hover:bg-green-500/[0.08]",
      hoverBorder: "hover:border-green-500/20",
      hoverText: "hover:text-green-400",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]",
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
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const formFieldVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const inputClasses = `
    w-full px-4 py-3.5
    bg-white/[0.03] border border-white/[0.08] rounded-xl
    text-white placeholder:text-slate-600
    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30
    focus:bg-white/[0.05]
    transition-all duration-300
    disabled:opacity-50
  `;

  return (
    <section className="relative py-16 md:py-20 lg:py-32 bg-slate-950/50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-600/6 rounded-full filter blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/6 rounded-full filter blur-[120px]" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-medium text-emerald-400 uppercase tracking-widest mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Let's <span className="text-gradient-static">Work Together</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you. Reach out through the form below or connect on social
            media.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start"
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <GlassmorphicCard delay={0} glowColor="indigo">
              <div className="relative overflow-hidden rounded-2xl">
                {/* Gradient top-border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                    Send me a message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Input */}
                    <motion.div
                      custom={0}
                      variants={formFieldVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-400 mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={inputClasses}
                        placeholder="John Doe"
                      />
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                      custom={1}
                      variants={formFieldVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-400 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={inputClasses}
                        placeholder="john@example.com"
                      />
                    </motion.div>

                    {/* Message Textarea */}
                    <motion.div
                      custom={2}
                      variants={formFieldVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-400 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        rows={5}
                        className={`${inputClasses} resize-none`}
                        placeholder="Tell me about your project..."
                      ></textarea>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 35px rgba(129, 140, 248, 0.3)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] hover:bg-right text-white font-semibold rounded-xl transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/15"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Direct Contact */}
            <GlassmorphicCard delay={0} glowColor="purple">
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                      <Mail className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <a
                        href="mailto:maitidebjit2@gmail.com"
                        className="text-white font-semibold hover:text-indigo-400 transition-colors"
                      >
                        maitidebjit2@gmail.com
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </GlassmorphicCard>

            {/* Social Links */}
            <GlassmorphicCard delay={0} glowColor="cyan">
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Connect With Me
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center justify-center gap-2 p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl transition-all duration-300 text-slate-400 ${social.hoverBg} ${social.hoverBorder} ${social.hoverText} ${social.hoverShadow}`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-semibold">
                          {social.label}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </GlassmorphicCard>

            {/* Availability */}
            <GlassmorphicCard delay={0} glowColor="emerald">
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-3">
                  <div className="relative mt-1">
                    <motion.div
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full"
                    />
                    <div className="relative w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Availability</p>
                    <p className="text-white font-semibold">
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
