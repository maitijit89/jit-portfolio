/**
 * Design System: Liquid Glass Futurism
 * Performance Utilities - Optimize 3D rendering and animations
 * - Device capability detection
 * - Animation frame throttling
 * - Memory management
 */

export const performanceConfig = {
  // Detect if device prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Detect if device has low battery
  isLowBattery: async () => {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        return battery.level < 0.2;
      } catch {
        return false;
      }
    }
    return false;
  },

  // Get animation duration based on device capabilities
  getAnimationDuration: (baseDuration: number) => {
    if (performanceConfig.prefersReducedMotion()) {
      return 0;
    }
    return baseDuration;
  },

  // Throttle function for scroll events
  throttle: (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function (this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Debounce function for resize events
  debounce: (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },
};
