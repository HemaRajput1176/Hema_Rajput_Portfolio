import React, { useState, useEffect } from 'react';

interface NavbarProps {
  resumeUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ resumeUrl = '#' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'ACHIEVEMENTS', href: '#achievements' },
    { label: 'CERTIFICATES', href: '#certificates' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-[#07090e]/80 backdrop-blur-md border-b border-white/[0.06] shadow-sm shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
      role="banner"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand / Name */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 text-slate-100 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded-sm"
          aria-label="Hema Rajput Portfolio Home"
        >
          <span className="text-sm font-semibold tracking-wider uppercase text-slate-100 group-hover:text-white">
            HEMA RAJPUT
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center space-x-6 xl:space-x-8"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[11px] font-medium tracking-widest text-slate-300 hover:text-white transition-colors duration-200 uppercase focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded-sm py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side: Resume Button */}
        <div className="hidden sm:flex items-center">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Resume in new tab"
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-medium tracking-wider text-slate-200 hover:text-white bg-transparent hover:bg-white/[0.04] border border-white/[0.12] hover:border-white/30 rounded transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400"
          >
            <span>RESUME</span>
            <svg
              className="w-3 h-3 text-slate-400 group-hover:text-slate-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400"
          aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07090e]/95 backdrop-blur-xl border-b border-white/[0.08] px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-medium tracking-widest text-slate-300 hover:text-white transition-colors duration-150 uppercase py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/[0.08]">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wider text-slate-200 hover:text-white border border-white/[0.15] rounded hover:bg-white/[0.05] transition-colors duration-200"
              >
                <span>RESUME</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
