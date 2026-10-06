import React from 'react';

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'AI & MACHINE LEARNING',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Neural Networks (CNNs / RNNs)',
      'Transformers',
      'Natural Language Processing (NLP)',
      'Retrieval-Augmented Generation (RAG)',
      'Agentic AI',
    ],
  },
  {
    title: 'GENERATIVE AI & AGENTS',
    skills: [
      'LangChain',
      'LangGraph',
      'Model Context Protocol (MCP)',
      'Multi-Agent Workflows',
      'LLM Orchestration',
      'Prompt Engineering',
    ],
  },
  {
    title: 'DATA SCIENCE & ANALYTICS',
    skills: [
      'NumPy',
      'Pandas',
      'Matplotlib',
      'Seaborn',
      'Data Cleaning',
      'Exploratory Data Analysis',
      'Data Visualization',
    ],
  },
  {
    title: 'PROGRAMMING & WEB',
    skills: [
      'Python',
      'React.js',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Component Architecture',
    ],
  },
  {
    title: 'BACKEND & APIS',
    skills: [
      'FastAPI',
      'RESTful APIs',
      'Asynchronous Programming',
      'JWT Authentication & RBAC',
      'WebSockets',
      'API Design',
    ],
  },
  {
    title: 'DATABASES & DEVOPS',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'Docker & Containerization',
      'CI/CD Pipelines',
      'Git & Version Control',
      'SQLAlchemy',
    ],
  },
];

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative w-full bg-[#07090e] border-t border-white/[0.06] pt-4 sm:pt-5 pb-4 sm:pb-5 px-5 sm:px-8 lg:px-12 overflow-hidden text-slate-100"
      aria-label="Technical Stack Section"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[360px] bg-indigo-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-xl mb-3 sm:mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-indigo-400">
              TECHNICAL STACK
            </span>
            <div className="w-6 h-[1px] bg-indigo-500/40" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white uppercase leading-tight">
            BUILT WITH THE RIGHT TOOLS.
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
            Technologies and technical foundations I use to design, develop and integrate
            intelligent systems.
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* UNIFIED SKILLS GRID: Professional, Clean, Zero Symbols           */}
        {/* ---------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
          {skillCategories.map((group) => (
            <div
              key={group.title}
              className="p-3.5 sm:p-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.035] border border-white/[0.07] hover:border-indigo-500/30 transition-all duration-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.05]">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                    {group.title}
                  </h3>
                  <span className="font-mono text-[10px] text-slate-400">
                    {group.skills.length} skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded bg-white/[0.03] hover:bg-indigo-600/15 border border-white/[0.07] hover:border-indigo-500/40 text-slate-200 text-xs font-mono transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section End Subtle Philosophy Note */}
        <div className="pt-3 border-t border-white/[0.05] text-center">
          <p className="text-xs font-mono text-slate-400 tracking-wider">
            Tools change. The ability to build with them matters more.
          </p>
        </div>
      </div>
    </section>
  );
};
