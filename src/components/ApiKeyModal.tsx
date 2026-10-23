import React, { useState } from 'react';
import { 
  Key, 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  RotateCcw,
  Server,
  AlertCircle
} from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConfigured: boolean;
  modelName: string;
  onSaveServerKey: (key: string) => Promise<{ success: boolean; message: string }>;
  onClearServerKey: () => Promise<void>;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  isConfigured,
  modelName,
  onSaveServerKey,
  onClearServerKey
}) => {
  const [inputKey, setInputKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!inputKey.trim()) {
      setStatusMsg({ type: 'error', text: 'Please enter a valid Gemini API key.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await onSaveServerKey(inputKey.trim());
      if (res.success) {
        setStatusMsg({ type: 'success', text: res.message || 'API key securely saved to server!' });
        setInputKey('');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Failed to update key.' });
      }
    } catch (e: any) {
      setStatusMsg({ type: 'error', text: e.message || 'Error communicating with server.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = async () => {
    setIsSubmitting(true);
    try {
      await onClearServerKey();
      setStatusMsg({ type: 'success', text: 'Key cleared from server environment.' });
      setInputKey('');
    } catch (e: any) {
      setStatusMsg({ type: 'error', text: 'Error clearing key.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg glass-panel rounded-2xl p-6 sm:p-7 border border-brand-teal-500/30 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          aria-label="Close settings"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-brand-teal-500/10 text-brand-teal-400 border border-brand-teal-500/25">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 id="modal-title" className="text-lg font-bold text-white">
              Google Gemini Engine Architecture
            </h3>
            <p className="text-xs text-slate-400">
              Official @google/genai SDK • Secure Server-Side Endpoint
            </p>
          </div>
        </div>

        {/* Current Server Engine Status */}
        <div className={`p-4 rounded-xl border mb-5 text-xs space-y-2 ${
          isConfigured 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' 
            : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              Status: {isConfigured ? 'GEMINI_API_KEY Configured (Live)' : 'GEMINI_API_KEY Missing on Server'}
            </span>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-brand-navy-950/80">
              {modelName}
            </span>
          </div>
          <p className="leading-relaxed text-slate-300">
            {isConfigured 
              ? 'Real-time Gemini queries run through the secure server endpoint. API keys are strictly kept on the server and never exposed to browser bundles or logs.' 
              : 'Add your GEMINI_API_KEY below or in your project .env file to enable genuine Google Gemini 3.5 Flash analysis.'}
          </p>
        </div>

        {/* Input to set API Key */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Configure Server GEMINI_API_KEY
          </label>
          <input
            type="password"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Paste AIzaSy... key to set server environment"
            className="w-full bg-brand-navy-950 border border-slate-700 focus:border-brand-teal-400 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-teal-500/20 font-mono"
          />
          <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400">
            <span>Saved directly to server <code className="text-brand-teal-300">.env</code></span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-teal-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Get Gemini API Key</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Feedback Messages */}
        {statusMsg && (
          <div className={`p-3 rounded-lg text-xs mb-4 flex items-center gap-2 ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' 
              : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
          }`}>
            {statusMsg.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Manual .env Instructions */}
        <div className="p-3 rounded-lg bg-brand-navy-950/70 border border-slate-800 text-[11px] text-slate-400 mb-5">
          <p className="font-semibold text-slate-300 mb-1">Terminal Setup (Alternative):</p>
          <code className="block bg-brand-navy-900 p-2 rounded text-brand-teal-300 font-mono">
            echo "GEMINI_API_KEY=your_key_here" &gt;&gt; .env
          </code>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
          {isConfigured ? (
            <button
              type="button"
              onClick={handleClear}
              disabled={isSubmitting}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Server Key</span>
            </button>
          ) : (
            <span className="text-xs text-slate-500">Currently using Demo Fallback</span>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSubmitting || !inputKey.trim()}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-brand-teal-400 hover:bg-brand-teal-300 text-brand-navy-950 shadow-glow-teal transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-brand-navy-950 border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save to Server</span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
