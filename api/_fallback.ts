import { getLocalizedResources } from './_resources.js';
import type { AnalysisResult, Category } from './_types.js';

export function generateServerFallback(
  text: string, 
  requestedCategory: Category | 'auto', 
  region: 'india' | 'international' | 'auto'
): AnalysisResult {
  const isIndia = region !== 'international';
  const category: Category = requestedCategory === 'auto' ? 'community_issue' : requestedCategory;

  return {
    id: `fallback-${Date.now()}`,
    timestamp: new Date().toISOString(),
    originalText: text,
    category,
    categoryReasoning: `Categorized as ${category.replace('_', ' ')} for demo preview mode.`,
    situationSummary: `Reported situation in the ${category.replace('_', ' ')} domain. Live Google Gemini 3.5 Flash structuring is active when GEMINI_API_KEY is configured in Vercel environment variables.`,
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
      escalationTrigger: 'Rapid worsening of environmental conditions or physical harm.'
    },
    prioritizedNextSteps: {
      immediate: [
        {
          id: 'imm-1',
          text: isIndia ? 'Call 112 for acute emergency assistance.' : 'Call 911 for emergency assistance.',
          timeframe: 'immediate',
          priority: 1,
          targetRole: 'First Observer'
        }
      ],
      shortTerm: [
        {
          id: 'st-1',
          text: 'Notify local community ward / volunteer group to establish safety perimeter.',
          timeframe: 'short_term',
          priority: 2,
          targetRole: 'Community / Volunteer'
        }
      ],
      coordination: [
        {
          id: 'coord-1',
          text: isIndia ? 'Report civic infrastructure to municipal helpline (1969/1912).' : 'Report incident to 311 municipal services.',
          timeframe: 'follow_up',
          priority: 3,
          targetRole: 'Coordinator'
        }
      ]
    },
    unknownOrUnverified: [
      'Exact physical coordinates or landmark confirmation',
      'Presence of vulnerable populations or medical conditions'
    ],
    verifiedResources: getLocalizedResources(region, category),
    isDemoData: true,
    modelUsed: 'Demo Dataset (Offline Preview)',
    region: isIndia ? 'india' : 'international'
  };
}
