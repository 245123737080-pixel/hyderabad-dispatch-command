import { motion } from 'framer-motion';
import { Header } from '@/components/dashboard/Header';
import { LiveResponseMap } from '@/components/dashboard/LiveResponseMap';
import { LiveOptimizationFeed } from '@/components/dashboard/LiveOptimizationFeed';
import { AIModelAnalysis } from '@/components/dashboard/AIModelAnalysis';
import { AIDecisionLogic } from '@/components/dashboard/AIDecisionLogic';
import { EmergencyButton } from '@/components/dashboard/EmergencyButton';
import { useSimulation } from '@/hooks/useSimulation';

const Index = () => {
  const { state, startSimulation, resetSimulation } = useSimulation();

  return (
    <div
      className={`min-h-screen bg-background grid-overlay flex flex-col p-3 gap-3 ${
        state.isActive ? 'emergency-border' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Header isEmergency={state.isActive} />
        </div>
        <EmergencyButton
          onTrigger={startSimulation}
          isActive={state.isActive}
          onReset={resetSimulation}
        />
      </div>

      {/* 4-Quadrant Grid */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="min-h-0"
        >
          <LiveResponseMap state={state} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="min-h-0"
        >
          <LiveOptimizationFeed state={state} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="min-h-0"
        >
          <AIModelAnalysis models={state.modelsComparison} isActive={state.isActive} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="min-h-0"
        >
          <AIDecisionLogic state={state} />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
