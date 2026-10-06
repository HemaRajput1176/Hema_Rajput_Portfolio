import React from 'react';
import { motion } from 'framer-motion';

interface BuildCard {
  number: string;
  category: string;
  projectTitle: string;
  projectSubtitle: string;
  description: string;
  flowSteps: string[];
  techStack: string[];
  statusBadge?: string;
}

const buildCards: BuildCard[] = [
  {
    number: '01',
    category: 'INTELLIGENT AI SYSTEMS',
    projectTitle: 'AI TOLL INTELLIGENCE',
    projectSubtitle: 'AI-Based Toll Detection & Fraud Prevention System',
    description:
      'End-to-end AI monitoring system combining vehicle detection, plate OCR, transaction verification, and real-time fraud monitoring.',
    flowSteps: ['DETECT', 'RECOGNIZE', 'VERIFY', 'AUDIT'],
    techStack: ['YOLOv11', 'EasyOCR', 'OpenCV', 'FastAPI', 'PostgreSQL', 'React'],
  },
  {
    number: '02',
    category: 'GENERATIVE AI & AGENTIC SYSTEMS',
    projectTitle: 'G.W.E.N.',
    projectSubtitle: 'Voice, Vision, Gesture & Automation Assistant',
    description:
      'Personalized AI assistant combining voice interaction, local LLMs, memory, vision, gesture recognition, and Windows automation.',
    flowSteps: ['LISTEN', 'REASON', 'PLAN', 'EXECUTE'],
    techStack: ['Python', 'Ollama', 'LangChain', 'LangGraph', 'Whisper', 'OpenCV'],
  },
  {
    number: '03',
    category: 'CYBER DEFENSE',
    projectTitle: 'CYBERNEXUS',
    projectSubtitle: 'AI-Powered Cyber Defense & Security Platform',
    description:
      'AI-driven cybersecurity platform for active security validation, continuous monitoring, investigation, and automated response.',
    statusBadge: 'IN DEVELOPMENT',
    flowSteps: ['ATTACK', 'DETECT', 'INVESTIGATE', 'RESPOND', 'REMEDIATE'],
    techStack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker', 'LangGraph'],
  },
];

export const WhatIBuild: React.FC = () => {
  return (
    <section
      id="what-i-build"
      className="relative w-full bg-[#07090e] pt-6 sm:pt-8 pb-3 sm:pb-4 px-5 sm:px-8 lg:px-12 overflow-hidden border-t border-white/[0.06]"
      aria-label="What I Build Section"
    >
      {/* Background subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-indigo-950/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header with tight, clean spacing */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-indigo-400">
              02 // DOMAINS OF ENGINEERING
            </span>
            <div className="w-6 h-[1px] bg-indigo-500/40" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white uppercase leading-tight">
            WHAT I BUILD.
          </h2>

          <p className="mt-1 text-xs text-slate-400 font-normal">
            From intelligent models to real-world systems.
          </p>
        </motion.div>

        {/* 3 Compact, Unified, Symmetrical Cards (No Empty Space) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {buildCards.map((card, index) => (
            <motion.article
              key={card.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-lg bg-white/[0.02] hover:bg-white/[0.035] border border-white/[0.08] hover:border-indigo-400/30 transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-black/30"
            >
              <div>
                {/* Header: Number, Category Tag, Status */}
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold tracking-widest text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      {card.number}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-300">
                      // {card.category}
                    </span>
                  </div>

                  {card.statusBadge ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-mono tracking-wider uppercase text-amber-300 bg-amber-500/10 border border-amber-500/20">
                      <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                      {card.statusBadge}
                    </span>
                  ) : (
                    <span className="text-[8px] font-mono text-slate-300 uppercase tracking-wider">
                      SYSTEM
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-sm sm:text-[15px] font-semibold tracking-wide text-white group-hover:text-indigo-100 transition-colors mb-1 font-mono">
                  {card.projectTitle}
                </h3>

                {/* Subtitle */}
                <p className="text-[11px] font-medium text-indigo-300/90 mb-2.5 line-clamp-1">
                  {card.projectSubtitle}
                </p>

                {/* Description */}
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3.5">
                  {card.description}
                </p>

                {/* Punchy Lifecycle Flow (Same symmetrical style across all 3 cards) */}
                <div className="p-2.5 rounded bg-black/40 border border-white/[0.05] mb-3.5">
                  <span className="text-[8px] font-mono text-slate-300 uppercase tracking-widest block mb-1.5">
                    LIFECYCLE FLOW:
                  </span>
                  <div className="flex flex-wrap items-center gap-1 text-[9px] font-mono">
                    {card.flowSteps.map((step, sIdx) => (
                      <React.Fragment key={step}>
                        <span className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-300">
                          {step}
                        </span>
                        {sIdx < card.flowSteps.length - 1 && (
                          <span className="text-slate-300 text-[8px]">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compact Tech Tags */}
              <div className="pt-2.5 border-t border-white/[0.05]">
                <div className="flex flex-wrap gap-1">
                  {card.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-300 bg-white/[0.02] border border-white/[0.05] group-hover:border-white/10 group-hover:text-slate-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
