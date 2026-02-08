import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationEffectProps {
  onNextLevel: () => void;
  onLevelSelect: () => void;
  hasNextLevel: boolean;
}

const PARTICLES = ['🎉', '✨', '⭐', '🌟'] as const;
const PARTICLE_COUNT = 16;

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    emoji: PARTICLES[i % PARTICLES.length],
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 1.5 + Math.random() * 1.0,
    size: 1.2 + Math.random() * 1.0,
  }));
}

export default function CelebrationEffect({
  onNextLevel,
  onLevelSelect,
  hasNextLevel,
}: CelebrationEffectProps) {
  const particles = useMemo(generateParticles, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Falling particles */}
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute select-none pointer-events-none"
            style={{
              left: `${p.x}%`,
              fontSize: `${p.size}rem`,
            }}
            initial={{ top: '-10%', opacity: 1 }}
            animate={{ top: '110%', opacity: 0 }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeIn',
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            aria-hidden
          >
            {p.emoji}
          </motion.span>
        ))}

        {/* Main content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 15,
            delay: 0.2,
          }}
        >
          <motion.p
            className="text-5xl font-bold text-yellow-300 drop-shadow-lg"
            style={{ WebkitTextStroke: '2px #a16207' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            やったね！
          </motion.p>

          <div className="flex flex-col gap-3 mt-4 w-56">
            {hasNextLevel && (
              <button
                onClick={onNextLevel}
                className="rounded-2xl bg-green-500 px-8 py-4 text-2xl font-bold text-white shadow-lg active:scale-95 transition-transform"
              >
                つぎへ
              </button>
            )}
            <button
              onClick={onLevelSelect}
              className="rounded-2xl bg-blue-500 px-8 py-4 text-2xl font-bold text-white shadow-lg active:scale-95 transition-transform"
            >
              レベルせんたく
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
