import React from 'react';

interface HeroCTAProps {
  className?: string;
}

export const HeroCTA: React.FC<HeroCTAProps> = ({ className = '' }) => {
  const scrollTo = (targetId: string) => {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none ${className}`}
      role="group"
      aria-label="Hero call to action actions"
    >
      {/* Primary CTA: VIEW MY WORK → */}
      <button
        type="button"
        onClick={() => scrollTo('#projects')}
        className="group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-xs sm:text-[13px] font-medium tracking-wider text-slate-100 bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.18] hover:border-white/35 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <span>VIEW MY WORK</span>
        <svg
          className="w-3.5 h-3.5 text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>

      {/* Secondary CTA: LET'S CONNECT */}
      <button
        type="button"
        onClick={() => scrollTo('#contact')}
        className="group relative inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-xs sm:text-[13px] font-medium tracking-wider text-slate-300 hover:text-white bg-transparent hover:bg-white/[0.04] border border-white/[0.12] hover:border-white/25 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <span>LET'S CONNECT</span>
      </button>
    </div>
  );
};
