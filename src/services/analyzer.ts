import { AnalysisResult, Category, ServerStatusResponse } from '../types';

export interface AnalyzeOptions {
  category: Category | 'auto';
  region?: 'india' | 'international' | 'auto';
  allowFallback?: boolean;
}

export async function getServerStatus(): Promise<ServerStatusResponse> {
  try {
    const res = await fetch('/api/status');
    if (!res.ok) {
      return { configured: false, model: 'gemini-3.5-flash', sdk: '@google/genai', message: 'Status check failed.' };
    }
    return await res.json();
  } catch (e: any) {
    return { configured: false, model: 'gemini-3.5-flash', sdk: '@google/genai', message: 'Could not connect to server status endpoint.' };
  }
}

export async function setServerApiKey(apiKey: string): Promise<{ success: boolean; configured: boolean; message: string }> {
  try {
    const res = await fetch('/api/set-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey })
    });
    return await res.json();
  } catch (e: any) {
    return { success: false, configured: false, message: e.message || 'Failed to communicate with server.' };
  }
}

export async function analyzeReport(
  text: string,
  options: AnalyzeOptions
): Promise<{ result: AnalysisResult; isLiveGemini: boolean; warning?: string }> {
  const cleanText = text.trim();
  if (!cleanText) {
    throw new Error('Please enter a description of the real-world situation before analyzing.');
  }

  // Check if client has a saved key in localStorage
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('lifebridge_gemini_key') || '' : '';

  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: cleanText,
      category: options.category || 'auto',
      region: options.region || 'india',
      clientApiKey: localKey || undefined,
      allowFallback: options.allowFallback ?? false
    })
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || data.error || `Server error (${response.status})`);
  }

  if (!data.result) {
    throw new Error('Server returned an invalid result format.');
  }

  return {
    result: data.result,
    isLiveGemini: Boolean(data.isLiveGemini),
    warning: data.warning
  };
}
