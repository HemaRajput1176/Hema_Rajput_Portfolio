import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Award,
  ExternalLink,
} from 'lucide-react';

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  category: string;
  year: string;
  image: string;
  highlight?: string;
}

const achievements: AchievementItem[] = [
  {
    id: 'ai-mining-conference',
    title: 'AI in Mining Industry Conference',
    issuer: 'Mining Engineers Association & MBM',
    category: 'National Conference',
    year: '2025',
    image: '/certificates/ai-mining-conference.png',
    highlight: 'Volunteer & Contributor Award',
  },
  {
    id: 'academic-sports-honors',
    title: 'State Kickboxing & Karate Honors',
    issuer: 'WAKO State Kickboxing & District Karate',
    category: 'Sports Honors',
    year: '2013-2024',
    image: '/certificates/academic-sports-honors.png',
    highlight: 'State Gold Medals, Trophies & Shields',
  },
  {
    id: 'ieee-space-selected-list',
    title: 'IEEE Space 2026: B.Tech Delegate List',
    issuer: 'IEEE Space 2026 & Namaskar Foundation',
    category: 'Space Research',
    year: '2026',
    image: '/certificates/ieee-space-selected-list.png',
    highlight: 'Selected Delegate S.No 53 · MBM University',
  },
  {
    id: 'ieee-space-2026',
    title: '#IEEESpace2026 Selection Candidate',
    issuer: 'Namaskar Foundation & ISRO Mentor',
    category: 'National Selection',
    year: '2026',
    image: '/certificates/ieee-space-2026.png',
    highlight: 'Guided by ISRO Scientist Mr. Puneet Mishra',
  },
  {
    id: 'hackherverse-wtm-gdg',
    title: 'HackHerVerse-1 National Hackathon',
    issuer: 'Women Techmakers & GDG REC',
    category: 'National Hackathon',
    year: '2025',
    image: '/certificates/hackherverse-wtm-gdg.png',
    highlight: 'Team Launchmate Crew · MBM University',
  },
  {
    id: 'paranox-hackathon',
    title: 'Paranox 2.0 National Hackathon',
    issuer: 'TechXNinjas & GitHub Education',
    category: 'Innovation Hackathon',
    year: '2025',
    image: '/certificates/paranox-hackathon.png',
    highlight: '1,552 projects & 20,119 students',
  },
  {
    id: 'openai-nxtwave-genai',
    title: 'GenAI Mastery Workshop',
    issuer: 'OpenAI Academy & NxtWave',
    category: 'Buildathon',
    year: '2025',
    image: '/certificates/openai-nxtwave-genai.png',
    highlight: "India's Biggest GenAI Buildathon",
  },
  {
    id: 'jee-main-city-topper',
    title: 'JEE Main Selection 2023',
    issuer: 'Dronacharya International School',
    category: 'City Topper',
    year: '2023',
    image: '/certificates/jee-main-city-topper.jpg',
    highlight: 'City Topper Felicitation & Ceremony',
  },
  {
    id: 'geeksforgeeks-swag',
    title: 'GeeksforGeeks Technical Recognition',
    issuer: 'GeeksforGeeks',
    category: 'Community Honors',
    year: '2024',
    image: '/certificates/geeksforgeeks-swag.png',
    highlight: 'Official Recognition & Swag Kit',
  },
];

