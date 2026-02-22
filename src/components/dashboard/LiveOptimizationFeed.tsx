import { motion } from 'framer-motion';
import { Activity, MapPin, Clock, Gauge, Cpu, Siren } from 'lucide-react';
import { SimulationState } from '@/lib/types';

interface Props {
  state: SimulationState;
}

export function LiveOptimizationFeed({ state }: Props) {
  return (
    <div className="glass-panel h-full p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="data-readout text-primary text-xs">LIVE OPTIMIZATION FEED</span>
        <div className="flex items-center gap-2">
          <div className={state.isActive ? 'status-dot-active' : 'status-dot-warning'} />
          <span className="data-readout text-xs text-muted-foreground">
            {state.isActive ? 'ACTIVE' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatusCard
          icon={<MapPin className="w-4 h-4" />}
          label="DESTINATION"
          value={state.destination || '—'}
          color="text-primary"
        />
        <StatusCard
          icon={<Clock className="w-4 h-4" />}
          label="ETA"
          value={state.eta > 0 ? `${state.eta.toFixed(1)} min` : '—'}
          color="text-warning"
        />
        <StatusCard
          icon={<Gauge className="w-4 h-4" />}
          label="SPEED"
          value={state.speed > 0 ? `${state.speed.toFixed(0)} km/h` : '—'}
          color="text-success"
        />
        <StatusCard
          icon={<Cpu className="w-4 h-4" />}
          label="AI STATUS"
          value={state.isActive ? 'ROUTING' : 'IDLE'}
          color="text-primary"
        />
      </div>

      {/* Ambulance Visual */}
      <div className="flex-1 glass-panel-strong rounded-lg overflow-hidden flex items-center justify-center relative">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <motion.div
          className="relative z-10 flex flex-col items-center gap-3"
          animate={state.isActive ? { y: [0, -5, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className={`p-4 rounded-full ${state.isActive ? 'neon-glow-red bg-destructive/20' : 'bg-muted/30'}`}>
            <Siren className={`w-10 h-10 ${state.isActive ? 'text-destructive' : 'text-muted-foreground'}`} />
          </div>
          <div className="text-center">
            <p className="data-readout text-xs text-muted-foreground">
              {state.isActive ? 'UNIT DISPATCHED' : 'AWAITING DISPATCH'}
            </p>
            {state.isActive && (
              <motion.p
                className="data-readout text-lg text-primary text-glow-blue mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {state.progress.toFixed(0)}%
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatusCard({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="glass-panel-strong rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-[10px] text-muted-foreground font-mono tracking-widest">{label}</span>
      </div>
      <p className={`font-mono text-sm font-semibold ${color} truncate`}>{value}</p>
    </div>
  );
}
