import React from 'react';
import { AlertTriangle, Flame, ShieldAlert, AlertCircle, ArrowUpRight } from 'lucide-react';
import { AnalysisResult, UrgencyLevel } from '../../types';

interface UrgencyCardProps {
  urgency: AnalysisResult['urgency'];
}

export const UrgencyCard: React.FC<UrgencyCardProps> = ({ urgency }) => {
  const getUrgencyConfig = (level: UrgencyLevel) => {
    switch (level) {
      case 'critical':
        return {
          title: 'Critical Emergency',
          textColor: 'text-rose-400',
          bgColor: 'bg-rose-500/10',
          borderColor: 'border-rose-500/30',
          badgeBg: 'bg-rose-500 text-brand-navy-950',
          barColor: 'bg-gradient-to-r from-rose-500 to-red-600',
          icon: <Flame className="w-5 h-5 text-rose-400 animate-pulse" />
        };
      case 'high':
        return {
          title: 'High Urgency',
          textColor: 'text-amber-400',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/30',
          badgeBg: 'bg-amber-400 text-brand-navy-950',
          barColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400" />
        };
      case 'moderate':
        return {
          title: 'Moderate Urgency',
          textColor: 'text-sky-400',
          bgColor: 'bg-sky-500/10',
          borderColor: 'border-sky-500/30',
          badgeBg: 'bg-sky-400 text-brand-navy-950',
          barColor: 'bg-gradient-to-r from-teal-500 to-sky-500',
          icon: <ShieldAlert className="w-5 h-5 text-sky-400" />
        };
      case 'low':
      default:
        return {
          title: 'Low Urgency / Routine',
          textColor: 'text-emerald-400',
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/30',
          badgeBg: 'bg-emerald-400 text-brand-navy-950',
          barColor: 'bg-gradient-to-r from-emerald-500 to-teal-500',
          icon: <AlertCircle className="w-5 h-5 text-emerald-400" />
        };
    }
  };

  const config = getUrgencyConfig(urgency.level);
  const percentage = Math.min(100, Math.max(10, urgency.score * 10));

  return (
    <div className={`glass-panel rounded-2xl p-6 sm:p-7 border ${config.borderColor} shadow-card`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl ${config.bgColor} border ${config.borderColor}`}>
            {config.icon}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Urgency Assessment & Threat Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Deterministic priority classification based on life-safety impact
            </p>
          </div>
        </div>

        {/* Big Urgency Badge */}
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider ${config.badgeBg} shadow-sm`}>
            {urgency.level} Priority
          </span>
          <div className="text-right">
            <span className="text-xl font-extrabold text-white font-mono">
              {urgency.score.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500 font-mono">/10</span>
          </div>
        </div>
      </div>

      {/* Visual Score Meter */}
      <div className="mb-5">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-1.5">
          <span>Triage Severity Index</span>
          <span className={config.textColor}>{config.title}</span>
        </div>
        <div className="w-full h-3 bg-brand-navy-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div 
            className={`h-full rounded-full transition-all duration-700 ${config.barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Explanation text */}
      <div className="p-4 rounded-xl bg-brand-navy-900/80 border border-slate-800/90 mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
          Clinical & Situational Rationale
        </h4>
        <p className="text-sm text-slate-200 leading-relaxed">
          {urgency.explanation}
        </p>
      </div>

      {/* Escalation Trigger Alert */}
      {urgency.escalationTrigger && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5">
          <ArrowUpRight className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-rose-300 uppercase tracking-wide">
              Immediate Escalation Trigger:
            </span>
            <p className="text-xs text-rose-200/90 mt-0.5 leading-snug">
              {urgency.escalationTrigger}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
