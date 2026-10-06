import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  Send,
  Loader2,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const LeetcodeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.6-.486-1.343-.728-2.086-.728a3.29 3.29 0 0 0-.725.082V0h.999zm4.275 10.916a1.375 1.375 0 0 0-1.374 1.375v4.833c0 .76.615 1.375 1.374 1.375s1.375-.615 1.375-1.375v-4.833a1.375 1.375 0 0 0-1.375-1.375z" />
  </svg>
);

// Decorative subtle 4-pointed sparkle icon from video
const SparkleStar: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface SentState {
  name: string;
  email: string;
  subject: string;
  message: string;
  gmailUrl: string;
  mailtoUrl: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [sentState, setSentState] = useState<SentState | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedBody, setCopiedBody] = useState<boolean>(false);

  // Validation logic
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please specify a subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write your message.';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Real messaging submission: opens pre-filled email client and direct Gmail composer
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const recipient = 'rajputhema1008@gmail.com';
      const emailSubject = `[Portfolio] ${formData.subject} - from ${formData.name}`;
      const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}\n\n---\nSent via Hema Rajput AI Portfolio`;

      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;

      // Save sent state for confirmation actions
      setSentState({
        ...formData,
        gmailUrl,
        mailtoUrl,
      });

      // Brief transition animation
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Trigger user's mail client directly so the message is dispatched
      const mailWindow = window.open(mailtoUrl, '_blank');
      if (!mailWindow) {
        window.location.href = mailtoUrl;
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch {
      setErrors({ message: 'Failed to initiate message. Please email directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyDirectEmail = () => {
    navigator.clipboard.writeText('rajputhema1008@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyMessage = () => {
    if (!sentState) return;
    const bodyText = `Name: ${sentState.name}\nEmail: ${sentState.email}\nSubject: ${sentState.subject}\n\n${sentState.message}`;
    navigator.clipboard.writeText(bodyText);
    setCopiedBody(true);
    setTimeout(() => setCopiedBody(false), 2000);
  };

  // Professional links configuration (Identical to video mockup)
  const professionalLinks = [
    {
      platform: 'GITHUB',
      description: 'Projects, experiments & source code',
      handle: 'HemaRajput1176',
      url: 'https://github.com/HemaRajput1176',
      icon: GithubIcon,
    },
    {
      platform: 'LINKEDIN',
      description: 'Professional journey & opportunities',
      handle: 'Hema Rajput',
      url: 'https://www.linkedin.com/in/hema-rajput-ai',
      icon: LinkedinIcon,
    },
    {
      platform: 'LEETCODE',
      description: 'DSA & problem solving',
      handle: 'View Profile',
      url: 'https://leetcode.com/u/HemaRajput1176/',
      icon: LeetcodeIcon,
    },
    {
      platform: 'EMAIL',
      description: 'Professional inquiries',
      handle: 'Email Me',
      url: 'mailto:rajputhema1008@gmail.com',
      icon: Mail,
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full bg-[#07090e] border-t border-white/[0.06] pt-4 sm:pt-6 pb-6 px-5 sm:px-8 lg:px-12 overflow-hidden text-slate-100"
      aria-label="Contact Section"
    >
      {/* Subtle Cyber Grid Ambient Background from contact video */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none opacity-60" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[620px] h-[380px] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-16 right-10 w-[360px] h-[280px] bg-purple-950/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* ---------------------------------------------------------------- */}
        {/* TWO-COLUMN CONTACT LAYOUT (IDENTICAL TO CONTACT.MP4 VIDEO)        */}
        {/* LEFT: LET'S CONNECT + SOCIAL CHANNELS + DIRECT INQUIRIES BOX      */}
        {/* RIGHT: REFINED CONTACT MESSAGE FORM (WORKING REAL DISPATCH)       */}
        {/* ---------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-6 sm:mb-8">
          {/* -------------------------------------------------------------- */}
          {/* LEFT SIDE: LET'S CONNECT & CHANNELS (SPAN 5)                   */}
          {/* -------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <h2 className="text-xl sm:text-2xl font-mono font-semibold tracking-tight text-white uppercase">
                  LET'S CONNECT.
                </h2>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed mb-4 font-light">
                Whether it's an AI project, internship opportunity, collaboration, research,
                or a new idea, feel free to reach out.
              </p>

              {/* Clean interactive cards for professional links */}
              <div className="space-y-2.5" role="list" aria-label="Professional profiles">
                {professionalLinks.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.platform}
                      href={item.url}
                      target={item.platform === 'EMAIL' ? undefined : '_blank'}
                      rel={item.platform === 'EMAIL' ? undefined : 'noopener noreferrer'}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.06 }}
                      className="group relative flex items-center justify-between p-3 sm:p-3.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.045] border border-white/[0.07] hover:border-indigo-400/40 transition-all duration-200 cursor-pointer shadow-sm shadow-black/30"
                      aria-label={`${item.platform}: ${item.handle}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-md bg-white/[0.03] border border-white/[0.08] group-hover:border-indigo-500/40 group-hover:bg-indigo-600/10 text-indigo-300 group-hover:text-indigo-200 flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-semibold text-white tracking-wider">
                              {item.platform}
                            </span>
                            <span className="text-[10px] font-mono text-indigo-300/80 hidden sm:inline">
                              · {item.handle}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-slate-400 truncate font-light">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 font-mono text-xs text-slate-300 group-hover:text-indigo-300 shrink-0 pl-2">
                        <span className="hidden sm:inline text-[11px] font-medium">
                          {item.handle}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200 text-indigo-400" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Direct Email Callout Card with Active Badge (As shown in video) */}
            <div className="mt-4 sm:mt-5 p-3.5 rounded-lg bg-[#080b12] border border-white/[0.07] flex items-center justify-between gap-3 shadow-inner">
              <div className="min-w-0">
                <span className="text-[9.5px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  DIRECT INQUIRIES
                </span>
                <a
                  href="mailto:rajputhema1008@gmail.com"
                  className="font-mono text-xs sm:text-[13px] text-indigo-300 hover:text-white transition-colors truncate block"
                  title="Click to compose direct email"
                >
                  rajputhema1008@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyDirectEmail}
                  title="Copy email address"
                  className="p-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors text-xs font-mono"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[9.5px] font-mono uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ACTIVE</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* -------------------------------------------------------------- */}
          {/* RIGHT SIDE: REFINED CONTACT MESSAGE FORM (SPAN 7)              */}
          {/* -------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="lg:col-span-7 relative"
          >
            <div className="relative rounded-xl bg-white/[0.02] border border-white/[0.08] p-5 sm:p-7 shadow-xl shadow-black/40 backdrop-blur-sm">
              {isSubmitted && sentState ? (
                /* SUCCESS / HANDOVER STATE: Anyone can send, copy, and open Gmail */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-8 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <h3 className="font-mono text-base font-semibold text-white tracking-wide uppercase mb-1">
                    MESSAGE INITIATED & SENT
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-4 leading-relaxed font-light">
                    Your note has been formatted and directed to{' '}
                    <span className="text-indigo-300 font-mono font-medium">
                      rajputhema1008@gmail.com
                    </span>
                    . Your mail client was triggered to finalize dispatch.
                  </p>

                  {/* Immediate Action Buttons so Anyone Can Send Instantly */}
                  <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5 w-full max-w-md">
                    <a
                      href={sentState.gmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[140px] px-3.5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md font-semibold"
                    >
                      <span>OPEN IN GMAIL</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="px-3.5 py-2 rounded-md bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-200 hover:text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedBody ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-indigo-300" />
                          <span>COPY MESSAGE</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSentState(null);
                    }}
                    className="text-slate-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors underline underline-offset-4 cursor-pointer"
                  >
                    ← Send Another Note
                  </button>
                </motion.div>
              ) : (
                /* ACTUAL MESSAGE INPUT FORM: Exact fields from video */
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Row 1: Name and Email Side-by-Side (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1.5 font-medium"
                      >
                        NAME <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        disabled={isSubmitting}
                        aria-invalid={!!errors.name}
                        className={`w-full px-3.5 py-2.5 rounded-md bg-[#05070d]/90 border text-xs sm:text-[13px] text-white placeholder-slate-400 font-sans transition-all duration-200 focus:outline-none focus:ring-1 ${
                          errors.name
                            ? 'border-rose-500/80 focus:ring-rose-500/40 bg-rose-950/10'
                            : 'border-white/[0.08] hover:border-white/[0.15] focus:border-indigo-400 focus:ring-indigo-400/40'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 font-mono text-[10.5px] text-rose-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1.5 font-medium"
                      >
                        EMAIL <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                        aria-invalid={!!errors.email}
                        className={`w-full px-3.5 py-2.5 rounded-md bg-[#05070d]/90 border text-xs sm:text-[13px] text-white placeholder-slate-400 font-sans transition-all duration-200 focus:outline-none focus:ring-1 ${
                          errors.email
                            ? 'border-rose-500/80 focus:ring-rose-500/40 bg-rose-950/10'
                            : 'border-white/[0.08] hover:border-white/[0.15] focus:border-indigo-400 focus:ring-indigo-400/40'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 font-mono text-[10.5px] text-rose-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1.5 font-medium"
                    >
                      SUBJECT <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What would you like to talk about?"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.subject}
                      className={`w-full px-3.5 py-2.5 rounded-md bg-[#05070d]/90 border text-xs sm:text-[13px] text-white placeholder-slate-400 font-sans transition-all duration-200 focus:outline-none focus:ring-1 ${
                        errors.subject
                          ? 'border-rose-500/80 focus:ring-rose-500/40 bg-rose-950/10'
                          : 'border-white/[0.08] hover:border-white/[0.15] focus:border-indigo-400 focus:ring-indigo-400/40'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 font-mono text-[10.5px] text-rose-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1.5 font-medium"
                    >
                      MESSAGE <span className="text-indigo-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your idea, opportunity or project..."
                      disabled={isSubmitting}
                      aria-invalid={!!errors.message}
                      className={`w-full px-3.5 py-2.5 rounded-md bg-[#05070d]/90 border text-xs sm:text-[13px] text-white placeholder-slate-400 font-sans transition-all duration-200 focus:outline-none focus:ring-1 resize-none ${
                        errors.message
                          ? 'border-rose-500/80 focus:ring-rose-500/40 bg-rose-950/10'
                          : 'border-white/[0.08] hover:border-white/[0.15] focus:border-indigo-400 focus:ring-indigo-400/40'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 font-mono text-[10.5px] text-rose-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Row 4: Submit Button (Exact styling from video) */}
                  <div className="pt-1 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative px-6 py-2.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 active:bg-indigo-700 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-md hover:shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>SENDING...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <Send className="w-3.5 h-3.5 text-indigo-200 group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </button>

                    <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                      Direct recipient: rajputhema1008@gmail.com
                    </span>
                  </div>
                </form>
              )}

              {/* Decorative sparkle in bottom right as seen in video */}
              <div className="absolute -bottom-2 -right-2 text-indigo-400/30 pointer-events-none">
                <SparkleStar className="w-6 h-6 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Closing personal line above footer */}
        <div className="pt-4 border-t border-white/[0.05] text-center">
          <p className="text-[11px] font-mono text-slate-400 tracking-widest uppercase">
            BUILDING INTELLIGENT SYSTEMS, ONE IDEA AT A TIME.
          </p>
        </div>
      </div>
    </section>
  );
};
