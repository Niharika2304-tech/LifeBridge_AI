import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load local .env if available
dotenv.config();

/**
 * Handle CORS preflight and add standard security/CORS headers
 */
export function handleCors(req: any, res: any): boolean {
  if (typeof res.setHeader === 'function') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') {
      res.status(204).end();
    } else {
      res.statusCode = 204;
      res.end();
    }
    return true;
  }
  return false;
}

/**
 * Unified JSON response helper compatible with both Vercel serverless and Node http
 */
export function sendJson(res: any, statusCode: number, data: any) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

/**
 * Read request body safely across Vercel (pre-parsed) and raw Node streams
 */
export async function readJsonBody(req: any): Promise<any> {
  // 1. If Vercel already parsed the body into an object
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  // 2. If body is a string
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  // 3. Raw stream
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

/**
 * Securely resolve the Gemini API key:
 * Priority 1: Direct request override (if entered via client engine settings)
 * Priority 2: process.env.GEMINI_API_KEY (Vercel production environment variable)
 * Priority 3: Local .env file on disk (local development)
 */
export function getResolvedApiKey(clientOverrideKey?: string): string | undefined {
  if (clientOverrideKey && typeof clientOverrideKey === 'string' && clientOverrideKey.trim().length > 0) {
    return clientOverrideKey.trim();
  }

  // Check process.env (Vercel project environment variables)
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0) {
    return process.env.GEMINI_API_KEY.trim();
  }

  // Fresh read from .env if present on disk
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const parsed = dotenv.parse(fs.readFileSync(envPath, 'utf-8'));
      if (parsed.GEMINI_API_KEY && parsed.GEMINI_API_KEY.trim().length > 0) {
        return parsed.GEMINI_API_KEY.trim();
      }
    }
  } catch {
    // Read-only filesystem in serverless
  }

  return undefined;
}
