import { motion } from 'framer-motion';

interface FailureScreenProps {
  onRetry: () => void;
  onLevelSelect: () => void;
}

export default function FailureScreen({ onRetry, onLevelSelect }: FailureScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <motion.p
          className="text-5xl font-bold text-white drop-shadow-lg"
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 0.5, repeat: 2 }}
        >
          あれれ？
        </motion.p>

        <p className="text-xl text-white/90">もういちど やってみよう！</p>

        <div className="flex flex-col gap-3 mt-4 w-56">
          <button
            onClick={onRetry}
            className="rounded-2xl bg-orange-400 px-8 py-4 text-2xl font-bold text-white shadow-lg active:scale-95 transition-transform"
          >
            もういちど
          </button>
          <button
            onClick={onLevelSelect}
            className="rounded-2xl bg-blue-500 px-8 py-4 text-2xl font-bold text-white shadow-lg active:scale-95 transition-transform"
          >
            レベルせんたく
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
