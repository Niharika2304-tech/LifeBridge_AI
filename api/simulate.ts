import { analyzeReportWithGeminiServer } from '../server/geminiService';
import { getResolvedApiKey, readJsonBody, sendJson, handleCors } from './_utils';

export default async function handler(req: any, res: any) {
  if (handleCors(req, res)) return;

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    const body = await readJsonBody(req);
    const { text, scenario, category, region, clientApiKey } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return sendJson(res, 400, { error: 'Text description is required.' });
    }
    if (!scenario || typeof scenario !== 'string' || scenario.trim().length === 0) {
      return sendJson(res, 400, { error: 'Scenario is required for simulation.' });
    }

    const activeKey = getResolvedApiKey(clientApiKey);
    if (!activeKey) {
      return sendJson(res, 401, {
        success: false,
        error: 'GEMINI_API_KEY_MISSING',
        message: 'Server GEMINI_API_KEY is not configured. Add GEMINI_API_KEY in Vercel Project Settings to run live simulations.'
      });
    }

    // Append the chosen scenario to the original report for Gemini contingency analysis
    const combinedText = `${text.trim()}\n\nWHAT‑IF SCENARIO UPDATE: ${scenario.trim()}`;
    const simResult = await analyzeReportWithGeminiServer(combinedText, category || 'auto', region || 'india', activeKey);

    return sendJson(res, 200, {
      success: true,
      result: simResult,
      isLiveGemini: true,
      model: simResult.modelUsed
    });
  } catch (geminiErr: any) {
    console.error('[API /simulate Error]:', geminiErr?.message, geminiErr?.cause || '');
    const isFetchFailed = geminiErr?.message === 'fetch failed' || (geminiErr?.cause && geminiErr?.cause?.code);
    const causeInfo = geminiErr?.cause?.message || geminiErr?.cause?.code;
    const userMessage = isFetchFailed
      ? `Network connection to Google Gemini API failed (fetch failed: ${causeInfo || 'server offline or DNS resolution failed'}). Please verify your internet connection.`
      : `Google Gemini simulation error: ${geminiErr.message || 'Failed to generate response'}`;

    return sendJson(res, 502, {
      success: false,
      error: 'GEMINI_SIMULATION_FAILED',
      message: userMessage
    });
  }
}
