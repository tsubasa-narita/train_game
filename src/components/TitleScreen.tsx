import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Train3D from './Train3D';

interface TitleScreenProps {
  onStart: () => void;
}

export default function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-sky-300 to-sky-100 gap-6 p-4">
      {/* 3D Train Display */}
      <div className="w-48 h-32">
        <Canvas camera={{ position: [3, 2, 3], fov: 40 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Train3D lightOn={true} isHonking={false} scale={0.6} />
        </Canvas>
      </div>

      {/* Title */}
      <motion.h1
        className="text-4xl font-black text-blue-600 drop-shadow-md text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        でんしゃ
        <br />
        プログラミング
      </motion.h1>

      <motion.p
        className="text-lg text-blue-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        でんしゃに めいれいを だそう！
      </motion.p>

      {/* Start Button */}
      <motion.button
        className="mt-4 px-12 py-5 bg-green-500 text-white text-3xl font-bold rounded-2xl shadow-lg cursor-pointer active:scale-95 transition-transform"
        whileTap={{ scale: 0.92 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.5 }}
        onClick={onStart}
      >
        あそぶ！
      </motion.button>
    </div>
  );
}
