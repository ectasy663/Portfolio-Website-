import React, { useEffect, useRef, useCallback } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Code, Zap } from 'lucide-react';
import gsap from 'gsap';
import { scrollToId } from '../utils/scroll';
import Typewriter from 'typewriter-effect';
import heroVideo from '../assets/videos/Video 1 AI and Web.mp4';
import ResumeButton from './ResumeButton';
import {
  SiReact, SiTypescript, SiPython, SiJavascript, SiNodedotjs,
  SiDocker, SiGit, SiTensorflow
} from 'react-icons/si';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Set initial states - make sure elements exist first
    if (titleRef.current && subtitleRef.current && descriptionRef.current && buttonsRef.current && socialRef.current) {
      gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, buttonsRef.current, socialRef.current], {
        opacity: 0,
        y: 30
      });

      // Animate elements in sequence
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
      })
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8")
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6")
        .to(buttonsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.4")
        .to(socialRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.4");
    } else {
      // Fallback: show elements immediately if refs aren't ready
      setTimeout(() => {
        if (titleRef.current) titleRef.current.style.opacity = '1';
        if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
        if (descriptionRef.current) descriptionRef.current.style.opacity = '1';
        if (buttonsRef.current) buttonsRef.current.style.opacity = '1';
        if (socialRef.current) socialRef.current.style.opacity = '1';
      }, 100);
    }

    // Floating animation for tech icons
    const techIcons = document.querySelectorAll('.floating-tech-icon');
    techIcons.forEach((icon, index) => {
      gsap.to(icon, {
        y: 'random(-20, 20)',
        x: 'random(-15, 15)',
        rotation: 'random(-15, 15)',
        duration: 'random(3, 6)',
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.2
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToProjects = useCallback(() => {
    scrollToId('#projects', 80);
  }, []);

  const scrollToContact = useCallback(() => {
    scrollToId('#contact', 80);
  }, []);

  const techStack = [
    { icon: SiReact, color: 'text-cyan-400', name: 'React' },
    { icon: SiTypescript, color: 'text-blue-400', name: 'TypeScript' },
    { icon: SiPython, color: 'text-yellow-400', name: 'Python' },
    { icon: SiJavascript, color: 'text-yellow-300', name: 'JavaScript' },
    { icon: SiNodedotjs, color: 'text-green-400', name: 'Node.js' },
    { icon: SiDocker, color: 'text-blue-500', name: 'Docker' },
    { icon: SiGit, color: 'text-orange-500', name: 'Git' },
    { icon: SiTensorflow, color: 'text-orange-400', name: 'TensorFlow' },
  ];

  // Add a media query effect for mobile devices
  useEffect(() => {
    const handleResize = () => {
      const video = document.querySelector('#heroVideo') as HTMLVideoElement;
      if (!video) return;
      
      if (window.innerWidth <= 640) { // Mobile view
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100vh';
        video.style.objectFit = 'cover';
      } else { // Desktop view
        video.style.position = 'absolute';
        video.style.width = 'auto';
        video.style.height = 'auto';
        video.style.minWidth = '100%';
        video.style.minHeight = '100%';
        video.style.top = '50%';
        video.style.left = '50%';
        video.style.transform = 'translate(-50%, -50%)';
      }
    };

    // Run on mount and when window resizes
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-transparent transition-colors duration-300 py-8 sm:py-12 md:py-0">
      {/* Background Video - Only visible in dark theme */}
      <video
        id="heroVideo"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Light theme background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:opacity-0 opacity-100 transition-opacity duration-300 z-0"></div>

      {/* Video overlay for better text readability - Only in dark theme */}
      <div className="absolute inset-0 bg-black/40 dark:opacity-100 opacity-0 transition-opacity duration-300 z-10"></div>

      {/* Dynamic gradient background overlay */}
      <div className="absolute inset-0 z-20 opacity-20 dark:opacity-30 transition-opacity duration-300">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Floating tech icons */}
      <div className="absolute inset-0 pointer-events-none z-30 hidden sm:block">
        {techStack.map((tech, index) => (
          <div
            key={index}
            className={`floating-tech-icon absolute ${tech.color} opacity-40 dark:opacity-0 transition-opacity duration-300`}
            style={{
              right: `${10 + (index * 8)}%`,
              top: `${15 + (index % 4) * 20}%`,
              fontSize: '2.5rem'
            }}
          >
            <tech.icon />
          </div>
        ))}
      </div>

      {/* Geometric shapes */}
      <div className="absolute inset-0 pointer-events-none z-30 hidden sm:block">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-gray-300/30 dark:border-white/20 rotate-45 animate-rotate-slow transition-colors duration-300"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-gray-300/30 dark:border-white/20 rotate-12 animate-pulse transition-colors duration-300"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full animate-float"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
        <div ref={heroRef} className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Main heading with gradient text */}
            <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight relative z-50 mb-4" style={{ opacity: 1 }}>
              {/* Mobile version - always show first, then hide on larger screens */}
              <div className="block sm:hidden text-center">
                <div className="text-4xl font-bold mb-2 text-gray-800 dark:text-white gradient-text">Naman Singh</div>
                <div className="text-4xl font-bold text-gray-800 dark:text-white gradient-text">Panwar</div>
              </div>
              {/* Desktop version */}
              <span className="hidden sm:inline whitespace-nowrap gradient-text text-gray-800 dark:text-white transition-colors duration-300">
                Naman Singh Panwar
              </span>
            </h1>

            {/* Subtitle with typewriter effect */}
            <h2 ref={subtitleRef} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300 px-2 sm:px-0">
              <Typewriter
                options={{
                  strings: [
                    'AI/ML Engineer 🤖',
                    'Full Stack Developer 💻',
                    'Creative Technologist 🎨',
                    'Problem Solver 🚀'
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  delay: 100,
                  wrapperClassName: "gradient-text",
                }}
              />
            </h2>

            {/* Description */}
            <p ref={descriptionRef} className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto transition-colors duration-300 px-4 sm:px-0">
              Crafting intelligent digital experiences at the intersection of{' '}
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold transition-colors duration-300">AI/ML</span>,{' '}
              <span className="text-purple-600 dark:text-purple-400 font-semibold transition-colors duration-300">web development</span>, and{' '}
              <span className="text-pink-600 dark:text-pink-400 font-semibold transition-colors duration-300">creative design</span>.
              Transforming complex ideas into elegant, user-centered solutions.
            </p>

            {/* Tech highlights */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-4 sm:px-0">
              {techStack.slice(0, 4).map((tech, index) => (
                <div
                  key={index}
                  className="group flex items-center space-x-1 sm:space-x-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-full px-2 sm:px-4 py-1.5 sm:py-2 hover:border-gray-300 dark:hover:border-white/40 transition-all duration-300 will-change-transform"
                >
                  <tech.icon className={`text-sm sm:text-lg ${tech.color} group-hover:scale-110 transition-transform duration-150`} />
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 transition-colors duration-300">{tech.name}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div ref={buttonsRef} className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4 justify-center px-4 sm:px-0">
              <button
                onClick={scrollToProjects}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white font-semibold rounded-xl hover:border-gray-300 dark:hover:border-white/40 hover:shadow-glass hover:scale-105 transition-all duration-300 will-change-transform focus:outline-none focus:ring-2 focus:ring-gray-300/50 dark:focus:ring-white/30 active:scale-95"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Code size={18} className="sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">View My Work</span>
                </span>
              </button>

              <ResumeButton variant="secondary" className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base" />

              <button
                onClick={scrollToContact}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white font-semibold rounded-xl hover:border-gray-300 dark:hover:border-white/40 hover:shadow-glass hover:scale-105 transition-all duration-300 will-change-transform focus:outline-none focus:ring-2 focus:ring-gray-300/50 dark:focus:ring-white/30 active:scale-95"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Zap size={18} className="sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Let's Connect</span>
                </span>
              </button>
            </div>

            {/* Social links */}
            <div ref={socialRef} className="flex justify-center gap-4 sm:gap-6 px-4 sm:px-0">
              {[
                { icon: Github, href: 'https://github.com/ectasy663', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/naman-singh-panwar7/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:namansingh4680@gmail.com', label: 'Email' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group p-2.5 sm:p-3 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-xl text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/40 hover:scale-110 transition-all duration-300 will-change-transform"
                  title={social.label}
                >
                  <social.icon size={20} className="sm:w-6 sm:h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-12 sm:mt-16">
            <div className="flex flex-col items-center space-y-2 animate-bounce">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-200 font-medium transition-colors duration-300">Scroll to explore</span>
              <ArrowDown className="text-cyan-600 dark:text-cyan-400 transition-colors duration-300" size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; export default Hero;
