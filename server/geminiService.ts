import { GoogleGenAI } from '@google/genai';
import type { AnalysisResult, Category, ExtractedFact, ActionStep, VerifiedResource } from '../src/types.js';
import { VERIFIED_RESOURCES_INDIA, VERIFIED_RESOURCES_INTERNATIONAL } from '../src/data/verifiedResources.js';

const SYSTEM_INSTRUCTION = `
You are the AI Intelligence Engine of LifeBridge AI (PromptWars H2H Edition).
Your mission is to convert messy, chaotic, and emotional real-world problem descriptions into structured, verified, objective action plans that benefit society.

CRITICAL RULES:
1. ETHICAL INTEGRITY & ACCURACY:
   - NEVER fabricate fake emergency numbers, fictitious dispatchers, or imaginary hotlines.
   - NEVER claim or pretend that LifeBridge AI directly contacts emergency services, dispatches responders, or has access to live police/fire CAD dispatch systems. LifeBridge AI is an assistive structuring and triage guide for citizens and responders.

2. GEOGRAPHIC LOCALIZATION (INDIA & INTERNATIONAL):
   - Analyze the location, language, and context of the user's report.
   - If the report is in INDIA (e.g. mentions Indian cities, states, addresses, landmarks, INR/rupees, or general non-US context):
     - Use ONLY official Indian emergency and public services:
       * All-in-One Emergency Helpline: 112 (National Emergency Response Support System - https://112.gov.in/)
       * Severe Weather & Monsoon: India Meteorological Department (IMD) - https://mausam.imd.gov.in/
       * Disaster Warnings & Alerts: NDMA SACHET Portal - https://sachet.ndma.gov.in/
       * Specialized Disaster Rescue: NDRF (011-24363260 / 1078) - https://www.ndrf.gov.in/
       * Ambulance & Medical Emergency: 108 (Emergency) / 102 (Maternal)
       * Poison Emergency: National Poison Information Centre (AIIMS New Delhi) - 1800-116-117
       * Electrical Hazards / Downed Wire: 1912 (State Electricity Board Emergency)
       * Civic/Water Sanitation Issues: 1969 / Swachhata Grievance Portal
       * Women Helpline: 1091 / 181, Childline: 1098
     - STRICTLY DO NOT present US-only numbers (like 911, CDC Atlanta, FEMA, 988, 311) as locally relevant for Indian contexts!
   - If the report is explicitly set in the UNITED STATES or North America (e.g. US street names, US states):
     - Use authentic US resources (911 for life threats, Poison Help 1-800-222-1222, FEMA/Ready.gov, 988, 311, CDC).

3. NO TRUNCATION OF EXTRACTED FACTS:
   - Extract full, unabbreviated entities. Do NOT cut off addresses, landmark descriptions, names, or timelines.
   - Assign appropriate confidence ('high', 'medium', 'estimated') and category ('location', 'time', 'people', 'hazard', 'resource', 'general').

4. AUDITING UNKNOWNS:
   - Explicitly list 3-5 critical unknown or unverified factors (e.g. patient vital history, exact meter box shutoff location, flood rate upstream) to prevent responders from making fatal assumptions.

5. OUTPUT FORMAT:
   - Return STRICT JSON conforming to the requested schema. No conversational preamble.
`;

