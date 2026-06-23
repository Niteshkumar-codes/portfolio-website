import { useState, useEffect } from 'react';

// Custom, pixel-perfect SVGs for Stripe/Vercel styling
const Icons = {
  Github: () => (
    <svg className="w-5 h-5 spring-transition group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  LinkedIn: () => (
    <svg className="w-5 h-5 spring-transition group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-5 h-5 spring-transition group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  ExternalLink: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Sun: () => (
    <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  Moon: () => (
    <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ArrowDown: () => (
    <svg className="w-4 h-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  ),
  Academic: () => (
    <svg className="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  ),
  DevConsole: () => (
    <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m10 10-2 2 2 2M14 14l2-2-2-2M12 9l-1 6" />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275z" />
    </svg>
  ),
  MernStack: () => (
    <svg className="w-6 h-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Briefcase: () => (
    <svg className="w-6 h-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  ),
  ReactIcon: () => (
    <svg className="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="2" />
      <path d="M12 5C6.477 5 2 8.134 2 12s4.477 7 10 7 10-3.134 10-7-4.477-7-10-7z" transform="rotate(30 12 12)" />
      <path d="M12 5C6.477 5 2 8.134 2 12s4.477 7 10 7 10-3.134 10-7-4.477-7-10-7z" transform="rotate(90 12 12)" />
      <path d="M12 5C6.477 5 2 8.134 2 12s4.477 7 10 7 10-3.134 10-7-4.477-7-10-7z" transform="rotate(150 12 12)" />
    </svg>
  ),
  JsIcon: () => (
    <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M15 9h-2a2 2 0 0 0-2 2v4M17 15h-2a2 2 0 0 1-2-2" />
    </svg>
  ),
  TailwindIcon: () => (
    <svg className="w-6 h-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3c-1.2 0-2.4.6-3.2 1.5C7.2 3.9 5.4 3 3.5 3 1.6 3 0 4.6 0 6.5c0 1.9 1.5 3.5 3.5 3.5.9 0 1.8-.3 2.5-.9.8 1 2 1.9 3.2 1.9 1.2 0 2.4-.6 3.2-1.5.8.6 2.6 1.5 4.5 1.5 1.9 0 3.5-1.6 3.5-3.5C20.4 5.6 18.9 4 17 4c-.9 0-1.8.3-2.5.9-.8-1-2-1.9-3.2-1.9z" />
    </svg>
  ),
  NodeIcon: () => (
    <svg className="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
      <path d="M12 22V12M12 12l9-5M12 12L3 7" />
    </svg>
  ),
  ExpressIcon: () => (
    <svg className="w-6 h-6 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  MongoIcon: () => (
    <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c0 0-4 4.5-4 9.5S10.5 20 12 22c1.5-2 4-8 4-10.5S12 2 12 2z" />
    </svg>
  ),
  GitIcon: () => (
    <svg className="w-6 h-6 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="6" y1="9" x2="6" y2="15" />
      <path d="M9 18h6a3 3 0 0 0 3-3V9" />
    </svg>
  ),
  PostmanIcon: () => (
    <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  RenderIcon: () => (
    <svg className="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 6v12M6 12h12" />
    </svg>
  )
};

export default function App() {
  // Theme Engine (Dark-first is default)
  const [isLight, setIsLight] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved === 'light';
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Sync theme changes with DOM element
  useEffect(() => {
    const root = document.documentElement;
    if (isLight) {
      root.classList.add('light');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      root.classList.remove('light');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  }, [isLight]);

  // Handle scroll progress and back-to-top visibility
  useEffect(() => {
    const handleScrollEffects = () => {
      // 1. Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      // 2. Back to top visibility
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScrollEffects);
    return () => window.removeEventListener('scroll', handleScrollEffects);
  }, []);

  // Loading animation timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // Scroll animation intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Escape key and body scroll lock side effects for Resume Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsResumeOpen(false);
      }
    };
    if (isResumeOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isResumeOpen]);

  // Handle mobile menu smooth scroll anchor clicks
  const handleScroll = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-var(--bg-base) text-slate-400 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-500">
      
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 z-[9999] transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Startup Loading Screen Overlay */}
      <div 
        className={`fixed inset-0 z-[10000] bg-[#050508] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl border border-indigo-500/20 bg-indigo-500/5 flex items-center justify-center font-mono text-indigo-400 font-extrabold text-sm animate-pulse-glow">
            &lt;/&gt;
          </div>
          <span className="font-mono text-xs text-slate-400 tracking-widest animate-pulse">
            LOADING EXPERIENCE...
          </span>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-title)] spring-transition shadow-xl cursor-pointer ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <svg className="w-5 h-5 transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
        </svg>
      </button>
      
      {/* 1. NAVBAR (Sticky, Glassmorphic, Theme Toggle, Functional Mobile Menu) */}
      <header className="sticky top-0 z-50 premium-navbar w-full transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand/Name Logo */}
          <div 
            onClick={() => handleScroll('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="font-mono text-base font-extrabold tracking-tight text-[var(--text-title)] spring-transition group-hover:text-[var(--color-accent)]">
              Nitesh Kumar
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => handleScroll('home')} className="text-sm font-medium text-[var(--text-body)] hover:text-[var(--text-title)] section-anchor pb-1 spring-transition cursor-pointer">
              Home
            </button>
            <button onClick={() => handleScroll('about')} className="text-sm font-medium text-[var(--text-body)] hover:text-[var(--text-title)] section-anchor pb-1 spring-transition cursor-pointer">
              About
            </button>
            <button onClick={() => handleScroll('projects')} className="text-sm font-medium text-[var(--text-body)] hover:text-[var(--text-title)] section-anchor pb-1 spring-transition cursor-pointer">
              Projects
            </button>
            <button onClick={() => handleScroll('skills')} className="text-sm font-medium text-[var(--text-body)] hover:text-[var(--text-title)] section-anchor pb-1 spring-transition cursor-pointer">
              Skills
            </button>
            <button onClick={() => handleScroll('achievements')} className="text-sm font-medium text-[var(--text-body)] hover:text-[var(--text-title)] section-anchor pb-1 spring-transition cursor-pointer">
              Achievements
            </button>
            <button onClick={() => setIsResumeOpen(true)} className="text-sm font-medium text-[var(--text-body)] hover:text-[var(--text-title)] section-anchor pb-1 spring-transition cursor-pointer">
              Resume
            </button>
            <button onClick={() => handleScroll('contact')} className="text-sm font-medium text-[var(--text-body)] hover:text-[var(--text-title)] section-anchor pb-1 spring-transition cursor-pointer">
              Contact
            </button>
          </nav>

          {/* Actions: Theme Toggle & Resume CTA */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsLight(!isLight)}
              className="p-2.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] spring-transition shadow-sm select-none cursor-pointer"
              aria-label="Toggle display theme"
            >
              {isLight ? <Icons.Moon /> : <Icons.Sun />}
            </button>

            {/* Resume Button */}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="px-6 py-3 rounded-xl text-xs font-extrabold bg-[var(--text-title)] text-[var(--bg-base)] hover:scale-[1.03] active:scale-[0.98] spring-transition shadow-lg hover:shadow-indigo-500/10 select-none cursor-pointer"
            >
              View Resume
            </button>
          </div>

          {/* Mobile Actions and Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsLight(!isLight)}
              className="p-2 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-surface)] select-none cursor-pointer"
              aria-label="Toggle display theme"
            >
              {isLight ? <Icons.Moon /> : <Icons.Sun />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-[var(--border-primary)] text-[var(--text-title)] cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
            </button>
          </div>

        </div>

        {/* Mobile Hamburger Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-20 border-b border-[var(--border-primary)] bg-[var(--bg-surface)] backdrop-blur-3xl animate-entry z-40 p-6 flex flex-col gap-6 shadow-2xl">
            <div className="flex flex-col gap-4 text-left">
              <button onClick={() => handleScroll('home')} className="text-base font-semibold text-[var(--text-title)] py-2 border-b border-[var(--border-primary)]/40 w-full text-left">
                Home
              </button>
              <button onClick={() => handleScroll('about')} className="text-base font-semibold text-[var(--text-title)] py-2 border-b border-[var(--border-primary)]/40 w-full text-left">
                About
              </button>
              <button onClick={() => handleScroll('projects')} className="text-base font-semibold text-[var(--text-title)] py-2 border-b border-[var(--border-primary)]/40 w-full text-left">
                Projects
              </button>
              <button onClick={() => handleScroll('skills')} className="text-base font-semibold text-[var(--text-title)] py-2 border-b border-[var(--border-primary)]/40 w-full text-left">
                Skills
              </button>
              <button onClick={() => handleScroll('achievements')} className="text-base font-semibold text-[var(--text-title)] py-2 border-b border-[var(--border-primary)]/40 w-full text-left">
                Achievements
              </button>
              <button onClick={() => { setMobileMenuOpen(false); setIsResumeOpen(true); }} className="text-base font-semibold text-[var(--text-title)] py-2 border-b border-[var(--border-primary)]/40 w-full text-left">
                Resume
              </button>
              <button onClick={() => handleScroll('contact')} className="text-base font-semibold text-[var(--text-title)] py-2 border-b border-[var(--border-primary)]/40 w-full text-left">
                Contact
              </button>
            </div>
            
            <button
              onClick={() => { setMobileMenuOpen(false); setIsResumeOpen(true); }}
              className="w-full text-center py-3.5 rounded-xl font-extrabold bg-[var(--text-title)] text-[var(--bg-base)] hover:scale-[1.02] active:scale-[0.98] spring-transition block cursor-pointer"
            >
              View Resume
            </button>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION (Full Viewport, Grid Mesh, Animated Mesh, Recruiter Stats, Floating Cards) */}
      <section id="home" className="relative min-h-[calc(100vh-80px)] lg:min-h-0 lg:h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden px-6 py-12 lg:py-0">
        
        {/* Background Mesh Gradients */}
        <div className="absolute inset-0 z-0 bg-gradient-glow opacity-60"></div>
        <div className="absolute inset-0 z-0 grid-mesh"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[120px] -top-20 -left-20 animate-pulse-glow"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[100px] bottom-10 right-10 animate-pulse-glow"></div>

        {/* Floating Glass Design Elements */}
        <div className="absolute top-[20%] right-[10%] hidden lg:block animate-float w-16 h-16 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-primary)] backdrop-blur-md shadow-xl flex items-center justify-center font-mono text-[var(--color-accent)] text-lg select-none rotate-6 font-bold z-10">
          {}
        </div>
        <div className="absolute bottom-[20%] left-[10%] hidden lg:block animate-float-slow w-20 h-20 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-primary)] backdrop-blur-md shadow-xl flex items-center justify-center font-mono text-[var(--color-accent-secondary)] text-sm select-none -rotate-12 z-10">
          &lt;/&gt;
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Profile Image & Floating Badges */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center animate-entry delay-100 order-1">
            <div className="relative group select-none animate-float w-fit">
              {/* Soft background glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Spinning gradient border overlay behind the image */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 opacity-75 blur-[2px] animate-spin-slow"></div>
              
              {/* Inner glassmorphism circle wrapper */}
              <div className="relative p-2 rounded-full bg-[var(--bg-surface)] backdrop-blur-xl border border-[var(--border-primary)] shadow-2xl flex items-center justify-center overflow-hidden w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]">
                <img 
                  src="/Nitesh kumar.jpg" 
                  alt="Nitesh Kumar Profile" 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]" 
                />
              </div>

              {/* Floating decorative tech badges */}
              {/* React icon badge */}
              <div className="absolute -top-3 -right-3 animate-float w-10 h-10 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-primary)] backdrop-blur-md shadow-lg flex items-center justify-center hover:border-indigo-500/40 spring-transition cursor-default">
                <Icons.ReactIcon />
              </div>
              
              {/* Node icon badge */}
              <div className="absolute -bottom-2 -left-3 animate-float-slow w-10 h-10 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-primary)] backdrop-blur-md shadow-lg flex items-center justify-center hover:border-emerald-500/40 spring-transition cursor-default">
                <Icons.NodeIcon />
              </div>

              {/* MongoDB icon badge */}
              <div className="absolute bottom-[40%] -right-8 animate-float w-10 h-10 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-primary)] backdrop-blur-md shadow-lg flex items-center justify-center hover:border-teal-500/40 spring-transition cursor-default">
                <Icons.MongoIcon />
              </div>
            </div>
          </div>

          {/* Right Column: Big Headline & Action Targets */}
          <div className="lg:col-span-7 text-left flex flex-col justify-center animate-entry order-2">
            
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/15 bg-indigo-500/5 text-indigo-400 text-xs font-mono w-fit mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              B.Tech CSE Student • Placement Ready
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-[var(--text-title)] mb-5 text-balance">
              Full Stack Developer
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base lg:text-lg text-[var(--text-body)] leading-relaxed max-w-xl mb-6 text-pretty">
              B.Tech Computer Science Engineering Student specializing in React.js, Node.js, Express.js, MongoDB, and modern web application development.
            </p>

            {/* Social Accounts Row */}
            <div className="flex items-center gap-3.5 mb-6">
              <a 
                href="https://github.com/Niteshkumar-codes" 
                target="_blank" 
                rel="noreferrer" 
                className="group p-3 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:border-[var(--color-accent)] text-[var(--text-body)] hover:text-[var(--text-title)] spring-transition shadow-sm"
                aria-label="GitHub Profile"
              >
                <Icons.Github />
              </a>
              <a 
                href="https://www.linkedin.com/in/nitesh-kumar-dev/" 
                target="_blank" 
                rel="noreferrer" 
                className="group p-3 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:border-[var(--color-accent)] text-[var(--text-body)] hover:text-[var(--text-title)] spring-transition shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Icons.LinkedIn />
              </a>
              <a 
                href="mailto:developer.nitesh.works@gmail.com" 
                className="group p-3 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:border-[var(--color-accent)] text-[var(--text-body)] hover:text-[var(--text-title)] spring-transition shadow-sm"
                aria-label="Send Email"
              >
                <Icons.Mail />
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button 
                onClick={() => handleScroll('projects')}
                className="px-7 py-3.5 rounded-xl bg-gradient-indigo-purple text-white hover:opacity-90 font-semibold text-sm spring-transition flex items-center gap-2 select-none shadow-lg cursor-pointer"
              >
                <span>View Projects</span>
                <Icons.ArrowDown />
              </button>
              <button 
                onClick={() => setIsResumeOpen(true)}
                className="px-7 py-3.5 rounded-xl border-2 border-indigo-500/30 hover:border-indigo-500 bg-[var(--bg-surface)] text-[var(--text-title)] hover:text-white font-extrabold text-sm hover:scale-[1.03] active:scale-[0.98] spring-transition select-none shadow-lg hover:shadow-indigo-500/20 cursor-pointer flex items-center gap-2"
              >
                <span>View Resume</span>
                <svg className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 spring-transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
            </div>

            {/* Professional Identity Cards */}
            <div className="premium-glass-card p-5 sm:p-6 flex flex-col gap-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient(circle at top right, rgba(99, 102, 241, 0.05) 0%, transparent 60%) z-0 pointer-events-none"></div>
              
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-2 relative z-10">
                Technical Profile Highlights
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
                
                {/* Block 1 */}
                <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40 hover:border-[var(--color-accent)]/30 spring-transition">
                  <div className="text-base font-bold text-[var(--text-title)] font-mono mb-1 text-[var(--color-accent)]">
                    Full Stack Developer
                  </div>
                  <div className="text-[10px] font-medium text-[var(--text-body)]">
                    Core Competency
                  </div>
                </div>

                {/* Block 2 */}
                <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40 hover:border-[var(--color-accent)]/30 spring-transition">
                  <div className="text-base font-bold text-[var(--text-title)] font-mono mb-1 text-[var(--color-accent-secondary)]">
                    B.Tech CSE Student
                  </div>
                  <div className="text-[10px] font-medium text-[var(--text-body)]">
                    Academic Path
                  </div>
                </div>

                {/* Block 3 */}
                <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40 hover:border-[var(--color-accent)]/30 spring-transition">
                  <div className="text-base font-bold text-[var(--text-title)] font-mono mb-1 text-indigo-400">
                    React.js Developer
                  </div>
                  <div className="text-[10px] font-medium text-[var(--text-body)]">
                    Frontend Strengths
                  </div>
                </div>

                {/* Block 4 */}
                <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40 hover:border-[var(--color-accent)]/30 spring-transition">
                  <div className="text-base font-bold text-[var(--text-title)] font-mono mb-1 text-teal-400">
                    Backend Development
                  </div>
                  <div className="text-[10px] font-medium text-[var(--text-body)]">
                    APIs & Databases
                  </div>
                </div>

                {/* Block 5 */}
                <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40 hover:border-[var(--color-accent)]/30 spring-transition">
                  <div className="text-base font-bold text-[var(--text-title)] font-mono mb-1 text-amber-400">
                    Problem Solving
                  </div>
                  <div className="text-[10px] font-medium text-[var(--text-body)]">
                    Core CS Competency
                  </div>
                </div>

                {/* Block 6 */}
                <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40 hover:border-[var(--color-accent)]/30 spring-transition">
                  <div className="text-sm font-bold text-[var(--text-title)] font-mono mb-1 text-rose-400">
                    Open to Placements & Internships
                  </div>
                  <div className="text-[10px] font-medium text-[var(--text-body)]">
                    Career Readiness
                  </div>
                </div>

              </div>

              {/* Verified Badge */}
              <div className="mt-2 py-2 px-4 rounded-xl bg-[var(--border-primary)]/40 border border-[var(--border-primary)] text-center text-xs font-mono text-[var(--text-body)] relative z-10 flex items-center justify-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Verified Source Repository Available</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FEATURED PROJECT SECTION (Linear-style Case Study - EMS) */}
      <section id="projects" className="py-28 px-6 border-t border-[var(--border-primary)] relative">
        <div className="max-w-6xl mx-auto text-left relative z-10">
          
          {/* Section Header */}
          <div className="mb-16 scroll-animate">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/15 bg-purple-500/5 text-purple-400 text-xs font-mono w-fit mb-4">
              CASE STUDY
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-title)] scan-title mb-4">
              Featured Engineering Project
            </h2>
            <p className="text-sm text-[var(--text-body)] max-w-xl leading-relaxed">
              Detailed breakdown of the architectural core, security measures, and database implementations.
            </p>
          </div>

          {/* PROJECT CARD (Linear Premium Style) */}
          <div className="premium-glass-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start scroll-animate">
            
            {/* Left Side: General Info, Badges, CTAs */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              
              <div>
                <span className="font-mono text-xs font-semibold text-[var(--color-accent)] tracking-wider block uppercase mb-2">
                  Featured Application
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-title)] leading-tight mb-4">
                  Employee Management System
                </h3>

                <p className="text-sm text-[var(--text-body)] leading-relaxed mb-6">
                  Developed a full-stack Employee Management System to streamline employee record management and HR operations, using MVC architecture with middleware-based route protection.
                </p>

                {/* Tech Stack Badge List */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-[var(--bg-base)]/80 border border-[var(--border-primary)] text-[var(--text-title)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://employee-management-system-1-1tc4.onrender.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold px-5 py-3 rounded-xl bg-[var(--color-accent)] text-white hover:opacity-90 spring-transition cursor-pointer"
                >
                  <Icons.ExternalLink />
                  <span>Live Demo</span>
                </a>
                <a 
                  href="https://github.com/Niteshkumar-codes/employee-management-system" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold px-5 py-3 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:border-[var(--text-muted)] text-[var(--text-body)] hover:text-[var(--text-title)] spring-transition cursor-pointer"
                >
                  <Icons.Github />
                  <span>GitHub Repository</span>
                </a>
              </div>

            </div>

            {/* Right Side: Recruiter scan-optimal columns */}
            <div className="lg:col-span-7 space-y-5 border-t lg:border-t-0 lg:border-l border-[var(--border-primary)] pt-8 lg:pt-0 lg:pl-10">
              
              {/* Problem Column */}
              <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40">
                <span className="text-[11px] font-mono font-bold text-rose-400 tracking-wider block uppercase mb-1.5">
                  Scope
                </span>
                <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                  Enterprise operations and HR management require central platforms to securely handle staff scheduling, credentials routing, and administrative leave approval streams.
                </p>
              </div>

              {/* Solution Column */}
              <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40">
                <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-wider block uppercase mb-1.5">
                  Implementation
                </span>
                <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                  Designed RESTful APIs using Node.js and Express.js. Leveraged MongoDB databases and robust middleware logic to validate role-based access levels securely.
                </p>
              </div>

              {/* Key Features Column */}
              <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40">
                <span className="text-[11px] font-mono font-bold text-[var(--color-accent)] tracking-wider block uppercase mb-3">
                  Key Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                    <span className="text-[var(--color-accent)]">✓</span>
                    <span>JWT-based Authentication</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                    <span className="text-[var(--color-accent)]">✓</span>
                    <span>Role-Based Access Control</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                    <span className="text-[var(--color-accent)]">✓</span>
                    <span>Employee CRUD Operations</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                    <span className="text-[var(--color-accent)]">✓</span>
                    <span>Attendance Management</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                    <span className="text-[var(--color-accent)]">✓</span>
                    <span>Leave Management Workflow</span>
                  </div>
                </div>
              </div>

              {/* Technical Implementation */}
              <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40">
                <span className="text-[11px] font-mono font-bold text-[var(--color-accent-secondary)] tracking-wider block uppercase mb-2">
                  Architecture & Security
                </span>
                <ul className="text-xs text-[var(--text-body)] space-y-2 list-none pl-0">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] mt-0.5">▹</span>
                    <span><strong>Middleware Route Protection:</strong> Admin, HR, and Employee dashboard route security is strictly audited on every REST call.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] mt-0.5">▹</span>
                    <span><strong>Database Flow:</strong> Designed schema integrations using MVC design structures and indexed MongoDB department records.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* Premium Project Preview Panel (EMS Dashboard Mockup) */}
          <div className="mt-12 premium-glass-card overflow-hidden border border-[var(--border-primary)] shadow-2xl flex flex-col scroll-animate scroll-delay-100">
            
            {/* Browser Header Bar */}
            <div className="bg-[var(--bg-base)]/80 px-4 py-3 border-b border-[var(--border-primary)] flex items-center gap-4 select-none">
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 block"></span>
              </div>
              <div className="flex-grow flex items-center justify-center">
                <div className="bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-lg px-3 py-1 text-[11px] text-[var(--text-muted)] font-mono w-full max-w-md text-center flex items-center justify-center gap-1">
                  <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  <span>https://ems.nitesh.dev/admin/dashboard</span>
                </div>
              </div>
              <div className="w-16 hidden sm:block"></div> {/* Spacer to align URL bar center */}
            </div>

            {/* Dashboard Workspace */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px] bg-[var(--bg-base)]/25">
              
              {/* Sidebar Mockup */}
              <div className="md:col-span-3 border-r border-[var(--border-primary)]/40 p-4 flex flex-col gap-5 bg-[var(--bg-surface)]/20">
                <div className="flex items-center gap-2.5 px-2">
                  <div className="w-6 h-6 rounded bg-indigo-500/10 flex items-center justify-center font-mono text-[var(--color-accent)] font-bold text-xs">
                    Ω
                  </div>
                  <span className="text-xs font-bold text-[var(--text-title)] tracking-wider uppercase font-mono">EMS Console</span>
                </div>
                
                <div className="flex flex-col gap-1 text-left font-mono">
                  <div className="px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Dashboard
                  </div>
                  <div className="px-3 py-2 rounded-lg text-[var(--text-body)] hover:bg-[var(--border-primary)]/40 text-xs flex items-center gap-2 cursor-default spring-transition">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                    Manage Team
                  </div>
                  <div className="px-3 py-2 rounded-lg text-[var(--text-body)] hover:bg-[var(--border-primary)]/40 text-xs flex items-center gap-2 cursor-default spring-transition">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                    Attendance
                  </div>
                  <div className="px-3 py-2 rounded-lg text-[var(--text-body)] hover:bg-[var(--border-primary)]/40 text-xs flex items-center gap-2 cursor-default spring-transition">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                    Leave Tickets
                  </div>
                  <div className="px-3 py-2 rounded-lg text-[var(--text-body)] hover:bg-[var(--border-primary)]/40 text-xs flex items-center gap-2 cursor-default spring-transition">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                    System Audits
                  </div>
                </div>
              </div>

              {/* Main Content Mockup */}
              <div className="md:col-span-9 p-6 flex flex-col gap-6 text-left">
                
                {/* Dashboard Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* KPI 1 */}
                  <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)]/40">
                    <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] block uppercase mb-1">Total Active Staff</span>
                    <div className="text-xl font-bold text-[var(--text-title)] font-mono flex items-baseline gap-2">
                      <span>48</span>
                      <span className="text-[9px] text-emerald-500 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">+4 new</span>
                    </div>
                  </div>

                  {/* KPI 2 */}
                  <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)]/40">
                    <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] block uppercase mb-1">Today's Attendance</span>
                    <div className="text-xl font-bold text-[var(--text-title)] font-mono flex items-baseline gap-2">
                      <span>96.4%</span>
                      <span className="text-[9px] text-emerald-500 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Optimal</span>
                    </div>
                  </div>

                  {/* KPI 3 */}
                  <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)]/40">
                    <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] block uppercase mb-1">Pending Leaves</span>
                    <div className="text-xl font-bold text-[var(--text-title)] font-mono flex items-baseline gap-2">
                      <span>3</span>
                      <span className="text-[9px] text-amber-500 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">Requires Review</span>
                    </div>
                  </div>

                </div>

                {/* Lower grid (Recent logs & Department distribution) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  
                  {/* Left: Live Audit Logs */}
                  <div className="lg:col-span-7 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)]/40 flex flex-col gap-3">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 block uppercase tracking-wider mb-1">Live Employee Log Stream</span>
                    <div className="space-y-2">
                      <div className="p-2 rounded bg-[var(--bg-base)]/50 border border-[var(--border-primary)]/40 flex items-center justify-between text-xs font-mono">
                        <span className="text-[var(--text-title)]">Amit Patel (Engineering)</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">Clocked In • 09:14 AM</span>
                      </div>
                      <div className="p-2 rounded bg-[var(--bg-base)]/50 border border-[var(--border-primary)]/40 flex items-center justify-between text-xs font-mono">
                        <span className="text-[var(--text-title)]">Sneha Gupta (Product Design)</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400">Pending Leave Req</span>
                      </div>
                      <div className="p-2 rounded bg-[var(--bg-base)]/50 border border-[var(--border-primary)]/40 flex items-center justify-between text-xs font-mono">
                        <span className="text-[var(--text-title)]">Rahul Verma (HR Admin)</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-slate-500/15 border border-slate-500/30 text-slate-400">Task Allocated</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Department Distribution charts */}
                  <div className="lg:col-span-5 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)]/40 flex flex-col gap-3">
                    <span className="text-[10px] font-mono font-bold text-purple-400 block uppercase tracking-wider mb-1">Staff Allocation</span>
                    
                    <div className="space-y-3 pt-1">
                      {/* Bar 1 */}
                      <div>
                        <div className="flex justify-between text-[11px] font-mono text-[var(--text-body)] mb-1">
                          <span>Engineering</span>
                          <span>45%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[var(--bg-base)] rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      {/* Bar 2 */}
                      <div>
                        <div className="flex justify-between text-[11px] font-mono text-[var(--text-body)] mb-1">
                          <span>Product Design</span>
                          <span>25%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[var(--bg-base)] rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                      {/* Bar 3 */}
                      <div>
                        <div className="flex justify-between text-[11px] font-mono text-[var(--text-body)] mb-1">
                          <span>HR & Operations</span>
                          <span>30%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[var(--bg-base)] rounded-full overflow-hidden">
                          <div className="h-full bg-teal-400 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ====================================
          4. AI FITNESS TRACKER CASE STUDY SECTION (NEW)
          ==================================== */}
      <section className="py-24 px-6 border-t border-[var(--border-primary)] bg-[var(--bg-base)] relative">
        <div className="max-w-6xl mx-auto text-left relative z-10">
          
          {/* Section Header */}
          <div className="mb-16 scroll-animate">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/15 bg-indigo-500/5 text-indigo-400 text-xs font-mono w-fit mb-4">
              CASE STUDY
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-title)] scan-title mb-4">
              AI Fitness Tracker
            </h2>
            <p className="text-sm text-[var(--text-body)] max-w-xl leading-relaxed">
              Detailed breakdown of the fitness database schemas, API routing, and AI models integration.
            </p>
          </div>

          {/* PROJECT CARD (Linear Premium Style) */}
          <div className="premium-glass-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start scroll-animate">
            
            {/* Left Side: General Info, Badges, CTAs */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              
              <div>
                <span className="font-mono text-xs font-semibold text-[var(--color-accent)] tracking-wider block uppercase mb-2">
                  Interactive AI Application
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-title)] leading-tight mb-4">
                  AI Fitness Tracker
                </h3>

                <p className="text-sm text-[var(--text-body)] leading-relaxed mb-6">
                  Developed an AI-powered fitness tracking application featuring secure user authentication, profile management, and a responsive UI designed with Tailwind CSS.
                </p>

                {/* Tech Stack Badge List */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS'].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-[var(--bg-base)]/80 border border-[var(--border-primary)] text-[var(--text-title)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://github.com/Niteshkumar-codes/AI-Fitness-Tracker" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold px-5 py-3 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:border-[var(--text-muted)] text-[var(--text-body)] hover:text-[var(--text-title)] spring-transition cursor-pointer"
                >
                  <Icons.Github />
                  <span>GitHub Repository</span>
                </a>
              </div>

            </div>

            {/* Right Side: Recruiter scan-optimal columns */}
            <div className="lg:col-span-7 space-y-5 border-t lg:border-t-0 lg:border-l border-[var(--border-primary)] pt-8 lg:pt-0 lg:pl-10">
              
              {/* Problem Column */}
              <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40">
                <span className="text-[11px] font-mono font-bold text-rose-400 tracking-wider block uppercase mb-1.5">
                  Scope
                </span>
                <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                  Managing personalized physical logs, diet routines, and calorie counts typically requires manually coordinating static profiles across disconnected platforms.
                </p>
              </div>

              {/* Solution Column */}
              <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40">
                <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-wider block uppercase mb-1.5">
                  Implementation
                </span>
                <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                  Created backend APIs using Node.js and MongoDB to sync workout modules and meal profiles. Leveraged React.js and Tailwind CSS for client interface responsiveness.
                </p>
              </div>

              {/* Key Features Column */}
              <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40">
                <span className="text-[11px] font-mono font-bold text-[var(--color-accent)] tracking-wider block uppercase mb-3">
                  Key Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                    <span className="text-[var(--color-accent)]">✓</span>
                    <span>Secure User Authentication</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                    <span className="text-[var(--color-accent)]">✓</span>
                    <span>User Profile Management</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                    <span className="text-[var(--color-accent)]">✓</span>
                    <span>Workout Tracking Modules</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                    <span className="text-[var(--color-accent)]">✓</span>
                    <span>Food Intake Tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                    <span className="text-[var(--color-accent)]">✓</span>
                    <span>AI Food Image Analysis</span>
                  </div>
                </div>
              </div>

              {/* Technical Implementation */}
              <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/40">
                <span className="text-[11px] font-mono font-bold text-[var(--color-accent-secondary)] tracking-wider block uppercase mb-2">
                  AI Integration & API Design
                </span>
                <ul className="text-xs text-[var(--text-body)] space-y-2 list-none pl-0">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] mt-0.5">▹</span>
                    <span><strong>AI-Based Analysis:</strong> Integrates food image analysis pipelines for automated calorie estimation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] mt-0.5">▹</span>
                    <span><strong>Backend Schemas:</strong> Implemented structured MongoDB profiles to store calories records and historical workout sessions.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ====================================
          CREATOR ABOUT SECTION (NEW)
          ==================================== */}
      <section id="about" className="py-24 px-6 border-t border-[var(--border-primary)] bg-[var(--bg-base)] relative">
        <div className="max-w-6xl mx-auto text-left relative z-10">
          
          <div className="mb-16 scroll-animate">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/15 bg-indigo-500/5 text-indigo-400 text-xs font-mono w-fit mb-4">
              ABOUT
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-title)] scan-title mb-4">
              About Nitesh Kumar
            </h2>
            <p className="text-sm text-[var(--text-body)] max-w-xl leading-relaxed">
              Background, education milestones, and active full-stack software focuses.
            </p>
          </div>

          <div className="premium-glass-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start scroll-animate">
            
            {/* Left Column: Profile Card */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              <div className="relative group select-none w-fit mb-2">
                <div className="absolute inset-0 rounded-full bg-gradient-indigo-purple blur-xl opacity-35 group-hover:opacity-50 spring-transition pointer-events-none"></div>
                <div className="relative p-2 rounded-full border border-[var(--border-primary)] bg-[var(--bg-surface)] backdrop-blur-xl hover:border-[var(--color-accent)]/50 spring-transition shadow-xl">
                  <img 
                    src="/Nitesh kumar.jpg" 
                    alt="Nitesh Kumar profile avatar portrait" 
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover shadow-2xl spring-transition group-hover:scale-[1.02]" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-[var(--text-title)] mb-1">
                  Nitesh Kumar
                </h3>
                <span className="font-mono text-xs font-bold text-[var(--color-accent)] tracking-wider uppercase block mb-3">
                  Computer Science Student
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-purple-500/15 bg-purple-500/5 text-purple-400 text-xs font-mono font-medium mb-4">
                  B.Tech Computer Science Engineering
                </span>
              </div>

              <p className="text-sm text-[var(--text-body)] leading-relaxed text-pretty">
                Motivated Computer Science Engineering student seeking opportunities to apply technical and creative skills in real-world projects. Passionate about software development, problem-solving, and continuous learning. Looking to gain practical industry experience while contributing effectively to organizational goals.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="px-3.5 py-1.5 rounded-xl border border-emerald-500/15 bg-emerald-500/5 text-emerald-400 text-xs font-mono font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Placement Active
                </span>
              </div>
            </div>

            {/* Right Column: Timeline Layout (Current Focus) */}
            <div className="lg:col-span-7 space-y-6 text-left border-t lg:border-t-0 lg:border-l border-[var(--border-primary)] pt-8 lg:pt-0 lg:pl-10 relative">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-6">
                Current Focus & Timeline
              </h4>

              {/* Vertical line indicator */}
              <div className="absolute left-[31px] lg:left-[71px] top-[74px] bottom-[20px] w-[2px] bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-accent-secondary)]/30 hidden sm:block"></div>

              <div className="space-y-8 relative z-10">
                
                {/* Timeline Item 1: B.Tech CSE */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                  <div className="w-16 h-16 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-surface)] flex items-center justify-center flex-shrink-0 relative z-20 shadow-md">
                    <Icons.Academic />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] font-semibold uppercase block mb-1">Education</span>
                    <h5 className="text-base font-bold text-[var(--text-title)] mb-1">Bachelor of Technology in Computer Science Engineering</h5>
                    <span className="font-mono text-xs font-semibold text-[var(--color-accent)] block mb-1.5">Dronacharya Group of Institutions, Greater Noida • August 2023 – July 2027</span>
                    <p className="text-xs text-[var(--text-body)] leading-relaxed">
                      Studying core computer science curriculum, software engineering methodologies, data structures & algorithms, databases, and operating systems.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 2: EMS */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                  <div className="w-16 h-16 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-surface)] flex items-center justify-center flex-shrink-0 relative z-20 shadow-md">
                    <Icons.CheckCircle />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] font-semibold uppercase block mb-1">Current Focus</span>
                    <h5 className="text-base font-bold text-[var(--text-title)] mb-1.5">Employee Management System</h5>
                    <p className="text-xs text-[var(--text-body)] leading-relaxed">
                      Architecting secure full-stack solutions, custom authentication logic, and role-based client routing workflows.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 3: AI Fitness Tracker */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                  <div className="w-16 h-16 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-surface)] flex items-center justify-center flex-shrink-0 relative z-20 shadow-md">
                    <Icons.Sparkles />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] font-semibold uppercase block mb-1">Current Focus</span>
                    <h5 className="text-base font-bold text-[var(--text-title)] mb-1.5">AI Fitness Tracker</h5>
                    <p className="text-xs text-[var(--text-body)] leading-relaxed">
                      Integrating diet/calorie logs, backend REST APIs, and automated food image analysis modules.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 4: Placement Preparation */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                  <div className="w-16 h-16 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-surface)] flex items-center justify-center flex-shrink-0 relative z-20 shadow-md">
                    <Icons.Briefcase />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] font-semibold uppercase block mb-1">Current Focus</span>
                    <h5 className="text-base font-bold text-[var(--text-title)] mb-1.5">MERN Stack Development & Placement Preparation</h5>
                    <p className="text-xs text-[var(--text-body)] leading-relaxed font-semibold text-[var(--color-accent-secondary)]">
                      Refining API security checks, practicing problem-solving, and preparing for engineering recruitment drives.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ====================================
          5. SKILLS SECTION
          ==================================== */}
      <section id="skills" className="py-24 px-6 border-t border-[var(--border-primary)] bg-[var(--bg-surface)]/20 relative">
        <div className="max-w-6xl mx-auto text-left relative z-10">
          
          <div className="mb-16 scroll-animate">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-title)] scan-title mb-4">
              Technical Stack
            </h2>
            <p className="text-sm text-[var(--text-body)] max-w-xl leading-relaxed">
              Core technologies utilized to build secure backend routes, databases, and responsive client layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Category 1: Programming Languages */}
            <div className="premium-glass-card p-6 flex flex-col justify-between border border-[var(--border-primary)] hover:border-[var(--color-accent)]/20 spring-transition scroll-animate">
              <div>
                <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] tracking-wider block uppercase mb-4">
                  Programming Languages
                </span>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-indigo-500/10 flex items-center justify-center font-mono text-[var(--color-accent)] font-bold text-xs">J</span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">Java</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.JsIcon />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">JavaScript</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-indigo-500/10 flex items-center justify-center font-mono text-[var(--color-accent)] font-bold text-xs">C</span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">C</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 2: Frontend */}
            <div className="premium-glass-card p-6 flex flex-col justify-between border border-[var(--border-primary)] hover:border-[var(--color-accent-secondary)]/20 spring-transition scroll-animate scroll-delay-100">
              <div>
                <span className="font-mono text-[10px] font-bold text-[var(--color-accent-secondary)] tracking-wider block uppercase mb-4">
                  Frontend
                </span>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-purple-500/10 flex items-center justify-center font-mono text-[var(--color-accent-secondary)] font-bold text-xs">H5</span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">HTML5</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-purple-500/10 flex items-center justify-center font-mono text-[var(--color-accent-secondary)] font-bold text-xs">C3</span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">CSS3</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.ReactIcon />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">React.js</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.TailwindIcon />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">Tailwind CSS</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 3: Backend */}
            <div className="premium-glass-card p-6 flex flex-col justify-between border border-[var(--border-primary)] hover:border-indigo-500/20 spring-transition scroll-animate scroll-delay-200">
              <div>
                <span className="font-mono text-[10px] font-bold text-indigo-400 tracking-wider block uppercase mb-4">
                  Backend
                </span>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icons.NodeIcon />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">Node.js</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.ExpressIcon />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">Express.js</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 4: Databases */}
            <div className="premium-glass-card p-6 flex flex-col justify-between border border-[var(--border-primary)] hover:border-teal-500/20 spring-transition scroll-animate scroll-delay-300">
              <div>
                <span className="font-mono text-[10px] font-bold text-teal-400 tracking-wider block uppercase mb-4">
                  Databases
                </span>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icons.MongoIcon />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">MongoDB</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-teal-500/10 flex items-center justify-center font-mono text-teal-400 font-bold text-xs">SQL</span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">MySQL</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 5: Tools */}
            <div className="premium-glass-card p-6 flex flex-col justify-between border border-[var(--border-primary)] hover:border-rose-500/20 spring-transition scroll-animate">
              <div>
                <span className="font-mono text-[10px] font-bold text-rose-400 tracking-wider block uppercase mb-4">
                  Developer Tools
                </span>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icons.GitIcon />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">Git</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.Github />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">GitHub</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-rose-500/10 flex items-center justify-center font-mono text-rose-400 font-bold text-xs">VS</span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">VS Code</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.PostmanIcon />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">Postman</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 6: Core CS Subjects */}
            <div className="premium-glass-card p-6 flex flex-col justify-between border border-[var(--border-primary)] hover:border-amber-500/20 spring-transition scroll-animate scroll-delay-100">
              <div>
                <span className="font-mono text-[10px] font-bold text-amber-500 tracking-wider block uppercase mb-4">
                  Core CS Subjects
                </span>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 block"></span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">Data Structures & Algorithms</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 block"></span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">OOP</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 block"></span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">DBMS</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 block"></span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">Operating Systems</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 7: Soft Skills */}
            <div className="premium-glass-card p-6 flex flex-col justify-between border border-[var(--border-primary)] hover:border-emerald-500/20 spring-transition scroll-animate scroll-delay-200">
              <div>
                <span className="font-mono text-[10px] font-bold text-emerald-400 tracking-wider block uppercase mb-4">
                  Soft Skills
                </span>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 block"></span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">Problem Solving</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 block"></span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">Teamwork</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 block"></span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-title)] font-mono">Communication</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ====================================
          6. ACHIEVEMENTS & CERTIFICATIONS SECTION
          ==================================== */}
      <section id="achievements" className="py-24 px-6 border-t border-[var(--border-primary)] bg-[var(--bg-base)] relative">
        <div className="max-w-6xl mx-auto text-left relative z-10">
          
          <div className="mb-16 scroll-animate">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-title)] scan-title mb-4">
              Achievements & Certifications
            </h2>
            <p className="text-sm text-[var(--text-body)] max-w-xl leading-relaxed">
              Verified certifications, internship selections, and official developer bootcamp participations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Achievement 1 */}
            <div className="premium-glass-card p-6 flex items-start gap-4 hover:-translate-y-1 spring-transition scroll-animate">
              <div className="p-2.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]">
                <Icons.Briefcase />
              </div>
              <div>
                <span className="font-mono text-[9px] font-bold text-[var(--color-accent)] uppercase tracking-wider block mb-1">Achievement</span>
                <h4 className="text-base font-bold text-[var(--text-title)] mb-1">Infosys Springboard Internship 7.0</h4>
                <p className="text-xs text-[var(--text-body)] leading-relaxed">
                  Selected for the prestigious Infosys Springboard Internship program (Version 7.0).
                </p>
              </div>
            </div>

            {/* Achievement 2 */}
            <div className="premium-glass-card p-6 flex items-start gap-4 hover:-translate-y-1 spring-transition scroll-animate scroll-delay-100">
              <div className="p-2.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]">
                <Icons.Academic />
              </div>
              <div>
                <span className="font-mono text-[9px] font-bold text-[var(--color-accent)] uppercase tracking-wider block mb-1">Achievement</span>
                <h4 className="text-base font-bold text-[var(--text-title)] mb-1">IDE Bootcamp Phase-II, 2025</h4>
                <p className="text-xs text-[var(--text-body)] leading-relaxed">
                  Participated in the Innovation, Design and Entrepreneurship (IDE) Bootcamp Phase-II.
                </p>
              </div>
            </div>

            {/* Certification 1 */}
            <div className="premium-glass-card p-6 flex items-start gap-4 hover:-translate-y-1 spring-transition scroll-animate scroll-delay-200">
              <div className="p-2.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]">
                <Icons.CheckCircle />
              </div>
              <div>
                <span className="font-mono text-[9px] font-bold text-teal-400 uppercase tracking-wider block mb-1">Certification</span>
                <h4 className="text-base font-bold text-[var(--text-title)] mb-1">Java Certificate – HackerRank</h4>
                <p className="text-xs text-[var(--text-body)] leading-relaxed">
                  Completed official coding assessment verifying core Java language and problem-solving capability.
                </p>
              </div>
            </div>

            {/* Certification 2 */}
            <div className="premium-glass-card p-6 flex items-start gap-4 hover:-translate-y-1 spring-transition scroll-animate scroll-delay-300">
              <div className="p-2.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]">
                <Icons.CheckCircle />
              </div>
              <div>
                <span className="font-mono text-[9px] font-bold text-teal-400 uppercase tracking-wider block mb-1">Certification</span>
                <h4 className="text-base font-bold text-[var(--text-title)] mb-1">Coursera Web Development</h4>
                <p className="text-xs text-[var(--text-body)] leading-relaxed">
                  Completed Coursera certification course: "Introduction to HTML, CSS and JavaScript".
                </p>
              </div>
            </div>

            {/* Certification 3 */}
            <div className="premium-glass-card p-6 flex items-start gap-4 hover:-translate-y-1 spring-transition sm:col-span-2 lg:col-span-1 scroll-animate scroll-delay-400">
              <div className="p-2.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]">
                <Icons.CheckCircle />
              </div>
              <div>
                <span className="font-mono text-[9px] font-bold text-teal-400 uppercase tracking-wider block mb-1">Certification</span>
                <h4 className="text-base font-bold text-[var(--text-title)] mb-1">Data Structures & Algorithms</h4>
                <p className="text-xs text-[var(--text-body)] leading-relaxed">
                  Completed specialized training modules in Data Structures and Algorithms.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. CONTACT ANCHOR & FORM (id="contact") */}
      <section id="contact" className="py-24 px-6 border-t border-[var(--border-primary)] bg-[var(--bg-base)] relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          <div className="mb-12 scroll-animate">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-rose-500/15 bg-rose-500/5 text-rose-400 text-xs font-mono w-fit mb-4">
              CONNECT
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-title)] mb-4">
              Let's Build Together
            </h2>
            <p className="text-sm text-[var(--text-body)] max-w-lg mx-auto leading-relaxed">
              Open immediately for placements, technical tests, internships, and full-stack software engineer roles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 text-left">
            
            {/* Card 1: Email */}
            <div className="premium-glass-card p-6 flex flex-col justify-between border border-[var(--border-primary)] hover:border-[var(--color-accent)]/20 spring-transition scroll-animate">
              <div>
                <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] tracking-wider block uppercase mb-3">
                  Direct Correspondence
                </span>
                <h4 className="text-base font-bold text-[var(--text-title)] mb-1">Email Mailbox</h4>
                <p className="text-xs text-[var(--text-muted)] font-mono mb-4">developer.nitesh.works@gmail.com</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('developer.nitesh.works@gmail.com');
                  alert('Email copied to clipboard!');
                }}
                className="w-full text-center py-2.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-xs font-bold text-[var(--text-title)] spring-transition cursor-pointer"
              >
                Copy Email Address
              </button>
            </div>

            {/* Card 2: LinkedIn & GitHub Linkages */}
            <div className="premium-glass-card p-6 flex flex-col justify-between border border-[var(--border-primary)] hover:border-[var(--color-accent)]/20 spring-transition scroll-animate scroll-delay-100">
              <div>
                <span className="font-mono text-[10px] font-bold text-[var(--color-accent-secondary)] tracking-wider block uppercase mb-3">
                  Professional Networks
                </span>
                <h4 className="text-base font-bold text-[var(--text-title)] mb-4">Social Profiles</h4>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://www.linkedin.com/in/nitesh-kumar-dev/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 text-center py-2.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-xs font-bold text-[var(--text-title)] spring-transition"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/Niteshkumar-codes" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 text-center py-2.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-xs font-bold text-[var(--text-title)] spring-transition"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Card 3: Placements & Internships Status */}
            <div className="premium-glass-card p-6 flex flex-col justify-between border border-[var(--border-primary)] hover:border-[var(--color-accent)]/20 spring-transition sm:col-span-2 scroll-animate scroll-delay-200">
              <div>
                <span className="font-mono text-[10px] font-bold text-teal-400 tracking-wider block uppercase mb-3">
                  Availability Status
                </span>
                <h4 className="text-base font-bold text-[var(--text-title)] mb-4">Active Placement Pipeline</h4>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4 border-t border-[var(--border-primary)]/40 items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-xl border border-emerald-500/15 bg-emerald-500/5 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Open to Placements
                  </span>
                  <span className="px-4 py-2 rounded-xl border border-teal-500/15 bg-teal-500/5 text-teal-400 text-xs font-mono font-semibold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
                    Open to Internships
                  </span>
                  <span className="px-4 py-2 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)]/50 text-[var(--text-muted)] text-xs font-mono flex items-center gap-2">
                    Relocation Open • India
                  </span>
                </div>
                <button 
                  onClick={() => setIsResumeOpen(true)}
                  className="px-7 py-3.5 rounded-xl text-sm font-extrabold bg-[var(--text-title)] text-[var(--bg-base)] hover:scale-[1.03] active:scale-[0.98] spring-transition shadow-lg hover:shadow-indigo-500/10 select-none cursor-pointer"
                >
                  View Resume
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[var(--bg-surface)] border-t border-[var(--border-primary)] text-center text-xs text-[var(--text-muted)] font-mono">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Nitesh Kumar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/Niteshkumar-codes" target="_blank" rel="noreferrer" className="hover:text-[var(--text-title)] spring-transition">GitHub</a>
            <a href="https://www.linkedin.com/in/nitesh-kumar-dev/" target="_blank" rel="noreferrer" className="hover:text-[var(--text-title)] spring-transition">LinkedIn</a>
            <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Stripe & Linear Inspired UI
            </span>
          </div>
        </div>
      </footer>

      {/* Premium Full-Screen Resume Modal Overlay */}
      {isResumeOpen && (
        <div 
          className="fixed inset-0 z-[20000] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8 animate-entry"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsResumeOpen(false);
          }}
        >
          {/* Modal Container (90-95% width, readable height) */}
          <div className="relative w-full max-w-5xl h-[88vh] bg-[var(--bg-base)] border border-[var(--border-primary)] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-entry duration-300">
            
            {/* Header / Top Bar */}
            <div className="bg-[var(--bg-surface)] px-6 py-4 border-b border-[var(--border-primary)] flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-mono text-[var(--text-title)] font-bold uppercase tracking-wider">Nitesh_Kumar_Resume.pdf</span>
              </div>
              <button 
                onClick={() => setIsResumeOpen(false)}
                className="p-2 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-base)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-title)] hover:text-rose-500 spring-transition cursor-pointer"
                aria-label="Close modal"
              >
                <Icons.Close />
              </button>
            </div>

            {/* Document Viewer Frame */}
            <div className="flex-grow w-full h-full bg-[var(--bg-base)]">
              <iframe 
                src="/resume/Nitesh%20Kumar_Resume.pdf#toolbar=0" 
                title="Nitesh Kumar Resume Document"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
