import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-brand-navy-950 py-10 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-slate-400 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Mission */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-white text-sm tracking-tight">
              LifeBridge AI
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-teal-500/10 text-brand-teal-400 border border-brand-teal-500/20">
              PromptWars H2H Entry
            </span>
          </div>
          <p className="text-slate-400 max-w-md">
            From confusion to clarity: turning chaotic crisis & community reports into structured, verified action plans.
          </p>
        </div>

        {/* Ethical Safety Note */}
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-brand-teal-400 shrink-0" />
          <span>Strict Ethical AI: Zero hallucinated emergency contacts or simulated dispatching.</span>
        </div>

        {/* Copyright & credits */}
        <div className="text-slate-400 text-center md:text-right">
          <p>© {new Date().getFullYear()} LifeBridge AI. Built with React, TypeScript & Tailwind CSS.</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Designed for rapid community and disaster assistance triage.</p>
        </div>

      </div>
    </footer>
  );
};
