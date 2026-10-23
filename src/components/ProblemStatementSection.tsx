import React from 'react';

export const ProblemStatementSection: React.FC = () => {
  return (
    <section id="problem-statement" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800/80">
      <div className="glass-panel-subtle rounded-2xl p-6 sm:p-8 border border-slate-800">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-brand-teal-500/10 text-brand-teal-300 text-xs font-semibold border border-brand-teal-500/20">
            PromptWars H2H Problem Statement
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
          "Convert messy real-world information into structured, useful actions that benefit society."
        </h3>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          During real-world emergencies, high heatwaves, municipal water shutoffs, and downed electrical wires, human reports are flooded with panic, missing details, emotion, and conflicting advice. LifeBridge AI bridges the gap between chaotic human communication and reliable institutional response.
        </p>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-brand-navy-900/60 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-brand-teal-500/10 flex items-center justify-center text-brand-teal-400 mb-3 font-bold text-sm">
              01
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Entity & Hazard Extraction</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Isolates the precise addresses, vulnerable people (elderly, infants), timelines, and active environmental risks from chaotic prose.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-brand-navy-900/60 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 mb-3 font-bold text-sm">
              02
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Triaged Urgency Index</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides deterministic 1-10 severity metrics and clinical rationales, pointing out escalation indicators before conditions degrade.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-brand-navy-900/60 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 mb-3 font-bold text-sm">
              03
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Genuine Verified Public Links</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Eliminates AI hallucinations by cross-referencing strictly authenticated registries (CDC, Poison Help, FEMA, Red Cross, 311).
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
