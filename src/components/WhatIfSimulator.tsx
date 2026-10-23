import React from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  Loader2, 
  RotateCcw, 
  ArrowRight, 
  Flame, 
  ShieldAlert, 
  Activity, 
  CheckCircle2,
  GitCompare,
  Info
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { WHAT_IF_SCENARIOS } from '../data/whatIfScenarios';
import { useSimulation } from '../hooks/useSimulation';
import { UrgencyCard } from './cards/UrgencyCard';
import { ActionPlanCard } from './cards/ActionPlanCard';
import { UnknownsCard } from './cards/UnknownsCard';
import { ExtractedFactsCard } from './cards/ExtractedFactsCard';

interface WhatIfSimulatorProps {
  result: AnalysisResult;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ result }) => {
  const {
    simResult,
    loading,
    error,
    selectedScenario,
    setSelectedScenario,
    runSimulation,
    resetSimulation
  } = useSimulation();

  const scenarios = WHAT_IF_SCENARIOS[result.category] || WHAT_IF_SCENARIOS.community_issue || [];

  const handleSimulate = () => {
    if (!selectedScenario) return;
    runSimulation(result, selectedScenario);
  };

  // Calculate score difference
  const scoreDiff = simResult 
    ? Number((simResult.urgency.score - result.urgency.score).toFixed(1))
    : 0;

  return (
    <div className="rounded-2xl border border-brand-teal-500/30 bg-gradient-to-b from-brand-navy-900/90 to-brand-navy-950 p-6 sm:p-7 shadow-card mt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-brand-teal-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-teal-500/15 border border-brand-teal-500/30 text-brand-teal-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white">
                WHAT IF? — Crisis Simulator
              </h3>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-teal-500/15 border border-brand-teal-500/30 text-brand-teal-300 font-semibold">
                Dynamic Stress-Test
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate evolving ground conditions to evaluate how triage, urgency, and action steps adapt
            </p>
          </div>
        </div>

        {simResult && (
          <button
            onClick={resetSimulation}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-brand-navy-800 hover:bg-brand-navy-750 border border-slate-700 text-slate-300 hover:text-white transition-all self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-brand-teal-400" />
            <span>Reset Simulation</span>
          </button>
        )}
      </div>

      {/* Scenario Selector & Controls */}
      <div className="space-y-3 mb-6">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Select a Hypothetical Development:
        </label>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e.target.value)}
            disabled={loading}
            className="flex-1 p-3 rounded-xl bg-brand-navy-950 border border-brand-teal-500/30 text-slate-200 text-sm focus:outline-none focus:border-brand-teal-400 transition-colors disabled:opacity-60"
          >
            <option value="" disabled>
              – Choose a what-if scenario to simulate –
            </option>
            {scenarios.map((scenarioText, idx) => (
              <option key={idx} value={scenarioText} className="bg-brand-navy-900 text-slate-200 py-1">
                {scenarioText}
              </option>
            ))}
          </select>

          <button
            onClick={handleSimulate}
            disabled={!selectedScenario || loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-teal-500/20 hover:bg-brand-teal-500/30 active:bg-brand-teal-500/40 border border-brand-teal-500/50 hover:border-brand-teal-400 text-brand-teal-200 font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-brand-teal-400" />
                <span>Simulating Shift...</span>
              </>
            ) : (
              <>
                <GitCompare className="w-4 h-4 text-brand-teal-400" />
                <span>Simulate Change</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-brand-teal-400 shrink-0" />
          <span>
            Hypothetical scenario inputs are processed securely by Google Gemini 3.5 Flash to project contingency actions.
          </span>
        </p>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wide">
              Simulation Processing Error
            </h4>
            <p className="text-xs text-rose-200/90 mt-0.5">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* SIMULATED RESULTS DISPLAY (NO RAW JSON) */}
      {simResult && (
        <div className="space-y-6 animate-fade-in pt-4 border-t border-brand-teal-500/20">
          
          {/* 1. Clear Prominent HYPOTHETICAL SCENARIO Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-amber-400 text-brand-navy-950 shadow-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  SIMULATION — HYPOTHETICAL SCENARIO
                </span>
                <span className="text-[11px] font-mono text-amber-300 hidden sm:inline">
                  (Unverified Projection)
                </span>
              </div>

              <span className="text-[11px] font-mono text-slate-400">
                Engine: {simResult.modelUsed || 'Google Gemini 3.5 Flash'}
              </span>
            </div>

            <p className="text-xs text-amber-200/90 leading-relaxed mt-2">
              <strong>Simulated Condition:</strong> &ldquo;{selectedScenario}&rdquo;
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Notice: This simulated briefing calculates contingency steps under hypothetical conditions. The verified real-world baseline remains displayed above.
            </p>
          </div>

          {/* 2. Original vs. Updated Comparison Matrix */}
          <div className="rounded-2xl bg-brand-navy-950/80 border border-brand-teal-500/30 p-5">
            <div className="flex items-center gap-2 mb-4">
              <GitCompare className="w-4 h-4 text-brand-teal-400" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Baseline vs. Simulated Contingency Comparison
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Baseline Column */}
              <div className="p-4 rounded-xl bg-brand-navy-900/90 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Original Baseline
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-brand-navy-950 border border-slate-700 text-slate-300">
                      {result.urgency.score.toFixed(1)}/10 &bull; {result.urgency.level.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                    {result.situationSummary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Original Top Priority:
                  </span>
                  <p className="text-xs text-slate-300">
                    {result.prioritizedNextSteps.immediate[0]?.text || 'Initial triage'}
                  </p>
                </div>
              </div>

              {/* Simulated Column */}
              <div className="p-4 rounded-xl bg-brand-teal-950/20 border border-brand-teal-500/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-teal-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-teal-400" />
                      Simulated Update
                    </span>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                      simResult.urgency.score > result.urgency.score
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                        : simResult.urgency.score < result.urgency.score
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-brand-teal-500/20 border-brand-teal-500/40 text-brand-teal-300'
                    }`}>
                      {simResult.urgency.score.toFixed(1)}/10 &bull; {simResult.urgency.level.toUpperCase()}
                      {scoreDiff !== 0 && (
                        <span className="ml-1 text-[10px]">
                          ({scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff})
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-slate-100 leading-relaxed line-clamp-4">
                    {simResult.situationSummary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-teal-500/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal-300 block mb-1">
                    Reprioritized Top Action:
                  </span>
                  <p className="text-xs text-brand-teal-100 font-medium">
                    {simResult.prioritizedNextSteps.immediate[0]?.text || 'Immediate action updated'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Simulated Urgency Assessment & Threat Matrix */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Simulated Urgency & Threat Matrix
              </span>
            </div>
            <UrgencyCard urgency={simResult.urgency} />
          </div>

          {/* 4. Simulated Action Plan & Checkable Checklist */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Simulated Contingency Action Plan
              </span>
            </div>
            <ActionPlanCard steps={simResult.prioritizedNextSteps} />
          </div>

          {/* 5. Simulated Unknowns & Critical Safety Audit */}
          {simResult.unknownOrUnverified && simResult.unknownOrUnverified.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Newly Relevant Unknowns (Safety Audit)
                </span>
              </div>
              <UnknownsCard unknowns={simResult.unknownOrUnverified} />
            </div>
          )}

          {/* 6. Extracted Facts from Simulated Development */}
          {simResult.extractedFacts && simResult.extractedFacts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Updated Parameters & Extracted Facts
                </span>
              </div>
              <ExtractedFactsCard facts={simResult.extractedFacts} />
            </div>
          )}

        </div>
      )}
    </div>
  );
};
