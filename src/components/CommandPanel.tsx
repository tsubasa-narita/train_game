import { motion, AnimatePresence } from 'framer-motion';
import { COMMAND_INFO } from '../game/types';
import type { Command } from '../game/types';

const COMMAND_COLORS: Record<Command, string> = {
  forward: '#3b82f6',
  left: '#f97316',
  right: '#f97316',
  horn: '#eab308',
  light: '#a855f7',
};

interface CommandPanelProps {
  commands: Command[];
  availableCommands: Command[];
  isExecuting: boolean;
  onAddCommand: (cmd: Command) => void;
  onRemoveCommand: (index: number) => void;
  onClear: () => void;
  onExecute: () => void;
  hint?: string;
}

export default function CommandPanel({
  commands,
  availableCommands,
  isExecuting,
  onAddCommand,
  onRemoveCommand,
  onClear,
  onExecute,
  hint,
}: CommandPanelProps) {
  return (
    <div className="w-full bg-white/90 backdrop-blur rounded-t-2xl shadow-lg p-3 flex flex-col gap-3">
      {/* Hint */}
      {hint && (
        <p className="text-center text-sm text-gray-600 font-medium">{hint}</p>
      )}

      {/* Command Queue */}
      <div className="flex items-center gap-2 min-h-[48px] overflow-x-auto px-1">
        <span className="text-xs text-gray-400 shrink-0">プログラム:</span>
        <div className="flex gap-1.5 items-center flex-1 flex-wrap">
          <AnimatePresence mode="popLayout">
            {commands.map((cmd, index) => (
              <motion.button
                key={`${cmd}-${index}`}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                whileTap={isExecuting ? undefined : { scale: 0.85 }}
                disabled={isExecuting}
                onClick={() => onRemoveCommand(index)}
                className="relative w-10 h-10 min-h-[44px] min-w-[44px] rounded-lg flex items-center justify-center text-lg disabled:opacity-50 cursor-pointer"
                style={{ backgroundColor: COMMAND_COLORS[cmd] }}
              >
                {COMMAND_INFO[cmd].emoji}
                {!isExecuting && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center leading-none font-bold">
                    x
                  </span>
                )}
              </motion.button>
            ))}
          </AnimatePresence>
          {commands.length === 0 && (
            <span className="text-gray-300 text-sm">
              ボタンをおしてね
            </span>
          )}
        </div>

        {/* Clear button */}
        {commands.length > 0 && (
          <motion.button
            whileTap={isExecuting ? undefined : { scale: 0.9 }}
            disabled={isExecuting}
            onClick={onClear}
            className="shrink-0 min-h-[44px] px-3 rounded-lg bg-red-400 text-white text-xs font-bold disabled:opacity-50 cursor-pointer"
          >
            クリア
          </motion.button>
        )}
      </div>

      {/* Command Palette + GO button */}
      <div className="flex items-center gap-2">
        {/* Command buttons */}
        <div className="flex gap-2 flex-1 flex-wrap">
          {availableCommands.map((cmd) => (
            <motion.button
              key={cmd}
              whileTap={isExecuting ? undefined : { scale: 0.88 }}
              disabled={isExecuting}
              onClick={() => onAddCommand(cmd)}
              className="flex flex-col items-center justify-center min-w-[56px] min-h-[56px] rounded-xl text-white font-bold shadow-md disabled:opacity-50 cursor-pointer"
              style={{ backgroundColor: COMMAND_COLORS[cmd] }}
            >
              <span className="text-2xl leading-none">{COMMAND_INFO[cmd].emoji}</span>
              <span className="text-[10px] mt-0.5">{COMMAND_INFO[cmd].label}</span>
            </motion.button>
          ))}
        </div>

        {/* GO button */}
        <motion.button
          whileTap={
            isExecuting || commands.length === 0 ? undefined : { scale: 0.92 }
          }
          disabled={isExecuting || commands.length === 0}
          onClick={onExecute}
          className="min-w-20 h-16 rounded-xl bg-[#22c55e] text-white text-2xl font-bold shadow-lg disabled:opacity-40 cursor-pointer"
        >
          GO!
        </motion.button>
      </div>
    </div>
  );
}
