import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Building2 } from 'lucide-react';
import { Hospital, HOSPITALS } from '@/lib/types';

interface Props {
  onTrigger: (hospital: Hospital) => void;
  isActive: boolean;
  onReset: () => void;
}

export function EmergencyButton({ onTrigger, isActive, onReset }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  if (isActive) {
    return (
      <motion.button
        className="glass-panel-strong px-4 py-2 flex items-center gap-2 neon-glow-red border-destructive/30 cursor-pointer"
        onClick={onReset}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <X className="w-4 h-4 text-destructive" />
        <span className="data-readout text-destructive text-xs">ABORT MISSION</span>
      </motion.button>
    );
  }

  return (
    <div className="relative">
      <motion.button
        className="glass-panel-strong px-4 py-2 flex items-center gap-2 neon-glow-red border-destructive/30 cursor-pointer"
        onClick={() => setShowPicker(!showPicker)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AlertTriangle className="w-4 h-4 text-destructive" />
        <span className="data-readout text-destructive text-xs">INITIATE EMERGENCY</span>
      </motion.button>

      <AnimatePresence>
        {showPicker && (
          <motion.div
            className="absolute top-full mt-2 right-0 z-50 glass-panel-strong p-2 min-w-[220px] neon-glow-blue"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-[10px] text-muted-foreground font-mono tracking-widest px-2 py-1">
              SELECT DESTINATION
            </p>
            {HOSPITALS.map(h => (
              <button
                key={h.name}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-primary/10 flex items-center gap-2 transition-colors cursor-pointer"
                onClick={() => {
                  onTrigger(h);
                  setShowPicker(false);
                }}
              >
                <Building2 className="w-3 h-3 text-primary" />
                <span className="text-xs font-mono text-foreground">{h.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
