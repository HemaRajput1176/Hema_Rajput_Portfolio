import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';

export interface WallCertificate {
  id: string;
  number: string;
  title: string;
  documentType: string;
  category: string;
  organization: string;
  image: string;
  date?: string;
}

const wallCertificates: WallCertificate[] = [
  {
    id: 'reckon-6',
    number: '01',
    title: 'RECKON 6.0',
    documentType: 'CERTIFICATE OF PARTICIPATION',
    category: 'HACKATHON',
    organization: 'JIET Jodhpur & MBM Team Red Light Green Light',
    image: '/certificates/reckon-6-hackathon.png',
  },
  {
    id: 'adobe-hackathon',
    number: '02',
    title: 'ADOBE INDIA HACKATHON',
    documentType: 'CERTIFICATE OF PARTICIPATION',
    category: 'HACKATHON',
    organization: 'Adobe & MBM Team HackSquad',
    image: '/certificates/adobe-india-hackathon.png',
  },
  {
    id: 'pvghackhub',
    number: '03',
    title: 'PVGHACKHUB 2025',
    documentType: 'CERTIFICATE OF PARTICIPATION',
    category: 'HACKATHON',
    organization: 'PVG College of Engineering & Management, Nashik',
    image: '/certificates/pvghackhub-2025.png',
  },
  {
    id: 'aurigo-infracode',
    number: '04',
    title: 'AURIGO INFRACODE · SYNERGY 25',
    documentType: 'CERTIFICATE OF PARTICIPATION',
    category: 'TECH EVENT',
    organization: 'IIIT Bangalore',
    image: '/certificates/aurigo-infracode-iiitb.png',
  },
  {
    id: 'icici-lombard',
    number: '05',
    title: 'ICICI LOMBARD IGNITING MINDS',
    documentType: 'CERTIFICATE OF PARTICIPATION',
    category: 'TECH EVENT',
    organization: 'IIT Bombay',
    image: '/certificates/icici-lombard-iitb.png',
  },
  {
    id: 'iiit-bhagalpur-ctf',
    number: '06',
    title: "CODE INTRUSION (CTF) · ENYUGMA '26",
    documentType: 'CERTIFICATE OF PARTICIPATION',
    category: 'CYBERSECURITY',
    organization: 'Indian Institute of Information Technology (IIIT), Bhagalpur',
    image: '/certificates/iiit-bhagalpur-enyugma.png',
  },
  {
    id: 'hacksagon-2026',
    number: '07',
    title: 'HACKSAGON 2026 · IDEATION PHASE',
    documentType: 'CERTIFICATE OF PARTICIPATION',
    category: 'HACKATHON',
    organization: 'ABV-IIITM IEEE Student Branch & IEEE MP Section',
    image: '/certificates/hacksagon-iiitm-ieee.png',
  },
  {
    id: 'nasa-space-apps',
    number: '08',
    title: 'NASA INTERNATIONAL SPACE APPS',
    documentType: 'CERTIFICATE OF PARTICIPATION',
    category: 'GLOBAL HACKATHON',
    organization: 'NASA & Space Apps Challenge · Galactic Problem Solver',
    image: '/certificates/nasa-space-apps.png',
  },
  {
    id: 'world-standards-day',
    number: '09',
    title: 'WORLD STANDARDS DAY 2024',
    documentType: 'CERTIFICATE OF APPRECIATION',
    category: 'ACADEMIC HONORS',
    organization: 'Bureau of Indian Standards (BIS) & MBM University Jodhpur',
    image: '/certificates/world-standards-day.png',
  },
];

