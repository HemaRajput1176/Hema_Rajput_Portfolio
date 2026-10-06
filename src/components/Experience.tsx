import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Workflow,
  FileText,
  ExternalLink,
  ShieldCheck,
  Maximize2,
  X,
} from 'lucide-react';

interface DocumentItem {
  type: 'certificate' | 'offer';
  title: string;
  previewImage: string;
  pdfUrl: string;
  date: string;
  signee: string;
  pages?: number;
  secondaryImage?: string;
}

interface ExperienceEntry {
  id: string;
  organization: string;
  wing?: string;
  role: string;
  duration: string;
  workMode?: string;
  isPrimary?: boolean;
  categoryTag: string;
  responsibilities: string[];
  techStack?: string[];
  workflowSteps?: string[];
  connectedProject?: {
    label: string;
    targetId: string;
  };
  certificate: DocumentItem;
  offerLetter: DocumentItem;
}

const experiences: ExperienceEntry[] = [
  {
    id: 'cyberpeace',
    organization: 'CyberPeace Foundation',
    wing: 'Research Wing',
    role: 'AI Research Contributor',
    duration: '05 June 2026 — 20 July 2026',
    workMode: 'Remote',
    isPrimary: true,
    categoryTag: 'RESEARCH CONTRIBUTION',
    workflowSteps: [
      'RESEARCH',
      'AI MODEL',
      'COMPUTER VISION',
      'BACKEND',
      'DATABASE',
      'DASHBOARD',
      'MONITORING',
    ],
    responsibilities: [
      'Developed an AI-powered toll monitoring system to automate vehicle detection, license plate recognition, transaction verification and fraud monitoring.',
      'Built an Automatic Number Plate Recognition (ANPR) pipeline using YOLOv11, EasyOCR and OpenCV.',
      'Developed FastAPI REST APIs and integrated them with a 35-table PostgreSQL database architecture.',
      'Built a React-based operational dashboard for monitoring and system interaction.',
      'Implemented AI-driven and rule-based validation workflows for identifying suspicious activity.',
    ],
    techStack: [
      'Python',
      'YOLOv11',
      'EasyOCR',
      'OpenCV',
      'FastAPI',
      'React',
      'PostgreSQL',
      'SQLAlchemy',
      'JWT',
      'WebSockets',
    ],
    connectedProject: {
      label: 'AI TOLL INTELLIGENCE',
      targetId: '#projects',
    },
    certificate: {
      type: 'certificate',
      title: 'Internship Certificate',
      previewImage: '/documents/cyberpeace_cert_page_1.png',
      pdfUrl: '/documents/cyberpeace_cert.pdf',
      date: '30th July, 2026',
      signee: 'Jai Kumar, Secretary CyberPeace',
    },
    offerLetter: {
      type: 'offer',
      title: 'Internship Offer Letter',
      previewImage: '/documents/cyberpeace_offer_page_1.png',
      secondaryImage: '/documents/cyberpeace_offer_page_2.png',
      pdfUrl: '/documents/cyberpeace_offer.pdf',
      date: '3rd June, 2026',
      signee: 'Team HR CyberPeace',
      pages: 2,
    },
  },
  {
    id: 'programmates',
    organization: 'Programmates Pvt. Ltd.',
    role: 'AI & Data Science Intern',
    duration: '15 June 2026 — 30 July 2026',
    categoryTag: 'INDUSTRY INTERNSHIP',
    workflowSteps: [
      'DATA ANALYSIS',
      'ML WORKFLOWS',
      'AI DEVELOPMENT',
      'SOFTWARE SOLUTIONS',
      'TEAM COLLABORATION',
    ],
    responsibilities: [
      'Worked with machine learning workflows and data analysis.',
      'Contributed to software development and data-driven solutions.',
      'Worked on AI development and analytical/problem-solving tasks.',
      'Participated in collaboration and technical team activities.',
    ],
    techStack: [
      'Machine Learning',
      'Data Analysis',
      'AI Development',
      'Software Development',
      'Problem Solving',
      'Team Collaboration',
    ],
    certificate: {
      type: 'certificate',
      title: 'Internship Completion Certificate',
      previewImage: '/documents/programmates_cert_page_1.png',
      pdfUrl: '/documents/programmates_cert.pdf',
      date: '06th August 2026',
      signee: 'Akhlaq Ahmed, Programmates Pvt. Ltd.',
    },
    offerLetter: {
      type: 'offer',
      title: 'Offer of Internship',
      previewImage: '/documents/programmates_offer_page_1.png',
      pdfUrl: '/documents/programmates_offer.pdf',
      date: '10th June 2026',
      signee: 'Akhlaq Ahmed, Programmates Pvt. Ltd.',
    },
  },
];

