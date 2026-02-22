import { useState, useCallback, useRef, useEffect } from 'react';
import { SimulationState, MOCK_MODELS, MOCK_SIGNALS, AMBULANCE_START, Hospital } from '@/lib/types';

const INITIAL_STATE: SimulationState = {
  isActive: false,
  progress: 0,
  destination: '',
  eta: 0,
  speed: 0,
  ambulancePosition: AMBULANCE_START,
  activeSignals: MOCK_SIGNALS,
  modelsComparison: MOCK_MODELS,
  recommendation: 'System idle. Awaiting emergency dispatch.',
  managedSignals: 0,
  greenPrioritySignals: 0,
};

export function useSimulation() {
  const [state, setState] = useState<SimulationState>(INITIAL_STATE);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepRef = useRef(0);

  const startSimulation = useCallback((hospital: Hospital) => {
    stepRef.current = 0;
    const totalSteps = 60;
    const startPos = AMBULANCE_START;
    const endPos = hospital.position;

    setState(prev => ({
      ...prev,
      isActive: true,
      progress: 0,
      destination: hospital.name,
      eta: MOCK_MODELS[2].eta,
      speed: 45,
      recommendation: `AI recommends Congestion-Aware routing to ${hospital.name}. This path avoids 3 high-traffic corridors and pre-empts ${MOCK_SIGNALS.length} traffic signals along the optimized route. Expected arrival ${MOCK_MODELS[2].eta} min faster than standard routing.`,
      modelsComparison: MOCK_MODELS,
    }));

    intervalRef.current = setInterval(() => {
      stepRef.current++;
      const progress = Math.min((stepRef.current / totalSteps) * 100, 100);
      const t = stepRef.current / totalSteps;

      const lng = startPos[0] + (endPos[0] - startPos[0]) * t;
      const lat = startPos[1] + (endPos[1] - startPos[1]) * t;

      const signalsToActivate = Math.floor(t * MOCK_SIGNALS.length);

      setState(prev => ({
        ...prev,
        progress,
        ambulancePosition: [lng, lat],
        eta: Math.max(0, MOCK_MODELS[2].eta * (1 - t)),
        speed: 35 + Math.random() * 30,
        managedSignals: signalsToActivate + Math.floor(Math.random() * 2),
        greenPrioritySignals: signalsToActivate,
        activeSignals: MOCK_SIGNALS.map((s, i) => ({
          ...s,
          status: i < signalsToActivate ? 'priority' as const : 'red' as const,
        })),
      }));

      if (stepRef.current >= totalSteps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setState(prev => ({ ...prev, isActive: false, progress: 100 }));
      }
    }, 500);
  }, []);

  const resetSimulation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState(INITIAL_STATE);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { state, startSimulation, resetSimulation };
}
