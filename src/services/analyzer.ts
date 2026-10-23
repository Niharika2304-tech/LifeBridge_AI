import { AnalysisResult, Category, ServerStatusResponse } from '../types';

export interface AnalyzeOptions {
  category: Category | 'auto';
  region?: 'india' | 'international' | 'auto';
  allowFallback?: boolean;
}

async function parseJsonResponse(response: Response): Promise<any> {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      const text = await response.text().catch(() => '');
      throw new Error(`Invalid JSON response from server (${response.status}): ${text.slice(0, 100)}`);
    }
  }

  // Handle HTML or text error pages (e.g. Vercel 404/504)
  const text = await response.text().catch(() => '');
  const cleanSnippet = text.replace(/<[^>]*>?/gm, '').trim().slice(0, 150);
  throw new Error(`Server returned non-JSON response (${response.status} ${response.statusText}): ${cleanSnippet || 'Please check deployment route configuration.'}`);
}

export async function getServerStatus(): Promise<ServerStatusResponse> {
  try {
    const res = await fetch('/api/status');
    if (!res.ok) {
      return { configured: false, model: 'gemini-3.5-flash', sdk: '@google/genai', message: `Status check returned HTTP ${res.status}.` };
    }
    const data = await parseJsonResponse(res);
    return data;
  } catch (e: any) {
    return { configured: false, model: 'gemini-3.5-flash', sdk: '@google/genai', message: e.message || 'Could not connect to server status endpoint.' };
  }
}

export async function setServerApiKey(apiKey: string): Promise<{ success: boolean; configured: boolean; message: string }> {
  try {
    const res = await fetch('/api/set-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey })
    });
    const data = await parseJsonResponse(res);
    return data;
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

  const data = await parseJsonResponse(response);

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
