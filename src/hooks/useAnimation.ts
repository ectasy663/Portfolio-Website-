import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface UseAnimationOptions {
  // Animation duration in milliseconds
  duration?: number;
  // Delay before animation starts
  delay?: number;
  // Whether to disable animation during theme changes
  respectThemeChange?: boolean;
}

/**
 * Custom hook to manage animations that respect theme changes
 * Prevents animation conflicts during theme transitions
 */
export const useAnimation = (options: UseAnimationOptions = {}) => {
  const { theme } = useTheme();
  const animationRef = useRef<HTMLElement>(null);
  const {
    duration = 300,
    delay = 0,
    respectThemeChange = true
  } = options;

  useEffect(() => {
    if (!animationRef.current || !respectThemeChange) return;

    const element = animationRef.current;
    
    // Create CSS transition string
    const transitionValue = `all ${duration}ms ease-out${delay > 0 ? ` ${delay}ms` : ''}`;
    
    // Check if theme is currently changing
    const isThemeChanging = document.documentElement.classList.contains('theme-changing');
    
    if (isThemeChanging) {
      // Disable transitions during theme change
      element.style.transition = 'none';
    } else {
      // Enable normal transitions
      element.style.transition = transitionValue;
    }

    // Listen for theme change events
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const target = mutation.target as HTMLElement;
          const isChanging = target.classList.contains('theme-changing');
          
          if (isChanging) {
            element.style.transition = 'none';
          } else {
            // Re-enable transitions after theme change
            setTimeout(() => {
              element.style.transition = transitionValue;
            }, 50);
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      observer.disconnect();
    };
  }, [theme, duration, delay, respectThemeChange]);

  return animationRef;
};

/**
 * Hook for GSAP animations that respect theme changes
 */
export const useGSAPAnimation = () => {
  const { theme } = useTheme();
  const timelineRef = useRef<any>(null);

  useEffect(() => {
    // Pause GSAP timeline during theme change
    const handleThemeChange = () => {
      if (timelineRef.current && window.gsap) {
        const isThemeChanging = document.documentElement.classList.contains('theme-changing');
        
        if (isThemeChanging) {
          timelineRef.current.pause();
        } else {
          setTimeout(() => {
            if (timelineRef.current) {
              timelineRef.current.resume();
            }
          }, 50);
        }
      }
    };

    // Listen for theme change events
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          handleThemeChange();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      observer.disconnect();
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [theme]);

  return timelineRef;
};
