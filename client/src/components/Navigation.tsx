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
  const { scrollY } = useScroll();  // Scroll state with threshold check to avoid constant re-renders
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isScrolled = latest > 20;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }

    // Only hide/show on desktop; mobile stays steadily pinned to avoid scroll stutter
    if (!isMobile && !isOpen) {
      const diff = latest - prevScrollY.current;
      if (diff > 16 && latest > 160) {
        setNavVisible(false);
      } else if (diff < -10) {
        setNavVisible(true);
      }
    } else if (isMobile) {
      setNavVisible(true);
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
      { rootMargin: '-20% 0px -55% 0px' }
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
    { label: 'Articles', href: '/articles' },
    { label: 'Contact', href: '#contact' },
  ];

  const getHref = (href: string) => {
    if (typeof window !== 'undefined' && href.startsWith('#') && window.location.pathname !== '/') {
      return `/${href}`;
    }
    return href;
  };

  const handleMobileClick = () => {
    setIsOpen(false);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut' as any,
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1] as any,
        staggerChildren: 0.05,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -8 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: 'easeOut' as any },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: (!isMobile && !navVisible) ? -100 : 0,
        opacity: (!isMobile && !navVisible) ? 0 : 1,
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-white/98 md:bg-white/85 backdrop-blur-md md:backdrop-blur-xl border-b border-slate-200/90 md:border-black/6 shadow-xs'
          : 'bg-white/92 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border-b border-slate-200/50 md:border-b-transparent'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-bold text-gradient cursor-pointer select-none tracking-tight active:scale-95 transition-transform"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
                  href={getHref(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                    isActive
                      ? 'text-indigo-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {item.label}
                  {/* Clean active pill */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white rounded-xl -z-10 shadow-xs border border-black/6"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
          
          {/* Hire Me CTA */}
          <a
            href="#contact"
            className="relative overflow-hidden flex items-center gap-1.5 px-5 py-2.5 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-size-[200%_100%] hover:bg-right text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Hire Me
          </a>
        </div>

        {/* Mobile: Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            className="p-2.5 rounded-xl bg-white/90 border border-slate-200/80 text-slate-800 shadow-xs active:scale-92 transition-transform cursor-pointer"
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
            className="md:hidden bg-white/98 border-b border-slate-200/90 shadow-xl overflow-hidden rounded-b-2xl"
          >
            <div className="container max-w-6xl mx-auto px-4 pt-2 pb-4 flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.div key={item.label} variants={menuItemVariants}>
                    <a
                      href={getHref(item.href)}
                      onClick={handleMobileClick}
                      className={`flex items-center justify-between font-medium transition-colors py-3 px-4 rounded-xl text-base ${
                        isActive
                          ? 'text-indigo-600 bg-indigo-50/80 font-semibold border border-indigo-100'
                          : 'text-slate-700 active:bg-slate-100'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                    </a>
                  </motion.div>
                );
              })}

              {/* Mobile Hire Me CTA */}
              <motion.div variants={menuItemVariants} className="pt-2">
                <a
                  href={getHref('#contact')}
                  onClick={handleMobileClick}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-semibold shadow-md shadow-indigo-500/20 text-base active:scale-98 transition-transform"
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
