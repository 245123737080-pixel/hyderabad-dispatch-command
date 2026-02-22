import { motion } from 'framer-motion';
import { Brain, Route, Clock, Zap } from 'lucide-react';
import { ModelResult } from '@/lib/types';

interface Props {
  models: ModelResult[];
  isActive: boolean;
}

export function AIModelAnalysis({ models, isActive }: Props) {
  const bestModel = models.reduce((a, b) => (a.efficiency > b.efficiency ? a : b));

  return (
    <div className="glass-panel h-full p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="data-readout text-primary text-xs">AI MODEL ANALYSIS</span>
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <span className="data-readout text-xs text-muted-foreground">3 MODELS</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {models.map((model, i) => {
          const isBest = model.name === bestModel.name;
          return (
            <motion.div
              key={model.name}
              className={`glass-panel-strong rounded-lg p-4 flex-1 ${isBest ? 'neon-glow-green border-success/30' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {isBest && <Zap className="w-3 h-3 text-success" />}
                  <span className={`font-mono text-xs font-semibold ${isBest ? 'text-success' : 'text-foreground'}`}>
                    {model.name.toUpperCase()}
                  </span>
                </div>
                {isBest && (
                  <span className="text-[9px] font-mono bg-success/20 text-success px-2 py-0.5 rounded-full tracking-wider">
                    RECOMMENDED
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <MetricItem icon={<Route className="w-3 h-3" />} label="DIST" value={`${model.distance} km`} />
                <MetricItem icon={<Clock className="w-3 h-3" />} label="ETA" value={`${model.eta} min`} />
                <MetricItem
                  icon={<Zap className="w-3 h-3" />}
                  label="SCORE"
                  value={`${model.efficiency}%`}
                  highlight={isBest}
                />
              </div>

              {/* Efficiency bar */}
              <div className="mt-3 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${isBest ? 'bg-success' : 'bg-primary/60'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${model.efficiency}%` }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function MetricItem({ icon, label, value, highlight }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 mb-0.5">
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-[9px] text-muted-foreground font-mono">{label}</span>
      </div>
      <span className={`font-mono text-xs font-semibold ${highlight ? 'text-success text-glow-green' : 'text-foreground'}`}>
        {value}
      </span>
    </div>
  );
}