export async function analyzeReportWithGeminiServer(
  userText: string,
  categoryHint: Category | 'auto',
  regionHint: 'india' | 'international' | 'auto' = 'india',
  apiKeyToUse?: string
): Promise<AnalysisResult> {
  const apiKey = apiKeyToUse || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('GEMINI_API_KEY_NOT_CONFIGURED');
  }

  // Initialize the official @google/genai SDK
  const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

  const prompt = `
Analyze the following messy real-world report and produce a structured, actionable, society-benefiting response:

USER INPUT REPORT:
"""
${userText}
"""

REQUESTED CATEGORY: ${categoryHint === 'auto' ? 'Auto-detect from text' : categoryHint}
REGION PREFERENCE: ${regionHint || 'auto-detect based on text (default to India if general/unspecified)'}

Return a valid JSON object matching this schema:
{
  "category": "health" | "public_safety" | "weather_emergency" | "community_issue",
  "categoryReasoning": "1-2 sentence explanation of why this category was determined",
  "detectedRegion": "india" | "international",
  "situationSummary": "Clear, objective, high-density 2-4 sentence executive briefing of the core problem, affected individuals, active hazards, and operational constraints.",
  "extractedFacts": [
    {
      "label": "Short label (e.g., Specific Location, Timeline, Vulnerable Individuals, Electrical Hazard)",
      "value": "Complete, unabbreviated extracted detail from the report",
      "confidence": "high" | "medium" | "estimated",
      "category": "location" | "time" | "people" | "hazard" | "resource" | "general"
    }
  ],
  "urgency": {
    "level": "low" | "moderate" | "high" | "critical",
    "score": number between 1.0 and 10.0 (e.g. 9.2),
    "explanation": "Detailed clinical or situational explanation of why this urgency level was assigned based on physical danger and time decay.",
    "escalationTrigger": "Specific warning sign or threshold that triggers immediate escalation."
  },
  "prioritizedNextSteps": {
    "immediate": [
      { "id": "imm-1", "text": "Actionable instructions for next 0-15 minutes", "timeframe": "immediate", "priority": 1, "targetRole": "First Observer / Bystander" }
    ],
    "shortTerm": [
      { "id": "st-1", "text": "Actionable instructions for next 1-6 hours", "timeframe": "short_term", "priority": 2, "targetRole": "Community / Volunteer" }
    ],
    "coordination": [
      { "id": "coord-1", "text": "Reporting to official agencies, utility lines, or local authorities", "timeframe": "follow_up", "priority": 3, "targetRole": "Advocate / Coordinator" }
    ]
  },
  "unknownOrUnverified": [
    "Safety audit question 1: What is not confirmed?",
    "Safety audit question 2: What assumption must not be made?"
  ],
  "verifiedResources": [
    {
      "name": "Exact official service name",
      "agency": "Governing ministry or verified agency",
      "category": "health" | "public_safety" | "weather_emergency" | "community_issue" | "general",
      "contact": "Authentic telephone number or official web portal",
      "contactType": "phone" | "website",
      "url": "https://official-verified-link.gov or genuine org",
      "note": "Exact concise description of when to call or use this service",
      "verifiedBadge": true
    }
  ]
}
`;

  let responseText: string | undefined;
  let modelUsed = 'Google Gemini 3.5 Flash (@google/genai SDK)';
  let lastError: any = null;

  // Try gemini-3.5-flash as primary model, with fallback to supported flash models if unavailable
  const modelsToTry = [
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
    'gemini-3.8-flash',
    'gemini-flash-latest',
    'gemini-flash-lite-latest'
  ];

  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });

      let rawText: string | undefined;
      if (response.text && response.text.trim()) {
        rawText = response.text;
      } else if (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) {
        rawText = response.candidates[0].content.parts[0].text;
      }

      if (rawText) {
        responseText = rawText;
        modelUsed = modelName === 'gemini-3.5-flash'
          ? 'Google Gemini 3.5 Flash (@google/genai SDK)'
          : `Google Gemini (${modelName}) via @google/genai SDK`;
        break;
      }
    } catch (err: any) {
      lastError = err;
      const errMsg = (err?.message || '').toLowerCase();
      const status = err?.status || err?.code;
      // If it is an authentication error, fail fast
      if (status === 401 || status === 403 || errMsg.includes('api_key_invalid') || errMsg.includes('permission_denied')) {
        throw err;
      }
      // For temporary 503 high demand, 429 quota, or 404 model not found, try the next model
      console.warn(`[LifeBridge] Model ${modelName} returned ${status || err.message}; trying next model...`);
    }
  }

  if (!responseText && lastError) {
    throw lastError;
  }

  if (!responseText || responseText.trim() === '') {
    throw new Error('Gemini API returned an empty response.');
  }

  // Parse JSON response safely
  let cleanJson = responseText.trim();
  if (cleanJson.startsWith('```json')) {
    cleanJson = cleanJson.replace(/^```json\n?/, '').replace(/\n?```$/, '');
  } else if (cleanJson.startsWith('```')) {
    cleanJson = cleanJson.replace(/^```\n?/, '').replace(/\n?```$/, '');
  }

  const parsed = JSON.parse(cleanJson);
  const detectedCategory: Category = parsed.category || (categoryHint !== 'auto' ? categoryHint : 'community_issue');
  const isIndia = parsed.detectedRegion === 'india' || regionHint === 'india' || (!parsed.detectedRegion && regionHint !== 'international');

  // Verify and match genuinely verified official resources
  let resources: VerifiedResource[] = [];
  if (Array.isArray(parsed.verifiedResources) && parsed.verifiedResources.length > 0) {
    resources = parsed.verifiedResources.map((r: any) => ({
      name: r.name,
      agency: r.agency,
      category: r.category || detectedCategory,
      contact: r.contact,
      contactType: r.contactType || (r.contact?.includes('http') ? 'website' : 'phone'),
      url: r.url,
      note: r.note,
      verifiedBadge: true,
      region: isIndia ? 'india' : 'international'
    }));
  }

  // Ensure top localized resources are present (e.g. 112, IMD, NDMA SACHET for India)
  if (isIndia) {
    const defaultIndia = VERIFIED_RESOURCES_INDIA.filter(r => r.category === detectedCategory || r.category === 'public_safety');
    for (const def of defaultIndia) {
      if (!resources.some(r => r.name.toLowerCase().includes(def.name.toLowerCase()) || r.contact === def.contact)) {
        resources.push(def);
      }
    }
  }

  const result: AnalysisResult = {
    id: `gemini-${Date.now()}`,
    timestamp: new Date().toISOString(),
    originalText: userText,
    category: detectedCategory,
    categoryReasoning: parsed.categoryReasoning || 'Determined by Google Gemini semantic categorization.',
    situationSummary: parsed.situationSummary,
    extractedFacts: (parsed.extractedFacts || []).map((f: any) => ({
      label: f.label || 'Fact',
      value: String(f.value || ''),
      confidence: f.confidence || 'high',
      category: f.category || 'general'
    })),
    urgency: {
      level: parsed.urgency?.level || 'moderate',
      score: typeof parsed.urgency?.score === 'number' ? parsed.urgency.score : 7.0,
      explanation: parsed.urgency?.explanation || 'Urgency evaluated based on threat severity.',
      escalationTrigger: parsed.urgency?.escalationTrigger || 'Rapid worsening of environmental conditions.'
    },
    prioritizedNextSteps: {
      immediate: (parsed.prioritizedNextSteps?.immediate || []).map((s: any, idx: number) => ({
        id: s.id || `imm-${idx + 1}`,
        text: s.text,
        timeframe: 'immediate',
        priority: 1,
        targetRole: s.targetRole || 'First Observer'
      })),
      shortTerm: (parsed.prioritizedNextSteps?.shortTerm || []).map((s: any, idx: number) => ({
        id: s.id || `st-${idx + 1}`,
        text: s.text,
        timeframe: 'short_term',
        priority: 2,
        targetRole: s.targetRole || 'Community Responder'
      })),
      coordination: (parsed.prioritizedNextSteps?.coordination || []).map((s: any, idx: number) => ({
        id: s.id || `coord-${idx + 1}`,
        text: s.text,
        timeframe: 'follow_up',
        priority: 3,
        targetRole: s.targetRole || 'Civic Coordinator'
      }))
    },
    unknownOrUnverified: parsed.unknownOrUnverified || [],
    verifiedResources: resources.slice(0, 6),
    isDemoData: false,
    modelUsed: modelUsed,
    region: isIndia ? 'india' : 'international'
  };

  return result;
}
