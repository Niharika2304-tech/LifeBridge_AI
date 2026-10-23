import React from 'react';
import { Settings, ExternalLink, Activity, Sparkles, AlertCircle } from 'lucide-react';

interface NavbarProps {
  onOpenSettings: () => void;
  isLiveApiKey: boolean;
  modelName?: string;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenSettings, 
  isLiveApiKey, 
  modelName = 'Gemini 3.5 Flash',
  onReset 
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-teal-500/10 bg-brand-navy-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button 
          onClick={onReset}
          className="flex items-center gap-3 group text-left transition-transform active:scale-95"
          aria-label="LifeBridge AI Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-teal-500 to-brand-navy-800 p-0.5 shadow-glow-teal flex items-center justify-center">
            <div className="w-full h-full bg-brand-navy-900 rounded-[10px] flex items-center justify-center group-hover:bg-brand-navy-850 transition-colors">
              <Activity className="w-5 h-5 text-brand-teal-400 animate-pulse-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-brand-teal-300 transition-colors">
                LifeBridge<span className="text-brand-teal-400">.AI</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-teal-500/10 text-brand-teal-400 border border-brand-teal-500/20">
                H2H Edition
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Crisis & Community Intelligence Engine
            </p>
          </div>
        </button>

        {/* Status & Actions */}
        <div className="flex items-center gap-3">
          {/* Real Gemini Status Badge */}
          <button
            onClick={onOpenSettings}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
              isLiveApiKey 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
            }`}
            title="Click to view AI Engine status and settings"
          >
            {isLiveApiKey ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold">{modelName} (Live)</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-medium">Demo Mode (Key Needed)</span>
              </>
            )}
          </button>

          {/* Settings / API Key Button */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-brand-navy-800/80 hover:bg-brand-navy-700/80 border border-brand-teal-500/20 hover:border-brand-teal-400/40 text-slate-200 text-xs font-medium transition-all shadow-sm group"
            title="Configure AI & Server Settings"
          >
            <Settings className="w-3.5 h-3.5 text-brand-teal-400 group-hover:rotate-45 transition-transform duration-300" />
            <span className="hidden md:inline">Engine Settings</span>
          </button>

          {/* PromptWars Tag */}
          <a
            href="#problem-statement"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('problem-statement');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-teal-300 transition-colors px-2.5 py-1 rounded-md hover:bg-white/5"
          >
            <span>Hackathon Scope</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>
    </header>
  );
};