export const Achievements: React.FC = () => {
  const [cardsPerSlide, setCardsPerSlide] = useState<number>(3);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Responsive Breakpoints: Desktop = 3, Tablet = 2, Mobile = 1
  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) {
          setCardsPerSlide(3); // Desktop: exactly 3
        } else if (window.innerWidth >= 640) {
          setCardsPerSlide(2); // Tablet: 2
        } else {
          setCardsPerSlide(1); // Mobile: 1
        }
      }
    };

    updateCardsPerSlide();
    window.addEventListener('resize', updateCardsPerSlide);
    return () => window.removeEventListener('resize', updateCardsPerSlide);
  }, []);

  const totalSlides = Math.ceil(achievements.length / cardsPerSlide);

  // Clamp currentSlide if resize reduces totalSlides
  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0);
    }
  }, [totalSlides, currentSlide]);

  // 3-second auto-slide rotation
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
  }, [isPaused, totalSlides]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer, currentSlide]);

  // Manual actions reset the 3-second timer
  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    startTimer();
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    startTimer();
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    startTimer();
  };

  // Touch Swipe Handlers (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext(); // swipe left -> next
      } else {
        handlePrev(); // swipe right -> prev
      }
    }
    setTouchStartX(null);
  };

  // Slice achievements for current slide
  const startIndex = currentSlide * cardsPerSlide;
  const currentItems = achievements.slice(startIndex, startIndex + cardsPerSlide);

  return (
    <section
      id="achievements"
      className="relative w-full bg-[#07090e] border-t border-white/[0.06] pt-4 sm:pt-5 pb-4 sm:pb-5 px-5 sm:px-8 lg:px-12 overflow-hidden text-slate-100"
      aria-label="Achievements Section"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 w-[420px] h-[360px] bg-indigo-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-indigo-400">
                ACHIEVEMENTS & RECOGNITION
              </span>
              <div className="w-6 h-[1px] bg-indigo-500/40" />
            </div>

            <h2 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-light tracking-wide text-white uppercase leading-tight">
              HONORS, HACKATHONS & RECOGNITIONS.
            </h2>

            <p className="mt-1 text-xs sm:text-[13px] text-slate-400 font-normal leading-relaxed">
              Proven excellence across national AI hackathons, academic competitions, and leadership initiatives.
            </p>
          </div>

          {/* Autoplay / Pause Status Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/50 border border-white/[0.07] font-mono text-[11px] text-slate-300">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
                }`}
              />
              <span className="text-[10px] sm:text-[11px]">
                {isPaused ? 'HOVER PAUSED' : 'AUTO-SLIDE 3s'}
              </span>
            </div>

            <span className="font-mono text-xs text-indigo-300 font-semibold px-2 py-1 rounded bg-white/[0.03] border border-white/[0.07]">
              SLIDE {currentSlide + 1} / {totalSlides}
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* CAROUSEL WRAPPER WITH ARROWS & TOUCH SWIPE                       */}
        {/* ---------------------------------------------------------------- */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative group"
        >
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0a0d14]/90 hover:bg-indigo-600 border border-white/[0.12] hover:border-indigo-400 text-slate-300 hover:text-white transition-all flex items-center justify-center shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0a0d14]/90 hover:bg-indigo-600 border border-white/[0.12] hover:border-indigo-400 text-slate-300 hover:text-white transition-all flex items-center justify-center shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Content with Smooth Transition */}
          <div className="overflow-hidden px-1 py-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
              >
                {currentItems.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => setSelectedAchievement(item)}
                    className="group relative rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/40 transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm cursor-pointer"
                  >
                    {/* ---------------------------------------------------- */}
                    {/* CLEAN IMAGE FRAME: NO TEXT OR OVERLAYS ON TOP        */}
                    {/* (As requested: image ke upar koi text mat dalo)     */}
                    {/* ---------------------------------------------------- */}
                    <div className="relative w-full h-[220px] sm:h-[240px] bg-[#090b10] flex items-center justify-center p-2.5 border-b border-white/[0.06] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* ---------------------------------------------------- */}
                    {/* HORIZONTAL COMPACT METADATA STRIP BELOW THE IMAGE    */}
                    {/* (As requested: text ko horizontal me small & proper) */}
                    {/* ---------------------------------------------------- */}
                    <div className="p-3 sm:p-3.5 flex flex-col gap-1.5">
                      {/* Row 1: Title & Year in one horizontal line */}
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-mono text-xs sm:text-[13px] font-semibold text-white group-hover:text-indigo-200 transition-colors truncate">
                          {item.title}
                        </h3>
                        <span className="shrink-0 text-[10px] font-mono text-slate-400 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06]">
                          {item.year}
                        </span>
                      </div>

                      {/* Row 2: Issuer & Category in one horizontal line */}
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                        <span className="truncate text-slate-400 text-[11px] font-sans">
                          {item.issuer}
                        </span>
                        <span className="shrink-0 text-indigo-400 text-[10.5px] font-medium uppercase tracking-wide">
                          {item.category}
                        </span>
                      </div>

                      {/* Row 3: Highlight pill (small horizontal line) */}
                      {item.highlight && (
                        <div className="flex items-center justify-between text-[10.5px] font-mono text-slate-400 pt-1.5 border-t border-white/[0.05]">
                          <span className="truncate text-indigo-300/80">{item.highlight}</span>
                          <ExternalLink className="w-3 h-3 shrink-0 ml-1 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* BOTTOM PAGINATION DOTS (CALCULATED BY NUMBER OF SLIDES)         */}
          {/* -------------------------------------------------------------- */}
          <div
            className="flex items-center justify-center gap-2 mt-6"
            role="tablist"
            aria-label="Achievements Carousel Pagination"
          >
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={currentSlide === index}
                role="tab"
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === index
                    ? 'w-7 h-2 bg-indigo-500 shadow-md shadow-indigo-500/50'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/45'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Section Ending Subtle Credibility Note */}
        <div className="mt-3 pt-2 border-t border-white/[0.05] text-center">
          <p className="text-xs font-mono text-slate-400 tracking-wider">
            Recognitions across hackathons, academics, and competitive arenas verified by respective organizers.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* FULLSCREEN LIGHTBOX MODAL VIEWER                                   */}
      {/* ------------------------------------------------------------------ */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] bg-[#0b0e14] border border-white/[0.12] rounded-xl flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.08] bg-white/[0.02]">
              <div className="flex items-center gap-2 truncate pr-4">
                <Award className="w-4 h-4 text-indigo-400 shrink-0" />
                <h3 className="font-mono text-sm sm:text-base font-semibold text-white uppercase tracking-wider truncate">
                  {selectedAchievement.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="p-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#07090e]">
              <img
                src={selectedAchievement.image}
                alt={selectedAchievement.title}
                className="max-h-[75vh] w-auto object-contain rounded shadow-lg border border-white/[0.05]"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-2.5 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="truncate">{selectedAchievement.issuer}</span>
              <span>Year: {selectedAchievement.year}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
