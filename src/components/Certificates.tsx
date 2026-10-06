import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Award,
  Calendar,
  ExternalLink,
} from 'lucide-react';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category: string;
  year: string;
  image: string;
  highlight?: string;
}

const certificates: CertificateItem[] = [
  {
    id: 'nasa-space-apps',
    title: 'Galactic Problem Solver',
    issuer: 'NASA International Space Apps Challenge',
    category: 'Global Hackathon',
    year: '2024',
    image: '/certificates/nasa-space-apps.png',
    highlight: 'Global Challenge Participant',
  },
  {
    id: 'ieee-space-2026',
    title: '#IEEESpace2026 Shortlisted Candidate',
    issuer: 'Namaskar Foundation & ISRO Mentor',
    category: 'Space Research',
    year: '2026',
    image: '/certificates/ieee-space-2026.png',
    highlight: 'Guided by ISRO Scientist Mr. Puneet Mishra',
  },
  {
    id: 'ai-mining-conference',
    title: 'AI in Mining Industry National Conference',
    issuer: 'Mining Engineers Association & MBM University',
    category: 'National Conference',
    year: '2025',
    image: '/certificates/ai-mining-conference.png',
    highlight: 'Volunteer & Contributor',
  },
  {
    id: 'paranox-hackathon',
    title: 'Paranox 2.0 Innovation Hackathon',
    issuer: 'TechXNinjas & GitHub Education',
    category: 'Innovation Hackathon',
    year: '2025',
    image: '/certificates/paranox-hackathon.png',
    highlight: '3-Month National Level Hackathon',
  },
  {
    id: 'openai-nxtwave-genai',
    title: 'Generative AI Mastery Workshop',
    issuer: 'OpenAI Academy & NxtWave',
    category: 'Generative AI',
    year: '2025',
    image: '/certificates/openai-nxtwave-genai.png',
    highlight: "India's Biggest GenAI Buildathon",
  },
  {
    id: 'et-ai-hackathon',
    title: 'ET-AI Hackathon Semi-Finalist',
    issuer: 'The Economic Times & Times Internet',
    category: 'AI Hackathon',
    year: '2026',
    image: '/certificates/et-ai-hackathon.png',
    highlight: 'National Semi-Finalist',
  },
  {
    id: 'gdg-google-developer',
    title: 'Google Developer Groups Technical Event',
    issuer: 'Google Developer Groups (GDG)',
    category: 'Developer Community',
    year: '2024',
    image: '/certificates/gdg-google-developer.png',
    highlight: 'Technical Participation',
  },
  {
    id: 'geeksforgeeks',
    title: 'Technical Programming & Problem Solving',
    issuer: 'GeeksforGeeks',
    category: 'Technical Skills',
    year: '2024',
    image: '/certificates/geeksforgeeks.png',
    highlight: 'Core Technical Excellence',
  },
  {
    id: 'dronacharya-international',
    title: 'MAIN 2023 International Event',
    issuer: 'Dronacharya Group of Institutions',
    category: 'International Event',
    year: '2023',
    image: '/certificates/dronacharya-international.jpg',
    highlight: 'International Delegate',
  },
  {
    id: 'vadodara-hackathon',
    title: 'National Innovation Hackathon',
    issuer: 'National Hackathon Chapter',
    category: 'Hackathon',
    year: '2024',
    image: '/certificates/vadodara-hackathon.png',
    highlight: 'Technical Contributor',
  },
];

export const Certificates: React.FC = () => {
  const [cardsPerSlide, setCardsPerSlide] = useState<number>(3);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Responsive breakpoints: Desktop = 3, Tablet = 2, Mobile = 1
  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) {
          setCardsPerSlide(3);
        } else if (window.innerWidth >= 640) {
          setCardsPerSlide(2);
        } else {
          setCardsPerSlide(1);
        }
      }
    };

    updateCardsPerSlide();
    window.addEventListener('resize', updateCardsPerSlide);
    return () => window.removeEventListener('resize', updateCardsPerSlide);
  }, []);

  const totalSlides = Math.ceil(certificates.length / cardsPerSlide);

  // Guard against out-of-bounds slide index on screen resize
  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0);
    }
  }, [totalSlides, currentSlide]);

  // Timer loop: advances every 3 seconds unless paused
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

  // User Actions (Navigation resets the 3-second timer)
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

  // Slice certificates belonging to the current slide
  const startIndex = currentSlide * cardsPerSlide;
  const currentCertificates = certificates.slice(startIndex, startIndex + cardsPerSlide);

  return (
    <section
      id="certificates"
      className="relative w-full bg-[#07090e] border-t border-white/[0.06] pt-6 sm:pt-8 pb-10 sm:pb-14 px-5 sm:px-8 lg:px-12 overflow-hidden text-slate-100"
      aria-label="Certificate Vault Section"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 w-[420px] h-[360px] bg-indigo-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-indigo-400">
                06 — CERTIFICATE VAULT
              </span>
              <div className="w-6 h-[1px] bg-indigo-500/40" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white uppercase leading-tight">
              VERIFIED CREDENTIALS & ACHIEVEMENTS.
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
              Official hackathon recognitions, technical certifications, and engineering honors.
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

          {/* Slide Content with Smooth Framer Motion Transition */}
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
                {currentCertificates.map((cert) => (
                  <article
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className="group relative rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/40 transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm cursor-pointer"
                  >
                    {/* Certificate Preview Frame */}
                    <div className="relative w-full h-[220px] sm:h-[240px] bg-[#090b10] flex items-center justify-center p-3 border-b border-white/[0.06] overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/[0.1] text-[10px] font-mono text-indigo-300 flex items-center gap-1">
                        <Award className="w-3 h-3 text-indigo-400" />
                        <span>{cert.category}</span>
                      </div>

                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/[0.1] text-[10px] font-mono text-slate-300 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{cert.year}</span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5 p-3 text-center">
                        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-xs uppercase tracking-wider text-white font-medium">
                          INSPECT CREDENTIAL
                        </span>
                      </div>
                    </div>

                    {/* Certificate Card Content */}
                    <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-mono text-sm sm:text-[14.5px] font-semibold text-white group-hover:text-indigo-200 transition-colors line-clamp-1">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-sans mt-1 line-clamp-1">
                          {cert.issuer}
                        </p>
                      </div>

                      {cert.highlight && (
                        <div className="mt-3 pt-2.5 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-indigo-300">
                          <span className="truncate">{cert.highlight}</span>
                          <ExternalLink className="w-3 h-3 shrink-0 ml-1 text-slate-400 group-hover:text-indigo-400 transition-colors" />
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
            aria-label="Certificate Carousel Pagination"
          >
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to certificate slide ${index + 1}`}
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
        <div className="mt-6 pt-3 border-t border-white/[0.05] text-center">
          <p className="text-xs font-mono text-slate-400 tracking-wider">
            All certifications, hackathon positions, and awards are officially verified with
            credential authorities.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* FULLSCREEN LIGHTBOX MODAL VIEWER                                   */}
      {/* ------------------------------------------------------------------ */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCert(null)}
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
                  {selectedCert.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#07090e]">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[75vh] w-auto object-contain rounded shadow-lg border border-white/[0.05]"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-2.5 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="truncate">{selectedCert.issuer}</span>
              <span>Year: {selectedCert.year}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
