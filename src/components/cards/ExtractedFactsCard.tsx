import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Users, 
  AlertTriangle, 
  Clock, 
  Layers 
} from 'lucide-react';
import { ExtractedFact } from '../../types';

interface ExtractedFactsCardProps {
  facts: ExtractedFact[];
}

export const ExtractedFactsCard: React.FC<ExtractedFactsCardProps> = ({ facts }) => {
  const getCategoryIcon = (category: ExtractedFact['category']) => {
    switch (category) {
      case 'location':
        return <MapPin className="w-4 h-4 text-sky-400 shrink-0" />;
      case 'people':
        return <Users className="w-4 h-4 text-rose-400 shrink-0" />;
      case 'hazard':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'time':
        return <Clock className="w-4 h-4 text-teal-400 shrink-0" />;
      default:
        return <Layers className="w-4 h-4 text-slate-400 shrink-0" />;
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-brand-teal-500/20 shadow-card">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Important Extracted Facts
            </h3>
            <p className="text-xs text-slate-400">
              Unabbreviated verified entities, locations, timelines, and actors
            </p>
          </div>
        </div>

        <span className="text-xs font-mono px-2.5 py-1 rounded bg-brand-navy-900 border border-slate-800 text-slate-400">
          {facts.length} Verified Parameters
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {facts.map((fact, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-brand-navy-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                {getCategoryIcon(fact.category)}
                <span className="uppercase tracking-wider text-[11px] font-mono">{fact.label}</span>
              </div>

              {fact.confidence && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                  fact.confidence === 'high' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : fact.confidence === 'medium'
                    ? 'bg-brand-teal-500/10 text-brand-teal-400 border border-brand-teal-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {fact.confidence} confidence
                </span>
              )}
            </div>

            {/* Complete, unabbreviated text value */}
            <p className="text-sm font-medium text-slate-100 leading-relaxed break-words whitespace-normal">
              {fact.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
