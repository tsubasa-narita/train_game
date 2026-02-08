import { motion } from 'framer-motion';
import { levels } from '../game/levels';

interface LevelSelectScreenProps {
  clearedLevels: Set<number>;
  onSelectLevel: (index: number) => void;
  onBack: () => void;
}

export default function LevelSelectScreen({
  clearedLevels,
  onSelectLevel,
  onBack,
}: LevelSelectScreenProps) {
  return (
    <div className="flex flex-col items-center h-full bg-gradient-to-b from-sky-200 to-green-100 p-6 gap-6 overflow-y-auto">
      <h2 className="text-3xl font-bold text-blue-600">レベルせんたく</h2>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {levels.map((level, index) => {
          const cleared = clearedLevels.has(level.id);
          return (
            <motion.button
              key={level.id}
              whileTap={{ scale: 0.92 }}
              onClick={() => onSelectLevel(index)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl shadow-md text-white font-bold cursor-pointer
                ${cleared ? 'bg-yellow-400' : 'bg-blue-400'}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <span className="text-3xl">
                {cleared ? '⭐' : `${level.id}`}
              </span>
              <span className="text-sm">{level.name}</span>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={onBack}
        className="mt-4 px-8 py-3 bg-gray-400 text-white text-xl font-bold rounded-2xl shadow cursor-pointer"
      >
        もどる
      </motion.button>
    </div>
  );
}