export const Experience: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);

  // Modal State for inspecting either Certificate or Offer Letter
  const [activeModalDoc, setActiveModalDoc] = useState<DocumentItem | null>(null);
  const [modalPageIndex, setModalPageIndex] = useState<number>(0);

  const handleScrollToProject = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const elem = document.querySelector(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentExp = experiences[currentIndex];

  const openDocumentModal = (doc: DocumentItem) => {
    setActiveModalDoc(doc);
    setModalPageIndex(0);
  };

  return (
    <section
      id="experience"
      className="relative w-full bg-[#07090e] border-t border-white/[0.06] pt-4 sm:pt-5 pb-4 sm:pb-5 px-5 sm:px-8 lg:px-12 overflow-hidden text-slate-100"
      aria-label="Professional Experience Section"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-[420px] h-[360px] bg-indigo-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-xl mb-3 sm:mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-indigo-400">
              EXPERIENCE
            </span>
            <div className="w-6 h-[1px] bg-indigo-500/40" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white uppercase leading-tight">
            BUILDING BEYOND THE CLASSROOM.
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
            Applying AI, software engineering and data-driven problem solving to real-world
            projects and systems.
          </p>
        </div>

        {/* Direct Organization Selectors (No numbering) */}
        <div className="flex items-center gap-2 mb-3">
          {experiences.map((exp, idx) => (
            <button
              key={exp.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                currentIndex === idx
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/40 border border-indigo-400/40 font-semibold'
                  : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] border border-white/[0.06]'
              }`}
            >
              <span className="truncate max-w-[180px] sm:max-w-none">{exp.organization}</span>
            </button>
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* EXPERIENCE CARD (Compact, Corner Date, Single-line Title/Role)    */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.article
              key={currentExp.id}
              initial={{ opacity: 0, x: direction > 0 ? 25 : -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -25 : 25 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`relative rounded-lg bg-white/[0.02] hover:bg-white/[0.03] border transition-all duration-200 p-3.5 sm:p-5 shadow-sm ${
                currentExp.isPrimary
                  ? 'border-indigo-500/30 hover:border-indigo-500/50'
                  : 'border-white/[0.08] hover:border-indigo-400/30'
              }`}
            >
              {/* ---------------------------------------------------------- */}
              {/* TWO-COLUMN LAYOUT:                                         */}
              {/* LEFT: EXPERIENCE DETAILS + SCOPE (SPAN 7)                  */}
              {/* RIGHT: CERTIFICATE DISPLAY + OFFER LETTER (SPAN 5)         */}
              {/* ---------------------------------------------------------- */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                {/* -------------------------------------------------------- */}
                {/* LEFT: EXPERIENCE DETAILS & ENGINEERING SCOPE (SPAN 7)    */}
                {/* -------------------------------------------------------- */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Header: Organization, Role, Badges, Date in corner */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-2.5 mb-3 border-b border-white/[0.06]">
                      <div className="flex-1 min-w-0 pr-2">
                        {/* Organization + Role on one clean line */}
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <h3 className="text-base sm:text-lg font-mono font-semibold tracking-wide text-white">
                            {currentExp.organization}
                          </h3>
                          <span className="text-slate-500 font-mono text-xs hidden sm:inline">·</span>
                          <span className="text-xs sm:text-sm font-medium text-indigo-300 font-mono">
                            {currentExp.role}
                          </span>
                        </div>

                        {/* Badges on a single compact row (no number prefixes) */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          {currentExp.wing && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/[0.04] border border-white/[0.08] text-slate-300">
                              {currentExp.wing}
                            </span>
                          )}
                          {currentExp.workMode && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-indigo-500/10 border border-indigo-500/25 text-indigo-300">
                              {currentExp.workMode}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/[0.02] border border-white/[0.06] text-slate-400">
                            {currentExp.categoryTag}
                          </span>
                        </div>
                      </div>

                      {/* Top-Right Corner Date Badge */}
                      <div className="font-mono text-[11px] sm:text-xs text-slate-300 shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/50 border border-white/[0.08] self-start">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{currentExp.duration}</span>
                      </div>
                    </div>

                    {/* Technical Workflow Strip */}
                    {currentExp.workflowSteps && (
                      <div className="mb-3 p-2 rounded bg-black/40 border border-white/[0.05]">
                        <div className="flex items-center gap-2 text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-semibold mb-1">
                          <Workflow className="w-3 h-3 text-indigo-400" />
                          <span>TECHNICAL SYSTEM WORKFLOW:</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 text-[9.5px] font-mono">
                          {currentExp.workflowSteps.map((step, sIdx) => (
                            <React.Fragment key={step}>
                              <span className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-200">
                                {step}
                              </span>
                              {sIdx < currentExp.workflowSteps!.length - 1 && (
                                <span className="text-indigo-400 text-[9.5px] font-bold">→</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Contributions & Responsibilities */}
                    <div className="mb-3">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 font-medium">
                        KEY CONTRIBUTIONS & ENGINEERING SCOPE:
                      </div>
                      <ul className="space-y-1.5 text-xs sm:text-[12.5px] text-slate-300 font-sans leading-relaxed">
                        {currentExp.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="mb-3 flex flex-wrap items-center gap-1.5">
                      <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-wider mr-1">
                        STACK:
                      </span>
                      {currentExp.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 hover:text-white transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Connected Project CTA Button */}
                  {currentExp.connectedProject && (
                    <div className="pt-2.5 border-t border-white/[0.05] mt-1">
                      <a
                        href={currentExp.connectedProject.targetId}
                        onClick={(e) =>
                          handleScrollToProject(e, currentExp.connectedProject!.targetId)
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600/90 hover:bg-indigo-600 text-white font-mono text-xs uppercase tracking-wider transition-colors shadow-sm shrink-0"
                      >
                        <span className="text-[10px] text-indigo-200">CONNECTED PROJECT:</span>
                        <span className="font-semibold">{currentExp.connectedProject.label}</span>
                        <span className="text-indigo-300">→</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* -------------------------------------------------------- */}
                {/* RIGHT: CERTIFICATE DISPLAY + OFFER LETTER (SPAN 5)       */}
                {/* -------------------------------------------------------- */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-black/40 rounded-lg border border-white/[0.07] p-2.5 sm:p-3">
                  {/* Certificate Top Header */}
                  <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10.5px] font-mono uppercase tracking-wider text-white font-medium">
                        VERIFIED CREDENTIAL
                      </span>
                    </div>
                    <span className="text-[9.5px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      OFFICIAL RECORD
                    </span>
                  </div>

                  {/* CERTIFICATE IMAGE PREVIEW (Compact height, clean) */}
                  <div
                    onClick={() => openDocumentModal(currentExp.certificate)}
                    className="relative group cursor-pointer w-full h-[160px] sm:h-[180px] rounded-md bg-[#0a0d14] border border-white/[0.1] overflow-hidden flex items-center justify-center shadow-inner"
                    title="Click to view full certificate"
                  >
                    <img
                      src={currentExp.certificate.previewImage}
                      alt={currentExp.certificate.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                    />

                    {/* Subtle Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1 p-2 text-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-600/90 flex items-center justify-center text-white shadow-lg">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-white font-medium">
                        VIEW CERTIFICATE
                      </span>
                    </div>
                  </div>

                  {/* Right Column Action Footer: Signee, PDF link, and View Offer Letter Button */}
                  <div className="mt-2 pt-2 border-t border-white/[0.06] flex flex-col gap-2">
                    {/* Signee and View PDF link */}
                    <div className="flex items-center justify-between text-[10.5px] font-mono text-slate-400">
                      <span className="truncate max-w-[170px]">{currentExp.certificate.signee}</span>
                      <a
                        href={currentExp.certificate.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors uppercase font-semibold"
                      >
                        <span>VIEW PDF</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* VIEW OFFER LETTER BUTTON */}
                    <button
                      onClick={() => openDocumentModal(currentExp.offerLetter)}
                      className="w-full py-1.5 px-3 rounded-md bg-white/[0.04] hover:bg-indigo-600/20 text-indigo-300 hover:text-white border border-indigo-500/30 hover:border-indigo-400 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5 text-indigo-400" />
                      <span>VIEW OFFER LETTER</span>
                      <ExternalLink className="w-3 h-3 text-indigo-400" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Section Ending Subtle Philosophy Statement */}
        <div className="mt-3 pt-2 border-t border-white/[0.05] text-center">
          <p className="text-xs font-mono text-slate-400 tracking-wider">
            From research contribution to building integrated AI systems — every experience has
            been part of learning how to turn ideas into working technology.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* FULLSCREEN DOCUMENT LIGHTBOX MODAL (For Offer Letter & Certificate) */}
      {/* ------------------------------------------------------------------ */}
      {activeModalDoc && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalDoc(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] bg-[#0b0e14] border border-white/[0.12] rounded-xl flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.08] bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="font-mono text-sm sm:text-base font-semibold text-white uppercase tracking-wider">
                  {activeModalDoc.title}
                </h3>
              </div>

              {/* Multi-page controls if present (e.g. CyberPeace Offer Letter) */}
              {activeModalDoc.pages && activeModalDoc.pages > 1 && (
                <div className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded border border-white/[0.08]">
                  <button
                    onClick={() => setModalPageIndex(0)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      modalPageIndex === 0
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Page 1
                  </button>
                  <button
                    onClick={() => setModalPageIndex(1)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      modalPageIndex === 1
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Page 2
                  </button>
                </div>
              )}

              <div className="flex items-center gap-3">
                <a
                  href={activeModalDoc.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs uppercase flex items-center gap-1.5 transition-colors"
                >
                  <span>OPEN PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => setActiveModalDoc(null)}
                  className="p-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#07090e]">
              <img
                src={
                  modalPageIndex === 1 && activeModalDoc.secondaryImage
                    ? activeModalDoc.secondaryImage
                    : activeModalDoc.previewImage
                }
                alt={activeModalDoc.title}
                className="max-h-[75vh] w-auto object-contain rounded shadow-lg border border-white/[0.05]"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-2.5 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Date: {activeModalDoc.date}</span>
              <span>{activeModalDoc.signee}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
