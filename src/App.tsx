import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { CertificateWall } from './components/CertificateWall';
import { Contact } from './components/Contact';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* 
        TRANSPARENT NAVBAR
        Positioned fixed over hero, minimal, transitions to subtle translucent blur on scroll
      */}
      <Navbar resumeUrl="/resume.pdf" />

      <main className="flex-1 w-full">
        {/* 
          HERO SECTION
          Full-bleed video background holding final frame, containing embedded intro text,
          with precisely aligned CTA buttons in negative space
        */}
        <Hero
          videoSrc={`${import.meta.env.BASE_URL}hero-video.mp4`}
          posterSrc={`${import.meta.env.BASE_URL}hero-last-frame.jpg`}
        />

        {/* 
          SECTION 1: ABOUT ME
          Cinematic narrative section transitioning naturally from the hero
        */}
        <About />

        {/* 
          SECTION 2: SELECTED SYSTEMS (PROJECTS)
          Primary systems: AI Toll Intelligence, G.W.E.N., CyberNexus
        */}
        <Projects />

        {/* 
          SECTION 3: TECHNICAL SKILLS / CAPABILITY MAP
          Technologies, frameworks, concepts and tools
        */}
        <Skills />

        {/* 
          SECTION 4: PROFESSIONAL EXPERIENCE
          Applied AI & software engineering roles
        */}
        <Experience />

        {/* 
          COMMUNITY, ACHIEVEMENTS & CERTIFICATES
        */}
        <div className="relative w-full bg-[#07090e] text-slate-300">

          {/* Section: Achievements (Honors, Hackathons & Recognitions Carousel) */}
          <Achievements />

          {/* Section: Certificate Wall (Phase 7 - Physical Gallery with Inspector) */}
          <CertificateWall />

          {/* Section: Contact (Phase 10 - Refined Two-Column Interaction Point) */}
          <Contact />
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-white/[0.06] bg-[#07090e] py-8 text-center text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Hema Rajput. All rights reserved.</p>
          <p className="text-slate-400">Artificial Intelligence & Data Science</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
