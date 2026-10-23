import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  RotateCcw, 
  Printer, 
  Share2, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Download
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { SituationSummaryCard } from './cards/SituationSummaryCard';
import { ExtractedFactsCard } from './cards/ExtractedFactsCard';
import { UrgencyCard } from './cards/UrgencyCard';
import { ActionPlanCard } from './cards/ActionPlanCard';
import { UnknownsCard } from './cards/UnknownsCard';
import { VerifiedResourcesCard } from './cards/VerifiedResourcesCard';
import { WhatIfSimulator } from './WhatIfSimulator';

interface ResultsDashboardProps {
  result: AnalysisResult;
  onStartOver: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, onStartOver }) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const formatResultAsMarkdown = (): string => {
    const divider = '========================================';
    const lines = [
      `LIFEBRIDGE AI ACTION BRIEFING`,
      divider,
      `Category: ${result.category.toUpperCase()}`,
      `Urgency Level: ${result.urgency.level.toUpperCase()} (Score: ${result.urgency.score}/10)`,
      `Generated: ${new Date(result.timestamp).toLocaleString()}`,
      `Engine: ${result.modelUsed || 'LifeBridge Intelligence'}`,
      divider,
      `\nSITUATION SUMMARY:`,
      result.situationSummary,
      `\nURGENCY RATIONALE:`,
      result.urgency.explanation,
      result.urgency.escalationTrigger ? `Escalation Trigger: ${result.urgency.escalationTrigger}` : '',
      `\nEXTRACTED FACTS:`,
      ...result.extractedFacts.map(f => `• [${f.label}]: ${f.value}`),
      `\nPRIORITIZED NEXT STEPS:`,
      `Immediate (0-15m):`,
      ...result.prioritizedNextSteps.immediate.map(s => `  [ ] ${s.text} (${s.targetRole || 'Responder'})`),
      `Short-Term (1-6h):`,
      ...result.prioritizedNextSteps.shortTerm.map(s => `  [ ] ${s.text} (${s.targetRole || 'Volunteer'})`),
      `Coordination:`,
      ...result.prioritizedNextSteps.coordination.map(s => `  [ ] ${s.text} (${s.targetRole || 'Community'})`),
      `\nUNKNOWN / UNVERIFIED ITEMS (DO NOT ASSUME):`,
      ...result.unknownOrUnverified.map(u => `• ${u}`),
      `\nVERIFIED OFFICIAL RESOURCES:`,
      ...result.verifiedResources.map(r => `• ${r.name} (${r.agency}): ${r.contact} - ${r.note}`),
      `\nDisclaimer: Informational decision-support tool. Not a 911 dispatch.`
    ];

    return lines.filter(Boolean).join('\n');
  };

  const handleCopy = async () => {
    try {
      const text = formatResultAsMarkdown();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const text = formatResultAsMarkdown();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `LifeBridge AI Action Plan - ${result.category}`,
          text: text
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div id="results-dashboard" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Top Action Bar with Copy Results, Start Over, and Print buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-brand-teal-500/20 no-print">
        <div className="flex items-center gap-3">
          <button
            onClick={onStartOver}
            className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-brand-navy-900 hover:bg-brand-navy-800 border border-slate-700/80 text-slate-300 hover:text-white transition-all shadow-sm group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brand-teal-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Start Over</span>
          </button>

          <span className="text-xs text-slate-500">|</span>

          <div className="flex items-center gap-1.5 text-xs text-brand-teal-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Structured Intelligence Ready</span>
          </div>
        </div>

        {/* Action Buttons: Copy Results, Print, Share */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border transition-all ${
              copied
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm'
                : 'bg-brand-teal-500/15 hover:bg-brand-teal-500/25 border-brand-teal-500/30 hover:border-brand-teal-400 text-brand-teal-300'
            }`}
            title="Copy structured action plan to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-brand-teal-400" />
                <span>Copy Results</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-brand-navy-900 hover:bg-brand-navy-850 border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
            title="Print Field Action Sheet"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-brand-navy-900 hover:bg-brand-navy-850 border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
            title="Share Action Plan"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Structured Dashboard Content Grid */}
      <div className="space-y-6">
        
        {/* 1. Situation Summary Card */}
        <SituationSummaryCard result={result} />

        {/* 2. Urgency and Threat Level Card */}
        <UrgencyCard urgency={result.urgency} />

        {/* 3. Important Extracted Facts Card */}
        <ExtractedFactsCard facts={result.extractedFacts} />

        {/* 4. Prioritized Action Plan & Checkable Next Steps */}
        <ActionPlanCard steps={result.prioritizedNextSteps} />

        {/* 5. Unknown or Unverified Information Card */}
        <UnknownsCard unknowns={result.unknownOrUnverified} />

        {/* 6. Genuinely Verified Official Resources */}
        <VerifiedResourcesCard resources={result.verifiedResources} />

        {/* 7. WHAT IF? Crisis Simulator */}
        <WhatIfSimulator result={result} />

      </div>

      {/* Bottom Start Over Bar */}
      <div className="mt-10 pt-6 border-t border-slate-800 text-center no-print">
        <button
          onClick={onStartOver}
          className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl bg-brand-navy-900 hover:bg-brand-navy-850 border border-brand-teal-500/30 text-slate-200 hover:text-white transition-all shadow-sm"
        >
          <RotateCcw className="w-4 h-4 text-brand-teal-400" />
          <span>Analyze Another Situation (Start Over)</span>
        </button>
      </div>

    </div>
  );
};
