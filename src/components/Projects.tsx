import React, { useState } from 'react';
import { ProjectModal } from './ProjectModal';
import type { ProjectDetail } from './ProjectModal';

export const projectsData: ProjectDetail[] = [
  {
    id: '01',
    title: 'AI TOLL INTELLIGENCE',
    fullTitle: 'AI-Based Intelligent Toll Detection & Fraud Prevention System',
    status: 'COMPLETED SYSTEM',
    statusType: 'completed',
    reportUrl: '/projects/daily-fraud-report.pdf',
    reportTitle: 'DAILY FRAUD AUDIT REPORT',
    positioning:
      'An end-to-end AI-powered toll monitoring system designed to automate vehicle detection, license plate recognition, transaction verification and fraud monitoring.',
    problem:
      'Traditional toll setups suffer from vehicle classification mismatches, stolen or counterfeit plates, evasion incidents, and slow manual auditing, resulting in revenue loss and traffic bottlenecks.',
    system:
      'An end-to-end optical computer vision pipeline integrating YOLOv11 for high-accuracy vehicle localization, EasyOCR for plate alphanumeric transcription, and a FastAPI/PostgreSQL backend for instant ledger verification, fraud flagging, and live operator telemetry.',
    pipelineTitle: 'END-TO-END VISION & FRAUD AUDIT PIPELINE',
    pipelineSteps: [
      'Live Camera Feed',
      'YOLOv11 Vehicle Detection',
      'Plate ROI Localization',
      'EasyOCR Extraction',
      'PostgreSQL Verification',
      'Fraud / Class Mismatch Audit',
      'WebSocket Alert Stream',
      'React Operations Dashboard'
    ],
    keyComponents: [
      'YOLOv11 Vehicle Detection',
      'Adaptive Plate Region Extraction',
      'EasyOCR Dual-Pass Text Filter',
      'PostgreSQL Relational Verification',
      'Fraud Detection & Mismatch Rules',
      'Real-Time WebSocket Streaming',
      'Operations Command Dashboard'
    ],
    backendSpecs: {
      api: 'FastAPI (Python) with asynchronous request handlers',
      database: 'PostgreSQL with relational vehicle & toll event schemas',
      architecture: 'Decoupled CV inference worker + REST & WebSocket API',
      auth: 'Role-based access control (Admin / Operator sessions)',
      realtime: 'WebSocket channel pushing live detections & fraud alerts'
    },
    screenshots: [
      {
        url: '/projects/ai-toll-dashboard.png',
        caption: 'Live Toll Operations AI Command Center V4.2',
        description:
          'Real-time vehicle detection feed, ANPR license plate parsing, active rate calculation, and instant toll pass confirmation.'
      },
      {
        url: '/projects/ai-toll-executive.jpg',
        caption: 'Toll Fraud Operations Executive Command',
        description:
          'Unified operational pulse, revenue leakage tracking, SLA health metrics, and fraud posture analytics.'
      },
      {
        url: '/projects/ai-toll-plate-model.jpg',
        caption: 'Model Inference & License Plate Evidence Analysis',
        description:
          'YOLOv11 vehicle detection and EasyOCR dual-pass text verification with automated risk score calculation.'
      },
      {
        url: '/projects/ai-toll-surveillance.jpg',
        caption: 'National Surveillance Multi-Camera Fleet Command',
        description:
          'Real-time multi-channel video surveillance grid with live RTSP stream ingestion across national highway corridors.'
      },
      {
        url: '/projects/ai-toll-gis-map.jpg',
        caption: 'GIS Spatial Intelligence & Hotspot Command Map',
        description:
          'Interactive Leaflet geographical mapping tracking lane occupancy, risk density, and traffic clusters across plazas.'
      },
      {
        url: '/projects/ai-toll-admin.png',
        caption: 'Security Operations & Governance (SOC) Audit Log',
        description:
          'IAM live session monitoring, SuperAdmin controls, and cryptographic audit log feed for toll system governance.'
      }
    ],
    result:
      'Functional end-to-end system delivering sub-second plate OCR extraction, verified against PostgreSQL databases with real-time classification discrepancy flags and live dashboard updates.',
    learnings: [
      'Optimizing OCR confidence by preprocessing cropped plate ROIs with adaptive thresholding and bilateral filtering.',
      'Designing robust async endpoints in FastAPI to keep high-frequency inference streams from blocking database writes.',
      'Structuring clean relational database schemas for high-frequency toll event auditing.'
    ],
    techStack: [
      'Python',
      'YOLOv11',
      'EasyOCR',
      'OpenCV',
      'FastAPI',
      'React',
      'PostgreSQL'
    ]
  },
  {
    id: '02',
    title: 'G.W.E.N.',
    fullTitle: 'Personalized Voice, Vision, Gesture & Automation Assistant',
    status: 'SYSTEM PROTOTYPE',
    statusType: 'project',
    positioning:
      'A personalized AI assistant combining voice interaction, local LLMs, memory, vision, gesture recognition and system automation.',
    problem:
      'Conventional desktop assistants rely on cloud-dependent APIs with high latency, strict rate limits, severe privacy trade-offs, and single-mode audio interfaces disconnected from visual context and desktop operating system automation.',
    system:
      'G.W.E.N. unifies local speech recognition (Whisper), offline private LLM reasoning (Ollama), visual context analysis and hand gesture recognition (OpenCV), and agentic tool dispatch (LangChain / LangGraph) to automate desktop workflows privately.',
    pipelineTitle: 'MULTIMODAL AGENTIC WORKFLOW PIPELINE',
    pipelineSteps: [
      'Voice / Gesture / Camera Input',
      'Whisper Audio Transcription',
      'Local LLM Reasoning (Ollama)',
      'LangGraph Agent Workflow',
      'Context & Memory Store',
      'OS Automation / Tool Dispatch'
    ],
    multimodalFeatures: [
      'Voice Interaction (Whisper + TTS)',
      'Computer Vision Object / Scene Recognition',
      'Hand Gesture UI Control',
      'Local Face Authentication',
      'Windows OS Task Automation',
      'Long-Term Conversation Memory'
    ],
    keyComponents: [
      'Whisper Offline Speech Processing',
      'Ollama Local LLM Inference',
      'OpenCV Gesture & Face Detection',
      'LangGraph Multi-Step Tool Routing',
      'System Process Automation Hooks',
      'Persistent Interaction Memory'
    ],
    screenshots: [
      {
        url: '/projects/model-training.png',
        caption: 'Sequential Conv2D Neural Network Training & Evaluation',
        description:
          'Epoch-by-epoch loss convergence, accuracy telemetry, and evaluation metrics for custom vision classification models.'
      }
    ],
    result:
      'Working local assistant capable of processing hands-free commands, recognizing custom visual cues, and executing automated desktop routines without external API dependencies.',
    learnings: [
      'Structuring modular LangGraph nodes to allow smooth fallbacks when multimodal context is partially unavailable.',
      'Fine-tuning audio thresholding for Whisper to prevent false wake-word activations in ambient noise.',
      'Managing memory retention without exceeding local LLM context windows.'
    ],
    techStack: [
      'Python',
      'Ollama',
      'Whisper',
      'OpenCV',
      'LangChain',
      'LangGraph'
    ]
  },
  {
    id: '03',
    title: 'CYBERNEXUS',
    fullTitle: 'Automated Threat Emulation, Incident Detection & Response Cyber Range',
    status: 'IN DEVELOPMENT',
    statusType: 'in_development',
    positioning:
      'An integrated security laboratory simulating adversary tactics and automating incident detection, investigation and response pipelines.',
    problem:
      'Security teams and students struggle with fragmented environments that isolate offensive adversary emulation from defensive SOC triage and automated incident response workflows.',
    system:
      'CyberNexus bridges offensive simulations and defensive operations within a containerized range environment, systematically tracking attack paths, triggering detection telemetry, and orchestrating triage playbooks.',
    tagline: 'ATTACK → DETECT → INVESTIGATE → RESPOND → REMEDIATE → RE-TEST',
    scopeNotice:
      'CyberNexus is currently under active development. Lab environments and automated playbooks are designed strictly for authorized, defensive cybersecurity training and educational environments.',
    pipelineTitle: 'CLOSED-LOOP CYBER RANGE LIFECYCLE',
    pipelineSteps: [
      'Authorized Target Scope',
      'Security Validation & Attack Sim',
      'Telemetry Ingestion & Detection',
      'Incident Investigation & Triage',
      'Playbook Response Execution',
      'System Remediation & Re-Test'
    ],
    keyComponents: [
      'Containerized Target Asset Nodes',
      'Multi-Factor Command Auth',
      'Telemetry Log Aggregation',
      'Automated Triage Orchestrator',
      'Attack Path Visualizer',
      'Remediation Feedback Loop'
    ],
    backendSpecs: {
      api: 'FastAPI asynchronous microservice coordinator',
      database: 'PostgreSQL for attack logs, telemetry, and audit state',
      architecture: 'Dockerized lab nodes with isolated virtual networking',
      auth: 'MFA Token-authenticated command center portal',
      realtime: 'Event-driven message routing for incident status updates'
    },
    screenshots: [
      {
        url: '/projects/cybernexus-lab.png',
        caption: 'Nexora Enterprise Lab — Target Asset Matrix',
        description:
          'Virtual enterprise network range featuring DMZ Bastion, Corporate Core DC, Auth DB, Payment Gateway, and Production API nodes with live IP telemetry.'
      },
      {
        url: '/projects/cybernexus-auth.png',
        caption: 'MFA Command Center Authentication Portal',
        description:
          'Role-based access portal requiring dual-factor authentication tokens for operator session provisioning.'
      }
    ],
    result:
      'Architecture and initial target node infrastructure established with live network telemetry tracking; triage and automated response playbooks currently in active development.',
    learnings: [
      'Isolating Docker network interfaces to prevent unintended egress during attack emulation scripts.',
      'Designing reproducible incident log formats that map directly to standard detection rule schemas.',
      'Constructing fail-safe containment mechanisms to keep lab environments strictly confined.'
    ],
    techStack: [
      'Python',
      'FastAPI',
      'React',
      'PostgreSQL',
      'Docker',
      'LangGraph'
    ]
  }
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  // Compact flow steps
  const getShortFlow = (id: string) => {
    switch (id) {
      case '01':
        return ['CAMERA', 'YOLOv11', 'PLATE OCR', 'VERIFY', 'AUDIT'];
      case '02':
        return ['VOICE', 'WHISPER', 'LOCAL LLM', 'GRAPH', 'EXECUTE'];
      case '03':
        return ['ATTACK', 'DETECT', 'TRIAGE', 'RESPOND', 'RE-TEST'];
      default:
        return [];
    }
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-[#07090e] border-t border-white/[0.06] pt-4 sm:pt-5 pb-4 sm:pb-5 px-5 sm:px-8 lg:px-12 overflow-hidden text-slate-100"
      aria-label="Selected Systems Section"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-indigo-950/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header with Minimal Tight Spacing */}
        <div className="max-w-xl mb-3 sm:mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-indigo-400">
              SELECTED SYSTEMS
            </span>
            <div className="w-5 h-[1px] bg-indigo-500/40" />
          </div>

          <h2 className="text-xl sm:text-2xl font-light tracking-tight text-white uppercase leading-tight">
            BUILT TO SOLVE REAL PROBLEMS.
          </h2>

          <p className="mt-0.5 text-xs text-slate-400 font-normal">
            A selection of AI systems built across intelligent automation, computer vision,
            generative AI and cybersecurity.
          </p>
        </div>

        {/* 3 Compact, Unified Cards (Dense text layout, no gaps, identical theme) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 lg:gap-4">
          {projectsData.map((project) => {
            const shortFlow = getShortFlow(project.id);
            const previewShot = project.screenshots?.[0];

            return (
              <article
                key={project.id}
                className="group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.035] border border-white/[0.08] hover:border-indigo-400/30 transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-black/30 overflow-hidden"
              >
                <div>
                  {/* Project Title with Status */}
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <h3 className="text-sm sm:text-[14.5px] font-semibold tracking-wide text-white group-hover:text-indigo-200 transition-colors font-mono uppercase">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[9px] text-indigo-300 px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 uppercase tracking-wider shrink-0">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-[10.5px] font-medium text-slate-400 mb-2 line-clamp-1">
                    {project.fullTitle}
                  </p>

                  {/* Screenshot Preview */}
                  {previewShot && (
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer group/shot relative rounded-md overflow-hidden bg-black/60 border border-white/[0.06] hover:border-indigo-500/40 transition-all mb-2 aspect-[16/9]"
                      title="Click to view full architecture & telemetry"
                    >
                      <img
                        src={previewShot.url}
                        alt={previewShot.caption}
                        className="w-full h-full object-cover object-top group-hover/shot:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[8px] text-indigo-300 tracking-wider">
                        {previewShot.caption}
                      </div>
                      <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[8px] text-slate-300 flex items-center gap-1">
                        <span>EXPAND</span>
                        <span className="text-indigo-400">↗</span>
                      </div>
                    </div>
                  )}

                  {/* Description: Snug, tight leading */}
                  <p className="text-[11px] text-slate-300 leading-snug font-light mb-2 line-clamp-2">
                    {project.positioning}
                  </p>

                  {/* Compact Lifecycle Flow */}
                  <div className="p-1.5 rounded bg-black/40 border border-white/[0.05] mb-2">
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                      LIFECYCLE FLOW:
                    </span>
                    <div className="flex flex-wrap items-center gap-1 text-[8.5px] font-mono">
                      {shortFlow.map((step, sIdx) => (
                        <React.Fragment key={step}>
                          <span className="px-1.5 py-0.2 rounded bg-white/[0.04] border border-white/[0.06] text-slate-300">
                            {step}
                          </span>
                          {sIdx < shortFlow.length - 1 && (
                            <span className="text-indigo-400 text-[8px]">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Tech Stack & Actions */}
                <div className="pt-2 border-t border-white/[0.05] mt-auto">
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="inline-block px-1.5 py-0.5 rounded text-[8.5px] font-mono text-slate-300 bg-white/[0.02] border border-white/[0.05]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[8.5px] font-mono text-indigo-300/80 bg-white/[0.02] border border-white/[0.05]">
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {project.reportUrl ? (
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[11px] tracking-wider uppercase font-medium transition-all shadow-sm"
                      >
                        <span>EXPLORE</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>

                      <a
                        href={project.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-indigo-500/40 hover:border-indigo-400 text-indigo-200 hover:text-white font-mono text-[11px] tracking-wider uppercase font-medium transition-all"
                        title="Open Daily Fraud Audit Report PDF"
                      >
                        <span>REPORT</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[11px] tracking-wider uppercase font-medium transition-all shadow-sm"
                    >
                      <span>EXPLORE SYSTEM</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Deep Specification & Architecture Telemetry Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
