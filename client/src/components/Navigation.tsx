import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/**
 * Design System: Liquid Glass Futurism
 * Navigation Component - Sticky header with smooth scrolling
 * - Mobile-responsive with animated hamburger menu
 * - Glassmorphic design with scroll-aware background
 * - Smooth scroll to sections
 * - Reduced-motion friendly
 */

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        when: 'beforeChildren',
        staggerChildren: 0.06,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -16 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm'
          : 'bg-white/80 backdrop-blur-md border-b border-white/20'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-bold text-gradient cursor-pointer"
        >
          JM
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
              whileHover={{ color: '#6366f1', y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-600 font-medium transition-colors hover:text-indigo-600 relative"
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-slate-700" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6 text-slate-700" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200/50 overflow-hidden"
          >
            <div className="container max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  variants={menuItemVariants}
                  onClick={() => handleNavClick(item.href)}
                  whileTap={{ scale: 0.97, backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                  className="text-left text-slate-600 font-medium hover:text-indigo-600 transition-colors py-3 px-3 rounded-lg hover:bg-indigo-50/50"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
