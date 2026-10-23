import React, { useEffect, useState } from 'react';
import { Sparkles, ShieldCheck, Activity, Search, Compass } from 'lucide-react';

interface LoadingOverlayProps {
  category: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ category }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Ingesting unstructured field text', subtitle: 'Normalizing vocabulary & entity markers' },
    { title: 'Classifying hazard vectors & urgency', subtitle: 'Detecting acute life-safety risk triggers' },
    { title: 'Cross-referencing verified official protocols', subtitle: 'Checking CDC, FEMA, EPA & emergency registries' },
    { title: 'Synthesizing actionable clarity', subtitle: 'Prioritizing checklists and identifying unknown variables' },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 350);
    const timer2 = setTimeout(() => setCurrentStep(2), 700);
    const timer3 = setTimeout(() => setCurrentStep(3), 1050);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="glass-panel rounded-2xl p-8 border border-brand-teal-500/30 text-center relative overflow-hidden">
        
        {/* Animated glowing backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-teal-500/10 via-brand-navy-800/40 to-brand-teal-500/10 animate-pulse-slow" />

        <div className="relative z-10 max-w-md mx-auto">
          {/* Animated spinner */}
          <div className="w-16 h-16 mx-auto mb-6 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-brand-teal-500/20" />
            <div className="absolute inset-0 rounded-full border-4 border-brand-teal-400 border-t-transparent animate-spin" />
            <Sparkles className="w-6 h-6 text-brand-teal-400 animate-pulse" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Structuring Chaos Into Clarity...
          </h3>
          <p className="text-xs text-brand-teal-300 font-mono mb-6 uppercase tracking-wider">
            Domain: {category === 'auto' ? 'AI Auto-Detecting' : category.replace('_', ' ')}
          </p>

          {/* Stepper */}
          <div className="space-y-3 text-left">
            {steps.map((step, idx) => {
              const isPast = idx < currentStep;
              const isCurrent = idx === currentStep;
              return (
                <div 
                  key={idx}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all ${
                    isCurrent 
                      ? 'bg-brand-teal-500/15 border-brand-teal-400/50 text-white' 
                      : isPast 
                      ? 'bg-brand-navy-900/60 border-brand-teal-500/20 text-slate-300' 
                      : 'bg-brand-navy-950/40 border-slate-800/50 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="mt-0.5">
                    {isPast ? (
                      <div className="w-4 h-4 rounded-full bg-brand-teal-500 flex items-center justify-center text-[10px] text-brand-navy-950 font-bold">
                        ✓
                      </div>
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-brand-teal-400 border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold leading-tight">{step.title}</p>
                    <p className="text-[11px] text-slate-400">{step.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};
