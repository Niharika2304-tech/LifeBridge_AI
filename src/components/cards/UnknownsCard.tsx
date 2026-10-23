import React from 'react';
import { HelpCircle, AlertCircle, EyeOff, ShieldCheck } from 'lucide-react';

interface UnknownsCardProps {
  unknowns: string[];
}

export const UnknownsCard: React.FC<UnknownsCardProps> = ({ unknowns }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-brand-teal-500/20 shadow-card">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <EyeOff className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Unknown or Unverified Information
            </h3>
            <p className="text-xs text-slate-400">
              Crucial safety variables not confirmed in the report — do not make assumptions
            </p>
          </div>
        </div>

        <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300">
          Safety Audit
        </span>
      </div>

      <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-4 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-200/90 leading-relaxed">
          <strong>Responders Notice:</strong> Critical mistakes occur when assumptions are treated as facts. Verify the following factors with authorities or observers on the scene before initiating invasive interventions:
        </p>
      </div>

      <div className="space-y-2.5">
        {unknowns.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-xl bg-brand-navy-900/60 border border-slate-800/80"
          >
            <div className="mt-1 w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <p className="text-sm text-slate-200 leading-snug">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
