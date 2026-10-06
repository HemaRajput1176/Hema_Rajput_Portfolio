import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full bg-[#07090e] pt-5 sm:pt-6 pb-4 sm:pb-5 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]"
      aria-label="About Me Section"
    >
      {/* Subtle ambient lighting accent */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Typography & Narrative Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            {/* Section Tag */}
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-indigo-400">
                ABOUT ME
              </span>
              <div className="w-8 h-[1px] bg-indigo-500/40" />
            </div>

            {/* Primary Section Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white uppercase leading-tight">
              BEYOND THE CODE.
            </h2>

            {/* Secondary Heading */}
            <h3 className="text-base sm:text-lg font-medium tracking-wide text-indigo-200/90 mt-1.5 mb-5">
              BUILDING INTELLIGENCE INTO REAL SYSTEMS.
            </h3>

            {/* Core Paragraphs */}
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              <p>
                I’m <span className="text-white font-medium">Hema Rajput</span>, an Artificial Intelligence & Data Science undergraduate specializing in Machine Learning, Deep Learning, Generative AI, and Retrieval-Augmented Generation (RAG).
              </p>

              <p>
                I build end-to-end, production-style AI systems using Python, React.js, FastAPI, PostgreSQL, and modern AI frameworks. My work focuses on transforming complex ideas into practical intelligent applications.
              </p>

              <p className="text-slate-300/95">
                I have been recognized nationally through the <span className="text-slate-100 font-medium">IEEE Space B.Tech Initiative</span> and the <span className="text-slate-100 font-medium">Bharatiya Antariksh Hackathon</span> for innovation and technical excellence.
              </p>
            </div>

            {/* Supporting Callout Line with View Resume Link */}
            <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)] shrink-0" />
                <p className="text-xs sm:text-[13px] font-medium tracking-wide text-slate-200 italic">
                  “I build AI systems that move from an idea to a working product.”
                </p>
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono tracking-wider uppercase text-indigo-300 hover:text-white bg-indigo-500/10 hover:bg-indigo-600/25 border border-indigo-500/30 hover:border-indigo-400 transition-all shrink-0 self-start sm:self-auto"
              >
                <span>VIEW RESUME</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Abstract Technical Visual (Inspired by Hero System World) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm shadow-xl shadow-black/30">
              
              {/* Header Telemetry */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SYSTEM_PIPELINE
                </span>
                <span className="text-slate-300 tracking-wider">HR-AI // 2026</span>
              </div>

              {/* Architecture Flow Visual */}
              <div className="my-4 space-y-2.5 font-mono text-xs">
                
                {/* Node 1: Intelligence Engine */}
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-indigo-400/30 transition-colors">
                  <div className="flex items-center justify-between text-slate-300 mb-0.5">
                    <span className="text-indigo-300 text-[11px] font-medium">CORE INTELLIGENCE</span>
                    <span className="text-[9px] text-slate-300">L-01</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">
                    ML • Deep Learning • GenAI • RAG
                  </p>
                </div>

                {/* Connection Line */}
                <div className="flex justify-center -my-1.5">
                  <div className="w-[1px] h-3.5 bg-gradient-to-b from-indigo-500/40 to-blue-500/40" />
                </div>

                {/* Node 2: Production Engineering */}
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-blue-400/30 transition-colors">
                  <div className="flex items-center justify-between text-slate-300 mb-0.5">
                    <span className="text-blue-300 text-[11px] font-medium">FULL-STACK PIPELINE</span>
                    <span className="text-[9px] text-slate-300">L-02</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">
                    Python • FastAPI • React.js • PostgreSQL
                  </p>
                </div>

                {/* Connection Line */}
                <div className="flex justify-center -my-1.5">
                  <div className="w-[1px] h-3.5 bg-gradient-to-b from-blue-500/40 to-purple-500/40" />
                </div>

                {/* Node 3: Recognition */}
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-purple-400/30 transition-colors">
                  <div className="flex items-center justify-between text-slate-300 mb-0.5">
                    <span className="text-purple-300 text-[11px] font-medium">NATIONAL RECOGNITION</span>
                    <span className="text-[9px] text-slate-300">MERIT</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">
                    IEEE Space B.Tech • Bharatiya Antariksh Hackathon
                  </p>
                </div>
              </div>

              {/* Status Footer */}
              <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>STATUS: ACTIVE</span>
                <span className="text-indigo-400/90">END-TO-END</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
