import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ProjectDetail {
  id: string;
  title: string;
  fullTitle: string;
  status: string;
  statusType: 'completed' | 'project' | 'in_development';
  positioning: string;
  problem: string;
  system: string;
  keyComponents?: string[];
  pipelineTitle: string;
  pipelineSteps: string[];
  multimodalFeatures?: string[];
  backendSpecs?: {
    api: string;
    database: string;
    architecture: string;
    auth: string;
    realtime: string;
  };
  screenshots?: {
    url: string;
    caption: string;
    description: string;
  }[];
  result?: string;
  learnings?: string[];
  reportUrl?: string;
  reportTitle?: string;
  techStack: string[];
  tagline?: string;
  scopeNotice?: string;
}

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0d14] border border-white/[0.12] rounded-xl shadow-2xl shadow-black/80 z-10 custom-scrollbar text-slate-200 p-6 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          {/* Top Bar */}
          <div className="flex items-start justify-between pb-4 mb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-indigo-400">
                  SYSTEM LAB // {project.id}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/25">
                  {project.status}
                </span>
              </div>
              <h3
                id="modal-project-title"
                className="text-2xl sm:text-3xl font-light text-white tracking-tight uppercase"
              >
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-indigo-300/90 font-mono mt-1">
                {project.fullTitle}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-md transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tagline / Scope Warning */}
          {project.tagline && (
            <div className="mb-6 p-3 rounded-lg bg-indigo-950/25 border border-indigo-500/20 font-mono text-xs text-indigo-200 tracking-wider">
              <span className="font-semibold text-indigo-300">CORE LIFECYCLE: </span>
              {project.tagline}
            </div>
          )}

          {project.scopeNotice && (
            <div className="mb-6 p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/25 font-mono text-xs text-indigo-200">
              <span className="font-semibold text-indigo-300">NOTICE: </span>
              {project.scopeNotice}
            </div>
          )}

          {/* Official Audit Report Banner */}
          {project.reportUrl && (
            <div className="mb-6 p-4 rounded-lg bg-indigo-950/30 border border-indigo-500/35 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md shadow-indigo-950/40">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mt-0.5 sm:mt-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold tracking-wider text-white uppercase">
                      {project.reportTitle || 'SYSTEM AUDIT REPORT'}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      PDF DOCUMENT
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans mt-0.5">
                    Official Daily Fraud & Toll Operations Telemetry Report (transactions, revenue, fraud detections)
                  </p>
                </div>
              </div>

              <a
                href={project.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs tracking-wider uppercase font-medium transition-colors shadow-sm whitespace-nowrap"
              >
                <span>OPEN REPORT (PDF)</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}

          {/* Screenshots Gallery (Real Uploaded Assets) */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="mb-8">
              <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mb-3">
                SYSTEM INTERFACE TELEMETRY
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screenshots.map((shot, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-lg overflow-hidden bg-black/60 border border-white/[0.08]"
                  >
                    <img
                      src={shot.url}
                      alt={shot.caption}
                      className="w-full h-48 object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="p-3 bg-[#0d121c] border-t border-white/[0.06]">
                      <div className="text-xs font-mono font-medium text-slate-200">
                        {shot.caption}
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                        {shot.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Pipeline Flow */}
          <div className="mb-8 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <div className="text-[11px] font-mono tracking-widest text-indigo-400 uppercase mb-3">
              {project.pipelineTitle}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              {project.pipelineSteps.map((step, idx) => (
                <React.Fragment key={step}>
                  <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-slate-200">
                    {step}
                  </span>
                  {idx < project.pipelineSteps.length - 1 && (
                    <span className="text-indigo-400/80">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {project.multimodalFeatures && (
              <div className="mt-4 pt-3 border-t border-white/[0.06]">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  MULTIMODAL CHANNELS:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.multimodalFeatures.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950/40 border border-indigo-500/25 text-indigo-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Case Study Problem & System Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <div className="text-xs font-mono text-indigo-400 font-medium uppercase tracking-wider mb-2">
                // THE PROBLEM
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <div className="text-xs font-mono text-indigo-300 font-medium uppercase tracking-wider mb-2">
                // THE SYSTEM SOLUTION
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.system}
              </p>
            </div>
          </div>

          {/* Key Components */}
          {project.keyComponents && (
            <div className="mb-8">
              <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mb-3">
                INTEGRATED COMPONENTS
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {project.keyComponents.map((comp) => (
                  <div
                    key={comp}
                    className="p-2.5 rounded bg-white/[0.02] border border-white/[0.05] text-xs font-mono text-slate-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Backend / Database Specs */}
          {project.backendSpecs && (
            <div className="mb-8 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <div className="text-[11px] font-mono tracking-widest text-indigo-400 uppercase mb-3">
                TECHNICAL INFRASTRUCTURE SPECIFICATION
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-300 block text-[10px]">API ARCHITECTURE</span>
                  <span className="text-slate-200">{project.backendSpecs.api}</span>
                </div>
                <div>
                  <span className="text-slate-300 block text-[10px]">DATA PERSISTENCE</span>
                  <span className="text-slate-200">{project.backendSpecs.database}</span>
                </div>
                <div>
                  <span className="text-slate-300 block text-[10px]">SCHEMA DESIGN</span>
                  <span className="text-slate-200">{project.backendSpecs.architecture}</span>
                </div>
                <div>
                  <span className="text-slate-300 block text-[10px]">SECURITY & ACCESS</span>
                  <span className="text-slate-200">{project.backendSpecs.auth}</span>
                </div>
                <div>
                  <span className="text-slate-300 block text-[10px]">REAL-TIME CHANNELS</span>
                  <span className="text-slate-200">{project.backendSpecs.realtime}</span>
                </div>
              </div>
            </div>
          )}

          {/* Results & Engineering Learnings */}
          {project.result && (
            <div className="mb-6 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <div className="text-[11px] font-mono tracking-widest text-indigo-400 uppercase mb-2">
                // SYSTEM OUTCOME
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {project.result}
              </p>
            </div>
          )}

          {project.learnings && (
            <div className="mb-6">
              <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mb-2.5">
                ENGINEERING LEARNINGS
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                {project.learnings.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Footer */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-white/[0.04] border border-white/[0.07]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
            >
              [ CLOSE SPECIFICATION ]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
