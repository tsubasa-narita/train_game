import { motion } from 'framer-motion';
import { levels } from '../game/levels';
import { TRAIN_INFO, type TrainType } from '../game/types';
import TrainSVG from './TrainSVG';

const trainTypes: TrainType[] = ['komachi', 'kagayaki', 'hayabusa', 'nozomi'];

interface LevelSelectScreenProps {
  clearedLevels: Set<number>;
  trainType: TrainType;
  onSelectLevel: (index: number) => void;
  onSelectTrain: (trainType: TrainType) => void;
  onBack: () => void;
}

export default function LevelSelectScreen({
  clearedLevels,
  trainType,
  onSelectLevel,
  onSelectTrain,
  onBack,
}: LevelSelectScreenProps) {
  return (
    <div className="flex flex-col items-center h-full bg-gradient-to-b from-sky-200 to-green-100 p-6 gap-5 overflow-y-auto">
      <h2 className="text-3xl font-bold text-blue-600">レベルせんたく</h2>

      {/* Train selector */}
      <div className="w-full max-w-sm">
        <p className="text-sm font-bold text-gray-500 mb-2 text-center">しんかんせんを えらぼう</p>
        <div className="grid grid-cols-4 gap-2">
          {trainTypes.map((t) => {
            const info = TRAIN_INFO[t];
            const isSelected = trainType === t;
            return (
              <motion.button
                key={t}
                whileTap={{ scale: 0.9 }}
                onClick={() => onSelectTrain(t)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl cursor-pointer transition-all
                  ${isSelected
                    ? 'bg-yellow-100 ring-3 ring-yellow-400 shadow-md'
                    : 'bg-white/70 shadow-sm'
                  }
                `}
              >
                <div className="w-16 h-20">
                  <TrainSVG trainType={t} lightOn={false} />
                </div>
                <span className={`text-xs font-bold ${isSelected ? 'text-yellow-600' : 'text-gray-500'}`}>
                  {info.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

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
