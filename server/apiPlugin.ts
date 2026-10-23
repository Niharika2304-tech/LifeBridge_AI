import type { Plugin } from 'vite';
import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { analyzeReportWithGeminiServer } from './geminiService';
import { DEMO_ANALYSES, EXAMPLE_SCENARIOS } from '../src/data/examples';
import { getLocalizedResources } from '../src/data/verifiedResources';
import { AnalysisResult, Category, ExtractedFact } from '../src/types';

// Initial load
dotenv.config();

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, statusCode: number, data: any) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export function getResolvedApiKey(clientOverrideKey?: string): string | undefined {
  if (clientOverrideKey && typeof clientOverrideKey === 'string' && clientOverrideKey.trim().length > 0) {
    return clientOverrideKey.trim();
  }

  // Check .env fresh on disk so manual edits to .env take effect immediately
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const parsed = dotenv.parse(fs.readFileSync(envPath, 'utf-8'));
      if (parsed.GEMINI_API_KEY && parsed.GEMINI_API_KEY.trim().length > 0) {
        return parsed.GEMINI_API_KEY.trim();
      }
    }
  } catch (e) {
    // Ignore read error
  }

  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0) {
    return process.env.GEMINI_API_KEY.trim();
  }

  return undefined;
}

export function lifebridgeApiPlugin(): Plugin {
  return {
    name: 'lifebridge-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        // 1. GET /api/status - Check if GEMINI_API_KEY is active without exposing key contents
        if (url === '/api/status' && req.method === 'GET') {
          const resolvedKey = getResolvedApiKey();
          const hasKey = Boolean(resolvedKey);

          return sendJson(res, 200, {
            configured: hasKey,
            model: 'gemini-3.5-flash',
            sdk: '@google/genai (Official Google Gen AI SDK)',
            message: hasKey 
              ? 'Server GEMINI_API_KEY is configured and ready.' 
              : 'GEMINI_API_KEY is not configured in .env. Add your key to .env or Engine Settings to enable live Google Gemini 3.5 Flash analysis.'
          });
        }

        // 2. POST /api/set-key - Allow user to update GEMINI_API_KEY directly from UI
        if (url === '/api/set-key' && req.method === 'POST') {
          try {
            const rawBody = await readRequestBody(req);
            const { apiKey } = JSON.parse(rawBody || '{}');
            
            if (typeof apiKey !== 'string') {
              return sendJson(res, 400, { error: 'Invalid API key format.' });
            }

            const cleanKey = apiKey.trim();
            const envPath = path.resolve(process.cwd(), '.env');
            let envContent = '';
            if (fs.existsSync(envPath)) {
              envContent = fs.readFileSync(envPath, 'utf-8');
            }

            if (cleanKey.length > 0) {
              process.env.GEMINI_API_KEY = cleanKey;

              if (/^GEMINI_API_KEY=/m.test(envContent)) {
                envContent = envContent.replace(/^GEMINI_API_KEY=.*$/m, `GEMINI_API_KEY=${cleanKey}`);
              } else {
                envContent = (envContent ? envContent + '\n' : '') + `GEMINI_API_KEY=${cleanKey}\n`;
              }
              fs.writeFileSync(envPath, envContent, 'utf-8');

              return sendJson(res, 200, { 
                success: true, 
                configured: true,
                message: 'GEMINI_API_KEY has been securely saved to the server environment (.env).' 
              });
            } else {
              delete process.env.GEMINI_API_KEY;
              if (fs.existsSync(envPath)) {
                envContent = envContent.replace(/^GEMINI_API_KEY=.*$/m, 'GEMINI_API_KEY=');
                fs.writeFileSync(envPath, envContent, 'utf-8');
              }
              return sendJson(res, 200, { 
                success: true, 
                configured: false,
                message: 'GEMINI_API_KEY was cleared from the server.' 
              });
            }
          } catch (err: any) {
            return sendJson(res, 500, { error: 'Failed to update key: ' + err.message });
          }
        }

                // Duplicate /api/simulate block removed to avoid conflict
        // (original block retained above)

                // Duplicate /api/simulate block removed to avoid conflict
        // (original block retained above)

        // (unchanged)
        if (url === '/api/analyze' && req.method === 'POST') {
          try {
            const rawBody = await readRequestBody(req);
            const { 
              text, 
              category = 'auto', 
              region = 'india', 
              clientApiKey, 
              allowFallback = false 
            } = JSON.parse(rawBody || '{}');

            if (!text || typeof text !== 'string' || text.trim().length === 0) {
              return sendJson(res, 400, { error: 'Text description is required.' });
            }

            const activeKey = getResolvedApiKey(clientApiKey);

            // Case A: Key is present -> Call genuine Gemini API
            if (activeKey) {
              try {
                const liveResult = await analyzeReportWithGeminiServer(text.trim(), category, region, activeKey);
                
                // If client sent key and .env was empty, persist to .env for future requests
                if (!process.env.GEMINI_API_KEY && activeKey) {
                  process.env.GEMINI_API_KEY = activeKey;
                  const envPath = path.resolve(process.cwd(), '.env');
                  let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
                  if (/^GEMINI_API_KEY=/m.test(envContent)) {
                    envContent = envContent.replace(/^GEMINI_API_KEY=.*$/m, `GEMINI_API_KEY=${activeKey}`);
                  } else {
                    envContent = (envContent ? envContent + '\n' : '') + `GEMINI_API_KEY=${activeKey}\n`;
                  }
                  fs.writeFileSync(envPath, envContent, 'utf-8');
                }

                return sendJson(res, 200, {
                  success: true,
                  result: liveResult,
                  isLiveGemini: true,
                  model: liveResult.modelUsed
                });
              } catch (geminiErr: any) {
                console.error('[LifeBridge /api/analyze Error]:', geminiErr?.message, geminiErr?.cause || '');
                const isFetchFailed = geminiErr?.message === 'fetch failed' || (geminiErr?.cause && geminiErr?.cause?.code);
                const causeInfo = geminiErr?.cause?.message || geminiErr?.cause?.code;
                const userMessage = isFetchFailed
                  ? `Network connection to Google Gemini API failed (fetch failed: ${causeInfo || 'server offline or DNS resolution failed'}). Please verify your internet connection.`
                  : `Google Gemini API error: ${geminiErr.message || 'Failed to generate response'}`;

                // If request fails, display a clear error rather than silently using demo data
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
                message: 'Server GEMINI_API_KEY is not configured in .env. Please configure your GEMINI_API_KEY in the .env file (or click Engine Settings in the navbar) to enable live Google Gemini analysis.'
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

        // 3. POST /api/simulate - Perform a what‑if simulation by re‑running Gemini with the original report plus the selected scenario.
        if (url === '/api/simulate' && req.method === 'POST') {
          try {
            const rawBody = await readRequestBody(req);
            const { text, scenario, category, region, clientApiKey } = JSON.parse(rawBody || '{}');
            if (!text || typeof text !== 'string' || text.trim().length === 0) {
              return sendJson(res, 400, { error: 'Text description is required.' });
            }
            if (!scenario || typeof scenario !== 'string' || scenario.trim().length === 0) {
              return sendJson(res, 400, { error: 'Scenario is required for simulation.' });
            }
            const activeKey = getResolvedApiKey(clientApiKey);
            if (!activeKey) {
              // No API key – cannot perform live simulation
              return sendJson(res, 401, {
                success: false,
                error: 'GEMINI_API_KEY_MISSING',
                message: 'Server GEMINI_API_KEY is not configured. Configure it to run live simulations.'
              });
            }
            // Append the chosen scenario to the original report so Gemini can re‑analyse.
            const combinedText = `${text.trim()}\n\nWHAT‑IF SCENARIO UPDATE: ${scenario.trim()}`;
            const simResult = await analyzeReportWithGeminiServer(combinedText, category || 'auto', region || 'india', activeKey);
            return sendJson(res, 200, {
              success: true,
              result: simResult,
              isLiveGemini: true,
              model: simResult.modelUsed
            });
          } catch (geminiErr: any) {
            console.error('[LifeBridge /api/simulate Error]:', geminiErr?.message, geminiErr?.cause || '');
            const isFetchFailed = geminiErr?.message === 'fetch failed' || (geminiErr?.cause && geminiErr?.cause?.code);
            const causeInfo = geminiErr?.cause?.message || geminiErr?.cause?.code;
            const userMessage = isFetchFailed
              ? `Network connection to Google Gemini API failed (fetch failed: ${causeInfo || 'server offline or DNS resolution failed'}). Please verify your internet connection.`
              : `Google Gemini simulation error: ${geminiErr.message || 'Failed to generate response'}`;

            // Propagate Gemini errors clearly.
            return sendJson(res, 502, {
              success: false,
              error: 'GEMINI_SIMULATION_FAILED',
              message: userMessage
            });
          }
        }
        next();
      });
    }
  };
}

function generateServerFallback(text: string, requestedCategory: Category | 'auto', region: 'india' | 'international' | 'auto'): AnalysisResult {
  for (const example of EXAMPLE_SCENARIOS) {
    if (text.toLowerCase().includes(example.messyText.slice(0, 40).toLowerCase())) {
      const demo = DEMO_ANALYSES[example.id];
      if (demo) {
        return {
          ...demo,
          id: `demo-${Date.now()}`,
          originalText: text,
          isDemoData: true,
          modelUsed: 'Demo Dataset (Offline Preview)',
          verifiedResources: getLocalizedResources(region, demo.category)
        };
      }
    }
  }

  const isIndia = region !== 'international';
  const category: Category = requestedCategory === 'auto' ? 'community_issue' : requestedCategory;

  return {
    id: `fallback-${Date.now()}`,
    timestamp: new Date().toISOString(),
    originalText: text,
    category,
    categoryReasoning: `Categorized as ${category.replace('_', ' ')} for demo preview.`,
    situationSummary: `A reported incident in ${category.replace('_', ' ')} domain. Live Gemini structuring is available by configuring GEMINI_API_KEY in .env.`,
    extractedFacts: [
      {
        label: 'Incident Description',
        value: text,
        confidence: 'high',
        category: 'general'
      }
    ],
    urgency: {
      level: 'moderate',
      score: 6.5,
      explanation: 'Moderate urgency preview dataset.',
      escalationTrigger: 'Hazard escalation or physical harm.'
    },
    prioritizedNextSteps: {
      immediate: [
        {
          id: 'imm-1',
          text: isIndia ? 'Call 112 for acute emergency assistance.' : 'Call 911 for emergency assistance.',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'Observer'
        }
      ],
      shortTerm: [],
      coordination: []
    },
    unknownOrUnverified: ['Unverified in demo preview mode.'],
    verifiedResources: getLocalizedResources(region, category),
    isDemoData: true,
    modelUsed: 'Demo Dataset (Offline Preview)',
    region: isIndia ? 'india' : 'international'
  };
}
