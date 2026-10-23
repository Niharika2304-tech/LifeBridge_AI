import React, { useState } from 'react';
import { 
  ListOrdered, 
  CheckSquare, 
  Clock, 
  Users, 
  ShieldCheck, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { AnalysisResult, ActionStep } from '../../types';

interface ActionPlanCardProps {
  steps: AnalysisResult['prioritizedNextSteps'];
}

export const ActionPlanCard: React.FC<ActionPlanCardProps> = ({ steps }) => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const allStepsList = [
    ...(steps.immediate || []),
    ...(steps.shortTerm || []),
    ...(steps.coordination || [])
  ];

  const totalSteps = allStepsList.length;
  const doneCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPct = totalSteps > 0 ? Math.round((doneCount / totalSteps) * 100) : 0;

  const renderStepGroup = (
    title: string, 
    timeframeDesc: string, 
    items: ActionStep[], 
    badgeColor: string,
    accentBorder: string
  ) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="mb-6 last:mb-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badgeColor}`}>
              {title}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              ({timeframeDesc})
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          {items.map((step) => {
            const isDone = !!completedSteps[step.id];
            return (
              <div
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={`group p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isDone 
                    ? 'bg-brand-navy-950/40 border-slate-800/60 opacity-60' 
                    : `bg-brand-navy-900/80 hover:bg-brand-navy-850 ${accentBorder}`
                }`}
              >
                {/* Interactive Checkbox */}
                <button
                  type="button"
                  aria-label={`Mark step ${step.id} as completed`}
                  className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    isDone 
                      ? 'bg-brand-teal-500 border-brand-teal-400 text-brand-navy-950 font-bold' 
                      : 'border-slate-600 group-hover:border-brand-teal-400 bg-brand-navy-950/60'
                  }`}
                >
                  {isDone && <CheckSquare className="w-3.5 h-3.5" />}
                </button>

                {/* Step content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    {step.targetRole && (
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-brand-navy-950 border border-slate-800 text-slate-400">
                        Assigned: {step.targetRole}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500 font-mono">
                      Priority P{step.priority}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${
                    isDone ? 'line-through text-slate-400' : 'text-slate-100 font-medium'
                  }`}>
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-brand-teal-500/20 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-teal-500/10 text-brand-teal-400 border border-brand-teal-500/20">
            <ListOrdered className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Prioritized Action Plan
            </h3>
            <p className="text-xs text-slate-400">
              Sequenced tactical instructions with real-time progress checklist
            </p>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400">Execution Progress</span>
            <p className="text-xs font-mono text-brand-teal-300">
              {doneCount} of {totalSteps} completed ({progressPct}%)
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-brand-teal-500/30 flex items-center justify-center p-1">
            <span className="text-xs font-black text-brand-teal-400 font-mono">
              {progressPct}%
            </span>
          </div>
        </div>
      </div>

      {/* Render the 3 tiers */}
      {renderStepGroup(
        'Phase 1: Immediate Triage', 
        '0 - 15 minutes', 
        steps.immediate, 
        'bg-rose-500/15 text-rose-300 border border-rose-500/30',
        'border-rose-500/20'
      )}

      {renderStepGroup(
        'Phase 2: Short-Term Stabilization', 
        '1 - 6 hours', 
        steps.shortTerm, 
        'bg-amber-500/15 text-amber-300 border border-amber-500/30',
        'border-amber-500/20'
      )}

      {renderStepGroup(
        'Phase 3: Long-Term & Institutional Coordination', 
        'Reporting & Mutual Aid', 
        steps.coordination, 
        'bg-brand-teal-500/15 text-brand-teal-300 border border-brand-teal-500/30',
        'border-brand-teal-500/20'
      )}
    </div>
  );
};
