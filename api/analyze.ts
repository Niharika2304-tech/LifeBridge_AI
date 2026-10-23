import { analyzeReportWithGeminiServer } from './_gemini.js';
import { generateServerFallback } from './_fallback.js';
import { getResolvedApiKey, readJsonBody, sendJson, handleCors } from './_utils.js';

export default async function handler(req: any, res: any) {
  if (handleCors(req, res)) return;

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    const body = await readJsonBody(req);
    const { 
      text, 
      category = 'auto', 
      region = 'india', 
      clientApiKey, 
      allowFallback = false 
    } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return sendJson(res, 400, { error: 'Text description is required.' });
    }

    const activeKey = getResolvedApiKey(clientApiKey);

    // Case A: Key is present -> Call genuine Gemini API
    if (activeKey) {
      try {
        const liveResult = await analyzeReportWithGeminiServer(text.trim(), category, region, activeKey);
        
        return sendJson(res, 200, {
          success: true,
          result: liveResult,
          isLiveGemini: true,
          model: liveResult.modelUsed
        });
      } catch (geminiErr: any) {
        console.error('[API /analyze Error]:', geminiErr?.message, geminiErr?.cause || '');
        const isFetchFailed = geminiErr?.message === 'fetch failed' || (geminiErr?.cause && geminiErr?.cause?.code);
        const causeInfo = geminiErr?.cause?.message || geminiErr?.cause?.code;
        const userMessage = isFetchFailed
          ? `Network connection to Google Gemini API failed (fetch failed: ${causeInfo || 'server offline or DNS resolution failed'}). Please verify your internet connection.`
          : `Google Gemini API error: ${geminiErr.message || 'Failed to generate response'}`;

        return sendJson(res, 502, {
          success: false,
          error: 'GEMINI_API_CALL_FAILED',
          message: userMessage
        });
      }
    }

    // Case B: Key is missing -> NEVER silently return demo data when user clicks Analyze
    if (!allowFallback) {
      return sendJson(res, 401, {
        success: false,
        error: 'GEMINI_API_KEY_MISSING',
        message: 'Server GEMINI_API_KEY is not configured in environment variables. Please add GEMINI_API_KEY to your Vercel Project Settings (Settings -> Environment Variables) or configure it via Engine Settings in the navbar.'
      });
    }

    // Only used if allowFallback was explicitly true (e.g. demo preview mode)
    const fallbackResult = generateServerFallback(text.trim(), category, region);
    return sendJson(res, 200, {
      success: true,
      result: fallbackResult,
      isLiveGemini: false,
      warning: 'DEMO PREVIEW: Showing pre-synthesized dataset because no GEMINI_API_KEY is configured.'
    });

  } catch (err: any) {
    return sendJson(res, 500, { error: err.message || 'Server error processing analysis' });
  }
}
