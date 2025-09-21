import { useEffect, useState, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Removed ScrollToPlugin to prevent navigation conflicts
import { ThemeProvider } from './contexts/ThemeContext';
import Hero from './components/Hero_clean.tsx';
import Navigation from './components/Navigation.tsx';
import './App.css';

// Lazy load other components for better performance
const About = lazy(() => import('./components/About.tsx'));
const Skills = lazy(() => import('./components/Skills.tsx'));
const Experience = lazy(() => import('./components/Experience.tsx'));
const Projects = lazy(() => import('./components/Projects.tsx'));
const Achievements = lazy(() => import('./components/Achievements.tsx'));
const Contact = lazy(() => import('./components/Contact.tsx'));

// Register GSAP plugins (removed ScrollToPlugin to prevent conflicts)
gsap.registerPlugin(ScrollTrigger);

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Make GSAP available globally for theme context
    window.gsap = gsap;
    
    // Initialize GSAP animations - NO navbar interference
    gsap.set("body", { visibility: "visible" });
    document.body.classList.add('gsap-loaded');
    
    // Initial loading animation
    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false)
    });
    
    tl.to(".loading-overlay", {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      delay: 0.5
    });
    
    // Create scroll progress indicator with optimized settings
    gsap.to(".scroll-progress", {
      width: "100%",
      ease: "none",
      scrollTrigger: { 
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        invalidateOnRefresh: true
      }
    });
    
    // Note: Navigation scrolling is handled in Navigation.tsx to avoid conflicts

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        {/* Initial page loading overlay */}
        <div className={`loading-overlay fixed inset-0 bg-white dark:bg-dark-900 transition-all duration-500 flex flex-col items-center justify-center ${!isLoading ? 'opacity-0 pointer-events-none z-[-1]' : 'opacity-100 z-[200]'}`}>
          <div className="text-4xl font-bold gradient-text">Naman Singh Panwar</div>
          <div className="mt-4 w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Scroll progress indicator */}
  <div className="fixed top-0 left-0 w-full h-1 z-[1100] bg-gray-200 dark:bg-dark-800">
          <div className="scroll-progress h-full bg-gradient-to-r from-primary-400 to-primary-600 w-0"></div>
        </div>
        
        <Navigation />
        <main className="pt-20 relative z-0">
          <Hero />
          <Suspense fallback={<LoadingSpinner />}>
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Achievements />
            <Contact />
          </Suspense>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
