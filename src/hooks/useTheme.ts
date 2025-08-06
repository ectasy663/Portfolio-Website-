import { useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import gsap from 'gsap';

export const useThemeTransition = () => {
  const { theme } = useTheme();
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      // Faster, smoother theme transition animation
      gsap.to(elementRef.current, {
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto", // Prevent animation conflicts
        onComplete: () => {
          // Animation complete
        }
      });
    }
  }, [theme]);

  return { elementRef, theme };
};

export const useThemeAnimation = (selector: string) => {
  const { theme } = useTheme();

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      gsap.fromTo(element, 
        { opacity: 0.8 },
        { 
          opacity: 1, 
          duration: 0.5, 
          ease: "power2.out" 
        }
      );
    });
  }, [theme, selector]);
};
