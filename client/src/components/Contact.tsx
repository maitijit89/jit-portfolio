import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from './GlassmorphicCard';
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Design System: Liquid Glass Futurism
 * Contact Section - Email form + social links
 * - Functional contact form with validation
 * - Social media links
 * - Glassmorphic design with smooth animations
 */

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, this would send to a backend API
      console.log('Form submitted:', formData);

      toast.success('Message sent! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/jitmaiti89',
      color: 'hover:text-slate-900',
    },
    {
      icon: Mail,
      label: 'Email',
      url: 'mailto:jit@example.com',
      color: 'hover:text-red-600',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com',
      color: 'hover:text-blue-600',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      url: 'https://twitter.com',
      color: 'hover:text-cyan-500',
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
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>

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
            Get In Touch
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you. Reach out through the form below or connect on social media.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <GlassmorphicCard>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Send me a message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all resize-none disabled:opacity-50"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
            </GlassmorphicCard>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Direct Contact */}
            <GlassmorphicCard>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Direct Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <a
                        href="mailto:jit@example.com"
                        className="text-slate-900 font-semibold hover:text-indigo-600 transition-colors"
                      >
                        jit@example.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>

            {/* Social Links */}
            <GlassmorphicCard>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center justify-center gap-2 p-4 bg-white/50 border border-slate-200 rounded-lg hover:bg-white transition-all duration-300 ${social.color}`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-semibold">{social.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </GlassmorphicCard>

            {/* Availability */}
            <GlassmorphicCard>
              <div className="p-8">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <p className="text-sm text-slate-600">Availability</p>
                    <p className="text-slate-900 font-semibold">Available for freelance & full-time opportunities</p>
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
