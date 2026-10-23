import fs from 'fs';
import path from 'path';
import { readJsonBody, sendJson, handleCors } from './_utils.js';

export default async function handler(req: any, res: any) {
  if (handleCors(req, res)) return;

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    const body = await readJsonBody(req);
    const { apiKey } = body;

    if (typeof apiKey !== 'string') {
      return sendJson(res, 400, { error: 'Invalid API key format.' });
    }

    const cleanKey = apiKey.trim();

    if (cleanKey.length > 0) {
      process.env.GEMINI_API_KEY = cleanKey;

      // Attempt .env update if filesystem is writable (local dev)
      try {
        const envPath = path.resolve(process.cwd(), '.env');
        let envContent = '';
        if (fs.existsSync(envPath)) {
          envContent = fs.readFileSync(envPath, 'utf-8');
        }
        if (/^GEMINI_API_KEY=/m.test(envContent)) {
          envContent = envContent.replace(/^GEMINI_API_KEY=.*$/m, `GEMINI_API_KEY=${cleanKey}`);
        } else {
          envContent = (envContent ? envContent + '\n' : '') + `GEMINI_API_KEY=${cleanKey}\n`;
        }
        fs.writeFileSync(envPath, envContent, 'utf-8');
      } catch {
        // Read-only filesystem in Vercel serverless functions
      }

      return sendJson(res, 200, { 
        success: true, 
        configured: true,
        message: 'GEMINI_API_KEY has been set for this session. (For persistent Vercel production deployment, configure GEMINI_API_KEY in Vercel Project Settings).' 
      });
    } else {
      delete process.env.GEMINI_API_KEY;
      try {
        const envPath = path.resolve(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
          const envContent = fs.readFileSync(envPath, 'utf-8').replace(/^GEMINI_API_KEY=.*$/m, 'GEMINI_API_KEY=');
          fs.writeFileSync(envPath, envContent, 'utf-8');
        }
      } catch {
        // Read-only
      }

      return sendJson(res, 200, { 
        success: true, 
        configured: false,
        message: 'GEMINI_API_KEY was cleared from server memory.' 
      });
    }
  } catch (err: any) {
    return sendJson(res, 500, { error: 'Failed to update key: ' + err.message });
  }
}
