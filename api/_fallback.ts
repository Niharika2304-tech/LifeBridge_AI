import { DEMO_ANALYSES, EXAMPLE_SCENARIOS } from '../src/data/examples';
import { getLocalizedResources } from '../src/data/verifiedResources';
import { AnalysisResult, Category } from '../src/types';

export function generateServerFallback(
  text: string, 
  requestedCategory: Category | 'auto', 
  region: 'india' | 'international' | 'auto'
): AnalysisResult {
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
    situationSummary: `A reported incident in ${category.replace('_', ' ')} domain. Live Gemini structuring is available by configuring GEMINI_API_KEY in environment variables.`,
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
