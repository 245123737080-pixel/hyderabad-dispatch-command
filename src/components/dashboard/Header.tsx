import { Activity, Radio, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  isEmergency: boolean;
}

export function Header({ isEmergency }: HeaderProps) {
  return (
    <header className="glass-panel-strong px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Shield className="w-8 h-8 text-primary" />
          {isEmergency && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-destructive"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">
            EVPS <span className="text-primary">HYDERABAD</span>
          </h1>
          <p className="text-xs text-muted-foreground font-mono tracking-widest">
            EMERGENCY VEHICLE PRIORITY SYSTEM
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-success" />
          <span className="data-readout text-success">SYSTEM ONLINE</span>
        </div>
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-primary animate-pulse-glow" />
          <span className="data-readout text-primary">
            {isEmergency ? 'EMERGENCY ACTIVE' : 'STANDBY'}
          </span>
        </div>
        <div className="data-readout text-muted-foreground">
          {new Date().toLocaleTimeString('en-US', { hour12: false })}
        </div>
      </div>
    </header>
  );
}
