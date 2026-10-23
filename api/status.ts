import { getResolvedApiKey, sendJson, handleCors } from './_utils';

export default async function handler(req: any, res: any) {
  if (handleCors(req, res)) return;

  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  const resolvedKey = getResolvedApiKey();
  const hasKey = Boolean(resolvedKey);

  return sendJson(res, 200, {
    configured: hasKey,
    model: 'gemini-3.5-flash',
    sdk: '@google/genai (Official Google Gen AI SDK)',
    message: hasKey 
      ? 'Server GEMINI_API_KEY is configured and ready.' 
      : 'GEMINI_API_KEY is not configured. Add your GEMINI_API_KEY to your Vercel Project Environment Variables to enable live Google Gemini 3.5 Flash analysis.'
  });
}
