import React, { useState, useEffect } from 'react';
import { Category, AnalysisResult, ExampleScenario } from './types';
import { analyzeReport, getServerStatus, setServerApiKey } from './services/analyzer';
import { Navbar } from './components/Navbar';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Hero } from './components/Hero';
import { InputSection } from './components/InputSection';
import { LoadingOverlay } from './components/LoadingOverlay';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ProblemStatementSection } from './components/ProblemStatementSection';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Footer } from './components/Footer';
import { AlertCircle, Key, Eye } from 'lucide-react';

export function App() {
  const [text, setText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'auto'>('auto');
  const [selectedRegion, setSelectedRegion] = useState<'india' | 'international'>('india');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [activeExampleId, setActiveExampleId] = useState<string | undefined>(undefined);
  
  // Real-time server-side Gemini status state
  const [isServerKeyConfigured, setIsServerKeyConfigured] = useState<boolean>(false);
  const [activeModelName, setActiveModelName] = useState<string>('Gemini 3.5 Flash');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Check server configuration on mount
  useEffect(() => {
    checkServerConfig();
  }, []);

  const checkServerConfig = async () => {
    try {
      const status = await getServerStatus();
      setIsServerKeyConfigured(status.configured);
      if (status.model) {
        setActiveModelName(status.model);
      }
    } catch (e) {
      console.warn('Failed to fetch server status:', e);
    }
  };

  const handleSaveServerKey = async (key: string) => {
    const res = await setServerApiKey(key);
    // Also save in localStorage for client consistency
    if (key.trim()) {
      localStorage.setItem('lifebridge_gemini_key', key.trim());
    } else {
      localStorage.removeItem('lifebridge_gemini_key');
    }
    await checkServerConfig();
    return res;
  };

  const handleClearServerKey = async () => {
    await setServerApiKey('');
    localStorage.removeItem('lifebridge_gemini_key');
    await checkServerConfig();
  };

  const handleLoadExample = (example: ExampleScenario) => {
    setText(example.messyText);
    setSelectedCategory(example.category);
    setActiveExampleId(example.id);
    if (example.region) {
      setSelectedRegion(example.region);
    }
    setError(null);
    setWarningMessage(null);

    const inputElement = document.getElementById('input-section');
    inputElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleClear = () => {
    setText('');
    setActiveExampleId(undefined);
    setError(null);
    setWarningMessage(null);
  };

  const handleStartOver = () => {
    setResult(null);
    setError(null);
    setWarningMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyze = async (forceDemoPreview: boolean = false) => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);
    setWarningMessage(null);

    try {
      const { result: analysisResult, isLiveGemini, warning } = await analyzeReport(text, {
        category: selectedCategory,
        region: selectedRegion,
        allowFallback: forceDemoPreview
      });

      // Successful analysis!
      setResult(analysisResult);
      if (warning) {
        setWarningMessage(warning);
      }
      
      // Show "Live Gemini" only after a successful Gemini API response
      if (isLiveGemini) {
        setIsServerKeyConfigured(true);
      }

      // Smooth scroll to results dashboard
      setTimeout(() => {
        const dashboardElement = document.getElementById('results-dashboard');
        dashboardElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err: any) {
      console.error('Analysis error:', err);
      // Requirement 6: If the request fails, display a clear error rather than silently using demo data
      setResult(null);
      setError(err.message || 'An unexpected error occurred while analyzing the report.');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToInput = () => {
    const inputElement = document.getElementById('input-section');
    inputElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-brand-navy-950 text-slate-100 flex flex-col font-sans">
      {/* Top Emergency Disclaimer with India 112 & Intl 911 */}
      <DisclaimerBanner />

      {/* Navigation Header */}
      <Navbar 
        onOpenSettings={() => setIsSettingsOpen(true)}
        isLiveApiKey={isServerKeyConfigured}
        modelName={activeModelName}
        onReset={handleStartOver}
      />

      <main className="flex-1">
        {/* Hero Section with exact "Bridging human needs with intelligent solutions." headline */}
        <Hero onScrollToInput={scrollToInput} />

        {/* Input & Category Selection Section */}
        <InputSection 
          text={text}
          onChangeText={(newText) => {
            setText(newText);
            setActiveExampleId(undefined);
          }}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          selectedRegion={selectedRegion}
          onSelectRegion={(reg) => setSelectedRegion(reg)}
          onAnalyze={() => handleAnalyze(false)}
          isLoading={isLoading}
          onLoadExample={handleLoadExample}
          onClear={handleClear}
          activeExampleId={activeExampleId}
        />

        {/* Explicit Error Display - Shown honestly when key is missing or API fails */}
        {error && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 animate-fade-in">
            <div className="p-4 sm:p-5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-sm shadow-lg">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-rose-300 text-base mb-1">
                    Gemini API Analysis Error
                  </h4>
                  <p className="leading-relaxed text-rose-200/90 text-xs sm:text-sm">
                    {error}
                  </p>
                </div>
              </div>

              {/* Action buttons in error card */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-rose-500/20">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-brand-teal-400 hover:bg-brand-teal-300 text-brand-navy-950 transition-colors shadow-sm"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Configure GEMINI_API_KEY</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAnalyze(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  title="Preview pre-synthesized offline demo dataset"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>View Offline Demo Preview</span>
                </button>

                <button 
                  onClick={() => setError(null)}
                  className="text-xs px-2.5 py-1.5 text-slate-400 hover:text-white transition-colors ml-auto"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Informative Warning Notification if any */}
        {warningMessage && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 animate-fade-in">
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
              <span>{warningMessage}</span>
              <button 
                onClick={() => setWarningMessage(null)}
                className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 font-semibold shrink-0 ml-3"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Loading Indicator with Animated Stepper */}
        {isLoading && (
          <LoadingOverlay category={selectedCategory} />
        )}

        {/* Results Dashboard */}
        {result && !isLoading && (
          <ResultsDashboard 
            result={result}
            onStartOver={handleStartOver}
          />
        )}

        {/* Hackathon Problem Statement & Societal Impact */}
        <ProblemStatementSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Settings Modal (Gemini API Key configuration) */}
      <ApiKeyModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isConfigured={isServerKeyConfigured}
        modelName={activeModelName}
        onSaveServerKey={handleSaveServerKey}
        onClearServerKey={handleClearServerKey}
      />
    </div>
  );
}

export default App;
