import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/useMobile';

/**
 * Design System: iOS Liquid Glass
 * Navigation — Frosted glass sticky header with liquid pill styling
 * - Active section tracking with animated pill background
 * - Mobile: iOS frosted glass overlay with staggered slide-in
 * - Hide-on-scroll-down / show-on-scroll-up
 * - Pure native anchor links for 100% accurate, smooth scrolling
 */

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [navVisible, setNavVisible] = useState(true);
  const prevScrollY = useRef(0);
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();

  // Scroll direction tracking
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isScrolled = latest > 20;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }

    if (!isOpen) {
      const diff = latest - prevScrollY.current;
      if (diff > 12 && latest > 120) {
        setNavVisible(false);
      } else if (diff < -8) {
        setNavVisible(true);
      }
    }
    prevScrollY.current = latest;
  });

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -60% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Show nav whenever mobile menu is open
  useEffect(() => {
    if (isOpen) setNavVisible(true);
  }, [isOpen]);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleMobileClick = () => {
    setIsOpen(false);
    setNavVisible(true);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut' as any,
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.2,
        ease: 'easeInOut' as any,
        when: 'beforeChildren',
        staggerChildren: 0.04,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.15, ease: 'easeOut' as any },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: navVisible ? 0 : -100,
        opacity: navVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-black/6 shadow-xs'
          : 'bg-transparent backdrop-blur-xs border-b border-transparent'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-bold text-gradient cursor-pointer select-none tracking-tight"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setNavVisible(true);
          }}
        >
          JM
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900/3 p-1.5 rounded-2xl border border-black/4 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                    isActive
                      ? 'text-indigo-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {item.label}
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white rounded-xl -z-10 shadow-xs border border-black/4"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  {/* Gradient underline for active */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
          
          {/* Hire Me CTA */}
          <a
            href="#contact"
            className="relative overflow-hidden flex items-center gap-1.5 px-5 py-2 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-size-[200%_100%] hover:bg-right text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Hire Me
          </a>
        </div>

        {/* Mobile: Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            className="p-2.5 rounded-xl bg-white border border-black/8 text-slate-700 shadow-xs active:scale-92 transition-transform cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-white/98 backdrop-blur-xl border-b border-black/8 shadow-lg overflow-hidden"
          >
            <div className="container max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.div key={item.label} variants={menuItemVariants}>
                    <a
                      href={item.href}
                      onClick={handleMobileClick}
                      className={`block font-medium transition-colors py-3 px-4 rounded-xl text-base ${
                        isActive
                          ? 'text-indigo-600 bg-indigo-500/10 font-semibold'
                          : 'text-slate-700 hover:text-slate-950 active:bg-slate-900/5'
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.div>
                );
              })}

              {/* Mobile Hire Me CTA */}
              <motion.div variants={menuItemVariants}>
                <a
                  href="#contact"
                  onClick={handleMobileClick}
                  className="mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white font-semibold shadow-md shadow-indigo-500/20 text-base active:scale-98 transition-transform"
                >
                  <Sparkles className="w-4 h-4" />
                  Hire Me
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
