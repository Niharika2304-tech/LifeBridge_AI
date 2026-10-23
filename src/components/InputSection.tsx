import React, { useState } from 'react';
import { 
  Sparkles, 
  HeartPulse, 
  ShieldAlert, 
  CloudRain, 
  Users, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Wand2,
  MapPin
} from 'lucide-react';
import { Category, ExampleScenario } from '../types';
import { EXAMPLE_SCENARIOS } from '../data/examples';

interface InputSectionProps {
  text: string;
  onChangeText: (text: string) => void;
  selectedCategory: Category | 'auto';
  onSelectCategory: (category: Category | 'auto') => void;
  selectedRegion: 'india' | 'international';
  onSelectRegion: (region: 'india' | 'international') => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onLoadExample: (example: ExampleScenario) => void;
  onClear: () => void;
  activeExampleId?: string;
}

export const InputSection: React.FC<InputSectionProps> = ({
  text,
  onChangeText,
  selectedCategory,
  onSelectCategory,
  selectedRegion,
  onSelectRegion,
  onAnalyze,
  isLoading,
  onLoadExample,
  onClear,
  activeExampleId
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);

  const categories: { id: Category | 'auto'; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'auto', 
      label: 'Auto-Detect AI', 
      icon: <Sparkles className="w-4 h-4 text-brand-teal-400" />
    },
    { 
      id: 'health', 
      label: 'Health Concern', 
      icon: <HeartPulse className="w-4 h-4 text-rose-400" />
    },
    { 
      id: 'public_safety', 
      label: 'Public Safety', 
      icon: <ShieldAlert className="w-4 h-4 text-amber-400" />
    },
    { 
      id: 'weather_emergency', 
      label: 'Weather Emergency', 
      icon: <CloudRain className="w-4 h-4 text-sky-400" />
    },
    { 
      id: 'community_issue', 
      label: 'Community Issue', 
      icon: <Users className="w-4 h-4 text-emerald-400" />
    }
  ];

  const handleAnalyzeClick = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setValidationError('Please type or paste a description of the situation to analyze.');
      return;
    }
    if (trimmed.length < 15) {
      setValidationError('Please provide a bit more context (at least 15 characters) so we can extract accurate facts and next steps.');
      return;
    }
    setValidationError(null);
    onAnalyze();
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <section id="input-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-card border border-brand-teal-500/20 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-brand-teal-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Describe the Situation
              </h2>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Type or paste raw field descriptions in your own words.
            </p>
          </div>

          {/* Quick Example Scenarios Pill Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 hidden md:inline">
              Test Scenarios:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {EXAMPLE_SCENARIOS.map((example) => {
                const isActive = activeExampleId === example.id;
                return (
                  <button
                    key={example.id}
                    onClick={() => {
                      setValidationError(null);
                      onLoadExample(example);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-brand-teal-500/20 border-brand-teal-400 text-brand-teal-200 shadow-sm'
                        : 'bg-brand-navy-900/80 hover:bg-brand-navy-800 border-slate-700/60 text-slate-300 hover:text-white'
                    }`}
                    title={example.contextTag}
                  >
                    <span>{example.title.split(' ')[0]}</span>
                    {isActive && <CheckCircle2 className="w-3 h-3 text-brand-teal-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category & Region Selection Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-5">
          {/* Category Selector Tabs */}
          <div className="lg:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Category or Let AI Auto-Detect
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onSelectCategory(cat.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-brand-navy-800 border-brand-teal-400 text-white shadow-glow-teal ring-1 ring-brand-teal-400/50'
                        : 'bg-brand-navy-900/60 hover:bg-brand-navy-850 border-slate-800/80 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="p-1 rounded-md bg-brand-navy-950/80 shrink-0">
                      {cat.icon}
                    </span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Regional Localization Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-teal-400" />
              <span>Resource Localization</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5 bg-brand-navy-950/80 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => onSelectRegion('india')}
                className={`text-xs py-1.5 px-2 rounded-lg font-semibold transition-all ${
                  selectedRegion === 'india'
                    ? 'bg-brand-teal-500/20 text-brand-teal-300 border border-brand-teal-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Localize with 112, IMD mausam, NDMA SACHET"
              >
                🇮🇳 India (112/IMD)
              </button>
              <button
                type="button"
                onClick={() => onSelectRegion('international')}
                className={`text-xs py-1.5 px-2 rounded-lg font-semibold transition-all ${
                  selectedRegion === 'international'
                    ? 'bg-brand-teal-500/20 text-brand-teal-300 border border-brand-teal-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Localize with 911, FEMA, CDC"
              >
                🌐 US / Global
              </button>
            </div>
          </div>
        </div>

        {/* Main Textarea */}
        <div className="relative mb-4">
          <textarea
            value={text}
            onChange={(e) => {
              onChangeText(e.target.value);
              if (validationError && e.target.value.trim().length >= 15) {
                setValidationError(null);
              }
            }}
            rows={7}
            placeholder="Describe the problem in your own words... (e.g. 'There is a live power cable sparking in standing water on Indiranagar road near the school crossing, school gets out in 15 minutes and water is rising...')"
            className="w-full bg-brand-navy-950/90 border border-slate-700/70 focus:border-brand-teal-400 focus:ring-2 focus:ring-brand-teal-500/20 rounded-xl p-4 sm:p-5 text-sm sm:text-base text-slate-100 placeholder:text-slate-500 font-sans focus:outline-none transition-all resize-y min-h-[160px]"
            aria-label="Real-world problem description"
          />

          {/* Action buttons inside / below textarea */}
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            {text && (
              <button
                type="button"
                onClick={onClear}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                title="Clear text"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Character Count & Validation Error */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>{charCount} characters</span>
            <span className="text-slate-600">•</span>
            <span>{wordCount} words</span>
            {text.length > 0 && (
              <>
                <span className="text-slate-600">•</span>
                <span className="text-brand-teal-400">Input preserved in full</span>
              </>
            )}
          </div>

          {validationError && (
            <div className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20 animate-fade-in">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <HelpCircle className="w-3.5 h-3.5 text-brand-teal-400 shrink-0" />
            <span>
              Real-time Google Gemini structuring into verified facts, threat matrix & action steps.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAnalyzeClick}
              disabled={isLoading}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide text-brand-navy-950 transition-all ${
                isLoading 
                  ? 'bg-brand-teal-400/70 cursor-not-allowed opacity-80' 
                  : 'bg-gradient-to-r from-brand-teal-400 via-teal-300 to-brand-teal-400 hover:from-brand-teal-300 hover:to-teal-200 shadow-glow-teal hover:shadow-glow-teal-lg active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-brand-navy-950 border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing with Gemini...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Analyze & Structure</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
