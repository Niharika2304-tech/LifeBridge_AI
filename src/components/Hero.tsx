import React from 'react';
import { Sparkles, ArrowDown, Shield, HeartPulse, CloudRain, Users, AlertTriangle } from 'lucide-react';

interface HeroProps {
  onScrollToInput: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToInput }) => {
  return (
    <section className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 overflow-hidden tech-grid">
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-brand-teal-500/15 via-brand-teal-600/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-brand-navy-700/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-500/10 border border-brand-teal-500/25 text-brand-teal-300 text-xs font-semibold mb-6 animate-fade-in shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-teal-400" />
          <span>PromptWars H2H Hackathon • Social Impact AI</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          Bridging human needs with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal-300 via-brand-teal-400 to-teal-200 underline decoration-brand-teal-500/30 underline-offset-8">
            intelligent solutions.
          </span>
        </h1>

        {/* Subtitle / Mission Statement */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-8">
          In emergencies and civic breakdowns, real-world reports arrive frantic, disorganized, and fragmented. 
          <strong className="text-white font-semibold"> LifeBridge AI</strong> instantly parses raw human text into prioritized timelines, verified official resources, and structured actions that save lives.
        </p>

        {/* Quick Capabilities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10 text-left">
          <div className="glass-panel-subtle p-3.5 rounded-xl border border-brand-teal-500/15 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Health Concern</p>
              <p className="text-[11px] text-slate-400">Triage & protocols</p>
            </div>
          </div>

          <div className="glass-panel-subtle p-3.5 rounded-xl border border-brand-teal-500/15 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Public Safety</p>
              <p className="text-[11px] text-slate-400">Hazards & perimeters</p>
            </div>
          </div>

          <div className="glass-panel-subtle p-3.5 rounded-xl border border-brand-teal-500/15 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <CloudRain className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Weather Crisis</p>
              <p className="text-[11px] text-slate-400">Floods & warnings</p>
            </div>
          </div>

          <div className="glass-panel-subtle p-3.5 rounded-xl border border-brand-teal-500/15 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10 text-brand-teal-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Community Issue</p>
              <p className="text-[11px] text-slate-400">Relief & utilities</p>
            </div>
          </div>
        </div>

        {/* Scroll CTA */}
        <div className="flex justify-center">
          <button
            onClick={onScrollToInput}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-teal-300 transition-colors py-2 px-4 rounded-full bg-brand-navy-900/60 hover:bg-brand-navy-800 border border-slate-800 group"
          >
            <span>Describe a situation below</span>
            <ArrowDown className="w-3.5 h-3.5 text-brand-teal-400 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
