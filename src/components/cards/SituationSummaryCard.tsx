import React, { useState } from 'react';
import { FileText, Tag, Sparkles, ChevronDown, ChevronUp, MessageSquareQuote } from 'lucide-react';
import { AnalysisResult } from '../../types';

interface SituationSummaryCardProps {
  result: AnalysisResult;
}

export const SituationSummaryCard: React.FC<SituationSummaryCardProps> = ({ result }) => {
  const [showFullRawInput, setShowFullRawInput] = useState(false);

  const categoryLabels: Record<string, string> = {
    health: 'Health Concern',
    public_safety: 'Public Safety',
    weather_emergency: 'Weather Emergency',
    community_issue: 'Community Issue'
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-brand-teal-500/20 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-teal-500/10 text-brand-teal-400 border border-brand-teal-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Situation Briefing & Summary
            </h3>
            <p className="text-xs text-slate-400">
              Executive synthesis of the incident report
            </p>
          </div>
        </div>

        {/* Provenance Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-3 py-1 rounded-md bg-brand-navy-900 border border-slate-800 text-slate-300">
            {result.isDemoData ? (
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {result.modelUsed || 'Demo Dataset'}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                {result.modelUsed || 'Google Gemini 3.5 Flash'}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Main plain-English executive summary */}
      <div className="p-4 sm:p-5 rounded-xl bg-brand-navy-900/90 border border-slate-800 text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
        {result.situationSummary}
      </div>

      {/* Category classification rationale */}
      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-brand-navy-950/60 border border-brand-teal-500/10 text-xs text-slate-300 mb-4">
        <Tag className="w-4 h-4 text-brand-teal-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white font-semibold">
            {categoryLabels[result.category] || result.category}:
          </strong>{' '}
          <span className="text-slate-400">{result.categoryReasoning}</span>
        </div>
      </div>

      {/* Complete Preserved User Input Section */}
      {result.originalText && (
        <div className="border-t border-slate-800/80 pt-3">
          <button
            type="button"
            onClick={() => setShowFullRawInput(!showFullRawInput)}
            className="flex items-center justify-between w-full text-left py-1 text-xs text-slate-400 hover:text-brand-teal-300 transition-colors group"
          >
            <span className="flex items-center gap-1.5 font-semibold">
              <MessageSquareQuote className="w-3.5 h-3.5 text-brand-teal-400" />
              <span>Complete Preserved User Input ({result.originalText.length} chars)</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-500 group-hover:text-slate-300">
              {showFullRawInput ? 'Collapse' : 'View Full Text'}
              {showFullRawInput ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </span>
          </button>

          {showFullRawInput && (
            <div className="mt-2 p-3.5 rounded-lg bg-brand-navy-950/90 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap break-words animate-fade-in">
              {result.originalText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