export const CertificateWall: React.FC = () => {
  const [cardsPerSlide, setCardsPerSlide] = useState<number>(3);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Inspector modal state
  const [inspectIndex, setInspectIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

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

  const totalSlides = Math.ceil(wallCertificates.length / cardsPerSlide);

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
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  // Inspector keyboard & zoom controls
  const handleOpenInspector = (certIndex: number) => {
    setInspectIndex(certIndex);
    setZoomLevel(100);
  };

  const handleCloseInspector = () => {
    setInspectIndex(null);
    setZoomLevel(100);
  };

  const handleInspectorPrev = () => {
    if (inspectIndex !== null) {
      setInspectIndex((inspectIndex - 1 + wallCertificates.length) % wallCertificates.length);
      setZoomLevel(100);
    }
  };

  const handleInspectorNext = () => {
    if (inspectIndex !== null) {
      setInspectIndex((inspectIndex + 1) % wallCertificates.length);
      setZoomLevel(100);
    }
  };

  const zoomIn = () => setZoomLevel((z) => Math.min(200, z + 25));
  const zoomOut = () => setZoomLevel((z) => Math.max(100, z - 25));
  const resetZoom = () => setZoomLevel(100);

  // Esc key listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (inspectIndex === null) return;
      if (e.key === 'Escape') handleCloseInspector();
      if (e.key === 'ArrowLeft') handleInspectorPrev();
      if (e.key === 'ArrowRight') handleInspectorNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectIndex]);

  // Current slice of visible certificates
  const startIndex = currentSlide * cardsPerSlide;
  const currentCertificates = wallCertificates.slice(startIndex, startIndex + cardsPerSlide);

  return (
    <section
      id="certificates"
      className="relative w-full bg-[#07090e] border-t border-white/[0.06] pt-4 sm:pt-5 pb-4 sm:pb-5 px-5 sm:px-8 lg:px-12 overflow-hidden text-slate-100"
      aria-label="Certificate Wall Section"
    >
      {/* Subtle Wall Architectural Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-indigo-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header: Compact & Horizontal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4 sm:mb-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-indigo-400">
                CERTIFICATE WALL
              </span>
              <div className="w-6 h-[1px] bg-indigo-500/40" />
            </div>

            <h2 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-light tracking-wide text-white uppercase leading-tight">
              THE DOCUMENTS BEHIND THE JOURNEY.
            </h2>

            <p className="mt-0.5 text-xs sm:text-[13px] text-slate-400 font-normal leading-relaxed">
              A visual collection of the events, hackathons and learning experiences documented along the way.
            </p>
          </div>

          {/* Autoplay / Slide Counter Status */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/50 border border-white/[0.07] font-mono text-[11px] text-slate-300">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
                }`}
              />
              <span className="text-[10px] sm:text-[11px]">
                {isPaused ? 'PAUSED' : 'AUTO 3s'}
              </span>
            </div>

            <span className="font-mono text-xs text-indigo-300 font-semibold px-2 py-1 rounded bg-white/[0.03] border border-white/[0.07]">
              SLIDE {currentSlide + 1} / {totalSlides}
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* CERTIFICATE GALLERY WALL (Center Certificate Emphasized)         */}
        {/* ---------------------------------------------------------------- */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative group py-2"
        >
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous Certificate Slide"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#080a10]/95 hover:bg-indigo-600 border border-white/[0.12] hover:border-indigo-400 text-slate-300 hover:text-white transition-all flex items-center justify-center shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next Certificate Slide"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#080a10]/95 hover:bg-indigo-600 border border-white/[0.12] hover:border-indigo-400 text-slate-300 hover:text-white transition-all flex items-center justify-center shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Gallery Frames with Center Document Emphasis */}
          <div className="overflow-hidden px-1 py-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-center"
              >
                {currentCertificates.map((cert, idx) => {
                  // In a 3-card desktop slide, index 1 is the CENTER document
                  const isCenter = cardsPerSlide === 3 && idx === 1;

                  return (
                    <div
                      key={cert.id}
                      onClick={() => handleOpenInspector(startIndex + idx)}
                      className={`group relative flex flex-col transition-all duration-300 cursor-pointer ${
                        isCenter
                          ? 'lg:scale-[1.03] lg:z-10'
                          : 'opacity-90 hover:opacity-100'
                      }`}
                    >
                      {/* REFINED DOCUMENT FRAME: No badges on top, actual aspect ratio preserved */}
                      <div
                        className={`relative w-full h-[220px] sm:h-[240px] lg:h-[250px] bg-[#080b11] border rounded-sm p-2 flex items-center justify-center transition-all duration-200 overflow-hidden ${
                          isCenter
                            ? 'border-white/[0.18] shadow-2xl shadow-indigo-950/40 bg-[#0a0d14]'
                            : 'border-white/[0.1] hover:border-white/[0.2] shadow-md shadow-black/60'
                        }`}
                      >
                        {/* Certificate Image: Clean & Unobstructed */}
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-contain group-hover:scale-[1.015] transition-transform duration-200"
                          loading="lazy"
                        />

                        {/* Faint subtle frame hover inspect cue */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                          <div className="p-2 rounded bg-indigo-600/90 text-white shadow-lg flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>INSPECT</span>
                          </div>
                        </div>
                      </div>

                      {/* TINY ARCHIVAL DOCUMENT LABEL (Understated & Compact) */}
                      <div className="pt-2 px-1 flex flex-col gap-0.5">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span className="text-indigo-400 font-semibold tracking-wider">
                            {cert.category}
                          </span>
                          {cert.date && <span>{cert.date}</span>}
                        </div>
                        <div className="text-[11px] font-mono font-medium text-slate-300 truncate">
                          {cert.documentType}
                        </div>
                        <div className="text-xs font-mono font-semibold text-white truncate group-hover:text-indigo-200 transition-colors">
                          {cert.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* BOTTOM PAGINATION DOTS (SLIDE-BASED)                            */}
          {/* -------------------------------------------------------------- */}
          <div
            className="flex items-center justify-center gap-2 mt-4 sm:mt-5"
            role="tablist"
            aria-label="Certificate Wall Pagination"
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

        {/* Section Ending Subtle Documentation Line */}
        <div className="mt-3 pt-2 border-t border-white/[0.05] text-center">
          <p className="text-xs font-mono text-slate-400 tracking-wider">
            Every document marks a moment of learning, building or participation.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* FULLSCREEN CERTIFICATE INSPECTOR (HIGH-RES WITH ZOOM CONTROLS)     */}
      {/* ------------------------------------------------------------------ */}
      {inspectIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between"
          onClick={handleCloseInspector}
        >
          {/* Inspector Top Bar */}
          <div
            className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.08] bg-[#07090e]/80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 truncate pr-4">
              <span className="text-xs font-mono text-indigo-400 font-semibold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                {wallCertificates[inspectIndex].number} · {wallCertificates[inspectIndex].category}
              </span>
              <span className="font-mono text-xs sm:text-sm text-white font-medium truncate">
                {wallCertificates[inspectIndex].title}
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={handleCloseInspector}
              className="p-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.14] text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Inspector"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Inspector Center Image Frame */}
          <div
            className="relative flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Document Button */}
            <button
              onClick={handleInspectorPrev}
              aria-label="Previous Certificate"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-[#080a10]/90 hover:bg-indigo-600 border border-white/[0.15] text-slate-300 hover:text-white transition-colors cursor-pointer shadow-2xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Document Image with Dynamic Zoom Level */}
            <div className="max-w-5xl max-h-[78vh] flex items-center justify-center overflow-auto">
              <img
                src={wallCertificates[inspectIndex].image}
                alt={wallCertificates[inspectIndex].title}
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
                className="max-h-[76vh] w-auto object-contain rounded-sm shadow-2xl border border-white/[0.1] transition-transform duration-200"
              />
            </div>

            {/* Next Document Button */}
            <button
              onClick={handleInspectorNext}
              aria-label="Next Certificate"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-[#080a10]/90 hover:bg-indigo-600 border border-white/[0.15] text-slate-300 hover:text-white transition-colors cursor-pointer shadow-2xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Inspector Bottom Bar: Zoom Controls & Metadata */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-2.5 border-t border-white/[0.08] bg-[#07090e]/80 text-xs font-mono text-slate-400"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="truncate max-w-md">
              {wallCertificates[inspectIndex].organization}
            </span>

            {/* Zoom Toolstrip */}
            <div className="flex items-center gap-2 bg-black/60 px-3 py-1 rounded-md border border-white/[0.08]">
              <button
                onClick={zoomOut}
                disabled={zoomLevel <= 100}
                className="p-1 hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Zoom Out"
                title="Zoom Out (−)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <span className="px-2 font-mono text-[11px] text-indigo-300 min-w-[42px] text-center font-semibold">
                {zoomLevel}%
              </span>

              <button
                onClick={zoomIn}
                disabled={zoomLevel >= 200}
                className="p-1 hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Zoom In"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              <div className="w-[1px] h-3 bg-white/[0.1] mx-1" />

              <button
                onClick={resetZoom}
                className="p-1 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                aria-label="Reset Zoom"
                title="Reset to 100%"
              >
                <RotateCcw className="w-3 h-3" />
                <span>100%</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
