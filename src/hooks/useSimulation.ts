import { useState } from 'react';
import { AnalysisResult } from '../types';

export interface UseSimulationReturn {
  simResult: AnalysisResult | null;
  loading: boolean;
  error: string | null;
  selectedScenario: string;
  setSelectedScenario: (scenario: string) => void;
  runSimulation: (originalResult: AnalysisResult, scenario: string) => Promise<void>;
  resetSimulation: () => void;
}

/**
 * Custom hook to manage What If? Crisis Simulator API requests and state.
 */
export function useSimulation(): UseSimulationReturn {
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [simResult, setSimResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSimulation = async (originalResult: AnalysisResult, scenario: string) => {
    if (!scenario || !scenario.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const resp = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: originalResult.originalText,
          scenario: scenario.trim(),
          category: originalResult.category,
          region: originalResult.region || 'india',
        }),
      });

      let data: any;
      try {
        data = await resp.json();
      } catch (parseErr) {
        const text = await resp.text();
        throw new Error(text || 'Invalid server response (non-JSON)');
      }

      if (!resp.ok) {
        throw new Error(data.message || data.error || 'Simulation failed');
      }

      if (!data.result) {
        throw new Error('Server returned an empty simulation result.');
      }

      setSimResult(data.result);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred during simulation.');
    } finally {
      setLoading(false);
    }
  };

  const resetSimulation = () => {
    setSimResult(null);
    setError(null);
  };

  return {
    simResult,
    loading,
    error,
    selectedScenario,
    setSelectedScenario,
    runSimulation,
    resetSimulation
  };
}
