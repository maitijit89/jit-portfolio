import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/**
 * Design System: Liquid Glass Futurism
 * Navigation Component - Sticky header with smooth scrolling
 * - Mobile-responsive with hamburger menu
 * - Glassmorphic design
 * - Smooth scroll to sections
 */

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20"
    >
      <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-gradient cursor-pointer"
        >
          JM
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              whileHover={{ color: '#6366f1' }}
              className="text-slate-600 font-medium transition-colors hover:text-indigo-600"
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-slate-700" />
          ) : (
            <Menu className="w-6 h-6 text-slate-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white/95 backdrop-blur-md border-b border-white/20"
        >
          <div className="container max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                whileHover={{ x: 5 }}
                className="text-left text-slate-600 font-medium hover:text-indigo-600 transition-colors py-2"
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
