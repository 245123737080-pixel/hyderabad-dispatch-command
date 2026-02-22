export interface SimulationState {
  isActive: boolean;
  progress: number;
  destination: string;
  eta: number;
  speed: number;
  ambulancePosition: [number, number];
  activeSignals: Signal[];
  modelsComparison: ModelResult[];
  recommendation: string;
  managedSignals: number;
  greenPrioritySignals: number;
}

export interface Signal {
  id: string;
  position: [number, number];
  status: 'red' | 'green' | 'priority';
  name: string;
}

export interface ModelResult {
  name: string;
  distance: number;
  eta: number;
  efficiency: number;
}

export interface Hospital {
  name: string;
  position: [number, number];
}

export const HOSPITALS: Hospital[] = [
  { name: "KIMS Hospital", position: [78.4867, 17.4065] },
  { name: "Apollo Hospital", position: [78.4480, 17.4156] },
  { name: "Yashoda Hospital", position: [78.4527, 17.4340] },
  { name: "Care Hospital", position: [78.3810, 17.4400] },
  { name: "Gandhi Hospital", position: [78.4748, 17.4067] },
];

export const MOCK_MODELS: ModelResult[] = [
  { name: "Greedy Search", distance: 8.2, eta: 12.5, efficiency: 72 },
  { name: "A* Search", distance: 7.1, eta: 10.8, efficiency: 85 },
  { name: "Congestion-Aware", distance: 7.5, eta: 9.2, efficiency: 94 },
];

export const MOCK_SIGNALS: Signal[] = [
  { id: "s1", position: [78.47, 17.41], status: "red", name: "Begumpet Junction" },
  { id: "s2", position: [78.46, 17.42], status: "red", name: "Ameerpet Cross" },
  { id: "s3", position: [78.45, 17.43], status: "red", name: "SR Nagar Signal" },
  { id: "s4", position: [78.44, 17.42], status: "red", name: "Erragadda Junction" },
  { id: "s5", position: [78.48, 17.40], status: "red", name: "Secunderabad Rly" },
  { id: "s6", position: [78.49, 17.39], status: "red", name: "Malkajgiri Cross" },
];

export const AMBULANCE_START: [number, number] = [78.50, 17.38];
