export type Category = 
  | 'health' 
  | 'public_safety' 
  | 'weather_emergency' 
  | 'community_issue';

export type UrgencyLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface ExtractedFact {
  label: string;
  value: string;
  confidence?: 'high' | 'medium' | 'estimated';
  category: 'location' | 'time' | 'people' | 'hazard' | 'resource' | 'general';
}

export interface ActionStep {
  id: string;
  text: string;
  timeframe: 'immediate' | 'short_term' | 'follow_up';
  priority: 1 | 2 | 3;
  targetRole?: string;
  done?: boolean;
}

export interface VerifiedResource {
  name: string;
  agency: string;
  category: Category | 'general';
  contact: string;
  contactType: 'phone' | 'website' | 'sms';
  url?: string;
  note: string;
  verifiedBadge: boolean;
  region?: 'india' | 'international';
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  originalText: string;
  category: Category;
  categoryReasoning: string;
  situationSummary: string;
  extractedFacts: ExtractedFact[];
  urgency: {
    level: UrgencyLevel;
    score: number; // 1-10
    explanation: string;
    escalationTrigger: string;
  };
  prioritizedNextSteps: {
    immediate: ActionStep[];
    shortTerm: ActionStep[];
    coordination: ActionStep[];
  };
  unknownOrUnverified: string[];
  verifiedResources: VerifiedResource[];
  isDemoData: boolean;
  modelUsed?: string;
  region?: 'india' | 'international' | 'auto';
}
