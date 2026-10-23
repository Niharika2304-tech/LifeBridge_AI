/**
 * Client-side Gemini wrapper.
 * All Gemini LLM calls are routed through the secure server-side endpoint (/api/analyze)
 * using the official @google/genai SDK to prevent API key exposure in browser code.
 */
import { analyzeReport } from './analyzer';
import { AnalysisResult, Category } from '../types';

export async function analyzeWithGemini(
  text: string, 
  userCategory: Category | 'auto',
  region: 'india' | 'international' | 'auto' = 'india'
): Promise<AnalysisResult> {
  const { result } = await analyzeReport(text, {
    category: userCategory,
    region: region,
    allowFallback: false
  });
  return result;
}
