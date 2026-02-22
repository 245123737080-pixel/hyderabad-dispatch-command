import { motion } from 'framer-motion';
import { MessageSquare, TrafficCone, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { SimulationState } from '@/lib/types';

interface Props {
  state: SimulationState;
}

const CHART_COLORS = ['hsl(217, 91%, 60%)', 'hsl(38, 92%, 50%)', 'hsl(142, 71%, 45%)'];

export function AIDecisionLogic({ state }: Props) {
  const chartData = state.modelsComparison.map(m => ({
    name: m.name.split(' ')[0],
    efficiency: m.efficiency,
  }));

  return (
    <div className="glass-panel h-full p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="data-readout text-primary text-xs">AI DECISION & LOGIC</span>
      </div>

      {/* Recommendation */}
      <div className="glass-panel-strong rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] text-muted-foreground font-mono tracking-widest">DECISION REASONING</span>
        </div>
        <p className="text-xs text-foreground/80 leading-relaxed">{state.recommendation}</p>
      </div>

      {/* Signal Management */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-panel-strong rounded-lg p-3 text-center">
          <TrafficCone className="w-4 h-4 text-warning mx-auto mb-1" />
          <p className="font-mono text-xl font-bold text-warning text-glow-blue">
            {state.managedSignals}
          </p>
          <p className="text-[9px] text-muted-foreground font-mono tracking-wider">MANAGED SIGNALS</p>
        </div>
        <div className="glass-panel-strong rounded-lg p-3 text-center">
          <div className="w-4 h-4 mx-auto mb-1 rounded-full bg-success/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-success animate-signal-pulse" />
          </div>
          <p className="font-mono text-xl font-bold text-success text-glow-green">
            {state.greenPrioritySignals}
          </p>
          <p className="text-[9px] text-muted-foreground font-mono tracking-wider">GREEN PRIORITY</p>
        </div>
      </div>

      {/* Efficiency Chart */}
      <div className="flex-1 glass-panel-strong rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] text-muted-foreground font-mono tracking-widest">EFFICIENCY COMPARISON</span>
        </div>
        <div className="h-[calc(100%-24px)]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="20%">
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)', fontFamily: 'JetBrains Mono' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 9, fill: 'hsl(215, 20%, 55%)', fontFamily: 'JetBrains Mono' }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Bar dataKey="efficiency" radius={[4, 4, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
