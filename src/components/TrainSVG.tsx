import type { TrainType } from '../game/types';

interface TrainSVGProps {
  trainType: TrainType;
  lightOn: boolean;
  compact?: boolean;
}

/**
 * Side-view shinkansen SVG.
 * Drawn facing LEFT (west). GameGrid rotates via CSS transform.
 * compact: hides rails, tighter viewBox for grid use.
 */
export default function TrainSVG({ trainType, lightOn, compact = false }: TrainSVGProps) {
  const colors = TRAIN_COLORS[trainType];
  const vb = compact ? '0 10 200 95' : '0 0 200 130';

  return (
    <svg viewBox={vb} width="100%" height="100%">
      <defs>
        <linearGradient id={`body-${trainType}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.bodyTop} />
          <stop offset="100%" stopColor={colors.bodyBottom} />
        </linearGradient>
      </defs>

      {/* === Body (main rounded rectangle) === */}
      <rect
        x="40" y="28" width="155" height="52" rx="8"
        fill={`url(#body-${trainType})`}
        stroke={colors.outline}
        strokeWidth="1"
      />

      {/* === Nose (aerodynamic front) === */}
      <path
        d={`M40,28 Q40,28 40,32 L10,48 Q4,52 10,56 L40,72 Q40,76 40,80 Z`}
        fill={colors.noseFill}
        stroke={colors.outline}
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* === Stripe === */}
      <rect x="40" y={colors.stripeY} width="155" height={colors.stripeH} fill={colors.stripe} />
      {/* Stripe on nose */}
      <path
        d={`M40,${colors.stripeY} L${18 + (colors.stripeY - 28) * 0.5},${colors.stripeY + colors.stripeH / 2} L40,${colors.stripeY + colors.stripeH} Z`}
        fill={colors.stripe}
      />

      {/* === Second stripe (if any) === */}
      {colors.stripe2 && (
        <>
          <rect x="40" y={colors.stripe2Y!} width="155" height={colors.stripe2H!} fill={colors.stripe2} />
          <path
            d={`M40,${colors.stripe2Y!} L${18 + (colors.stripe2Y! - 28) * 0.5},${colors.stripe2Y! + colors.stripe2H! / 2} L40,${colors.stripe2Y! + colors.stripe2H!} Z`}
            fill={colors.stripe2}
          />
        </>
      )}

      {/* === Windows === */}
      <rect x="56" y="36" width="14" height="12" rx="3" fill={colors.windowFill} stroke={colors.windowStroke} strokeWidth="0.8" />
      <rect x="76" y="36" width="14" height="12" rx="3" fill={colors.windowFill} stroke={colors.windowStroke} strokeWidth="0.8" />
      <rect x="96" y="36" width="14" height="12" rx="3" fill={colors.windowFill} stroke={colors.windowStroke} strokeWidth="0.8" />
      <rect x="116" y="36" width="14" height="12" rx="3" fill={colors.windowFill} stroke={colors.windowStroke} strokeWidth="0.8" />
      <rect x="136" y="36" width="14" height="12" rx="3" fill={colors.windowFill} stroke={colors.windowStroke} strokeWidth="0.8" />
      {/* Window reflections */}
      <rect x="57" y="37" width="12" height="4" rx="2" fill="#fff" opacity="0.3" />
      <rect x="77" y="37" width="12" height="4" rx="2" fill="#fff" opacity="0.3" />
      <rect x="97" y="37" width="12" height="4" rx="2" fill="#fff" opacity="0.3" />
      <rect x="117" y="37" width="12" height="4" rx="2" fill="#fff" opacity="0.3" />
      <rect x="137" y="37" width="12" height="4" rx="2" fill="#fff" opacity="0.3" />

      {/* === Driver window === */}
      <path
        d="M30,42 L42,36 L42,48 Z"
        fill={colors.windowFill}
        stroke={colors.windowStroke}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* === Headlight === */}
      <ellipse cx="12" cy="52" rx="4" ry="3"
        fill={lightOn ? '#fbbf24' : '#e5e7eb'}
        stroke={colors.outline}
        strokeWidth="0.5"
      />
      {lightOn && <ellipse cx="12" cy="52" rx="8" ry="6" fill="#fbbf2440" />}

      {/* === Door === */}
      <rect x="155" y="42" width="12" height="30" rx="2" fill={colors.doorFill} stroke={colors.outline} strokeWidth="0.5" />
      <line x1="161" y1="42" x2="161" y2="72" stroke={colors.outline} strokeWidth="0.3" opacity="0.5" />

      {/* === Tail end (rear) === */}
      <rect x="192" y="30" width="3" height="48" rx="1.5" fill={colors.outline} opacity="0.3" />

      {/* === Undercarriage === */}
      <rect x="35" y="80" width="160" height="6" rx="2" fill="#555" />

      {/* === Wheels === */}
      <circle cx="60" cy="92" r="7" fill="#404040" stroke="#333" strokeWidth="0.8" />
      <circle cx="60" cy="92" r="4" fill="#666" />
      <circle cx="60" cy="92" r="1.5" fill="#888" />

      <circle cx="110" cy="92" r="7" fill="#404040" stroke="#333" strokeWidth="0.8" />
      <circle cx="110" cy="92" r="4" fill="#666" />
      <circle cx="110" cy="92" r="1.5" fill="#888" />

      <circle cx="165" cy="92" r="7" fill="#404040" stroke="#333" strokeWidth="0.8" />
      <circle cx="165" cy="92" r="4" fill="#666" />
      <circle cx="165" cy="92" r="1.5" fill="#888" />

      {/* === Rails === */}
      {!compact && (
        <>
          <rect x="0" y="100" width="200" height="3" rx="1" fill="#888" />
          <rect x="0" y="106" width="200" height="3" rx="1" fill="#888" />
          <rect x="15" y="99" width="5" height="12" rx="1" fill="#8B7355" />
          <rect x="45" y="99" width="5" height="12" rx="1" fill="#8B7355" />
          <rect x="75" y="99" width="5" height="12" rx="1" fill="#8B7355" />
          <rect x="105" y="99" width="5" height="12" rx="1" fill="#8B7355" />
          <rect x="135" y="99" width="5" height="12" rx="1" fill="#8B7355" />
          <rect x="165" y="99" width="5" height="12" rx="1" fill="#8B7355" />
        </>
      )}
    </svg>
  );
}

/* ============================================================
   Color schemes per train type
   ============================================================ */
interface TrainColors {
  bodyTop: string;
  bodyBottom: string;
  noseFill: string;
  outline: string;
  stripe: string;
  stripeY: number;
  stripeH: number;
  stripe2?: string;
  stripe2Y?: number;
  stripe2H?: number;
  windowFill: string;
  windowStroke: string;
  doorFill: string;
}

const TRAIN_COLORS: Record<string, TrainColors> = {
  // のぞみ (N700) - white + blue stripe
  nozomi: {
    bodyTop: '#f8f8f8',
    bodyBottom: '#e8e8e8',
    noseFill: '#f0f0f0',
    outline: '#c0c0c0',
    stripe: '#2563eb',
    stripeY: 54,
    stripeH: 8,
    windowFill: '#bfdbfe',
    windowStroke: '#93c5fd',
    doorFill: '#eee',
  },
  // こまち (E6) - white + red stripe
  komachi: {
    bodyTop: '#f8f8f8',
    bodyBottom: '#e8e8e8',
    noseFill: '#f0f0f0',
    outline: '#c0c0c0',
    stripe: '#dc143c',
    stripeY: 52,
    stripeH: 10,
    stripe2: '#aaa',
    stripe2Y: 62,
    stripe2H: 3,
    windowFill: '#fecdd3',
    windowStroke: '#fda4af',
    doorFill: '#eee',
  },
  // はやぶさ (E5) - green body + pink stripe
  hayabusa: {
    bodyTop: '#059669',
    bodyBottom: '#047857',
    noseFill: '#059669',
    outline: '#065f46',
    stripe: '#f5f5f5',
    stripeY: 55,
    stripeH: 4,
    stripe2: '#ec4899',
    stripe2Y: 59,
    stripe2H: 5,
    windowFill: '#a7f3d0',
    windowStroke: '#6ee7b7',
    doorFill: '#047857',
  },
  // かがやき (E7) - white + copper/gold band + blue lines
  kagayaki: {
    bodyTop: '#f8f8f8',
    bodyBottom: '#e8e8e8',
    noseFill: '#f0f0f0',
    outline: '#c0c0c0',
    stripe: '#c8884e',
    stripeY: 52,
    stripeH: 10,
    stripe2: '#3b82f6',
    stripe2Y: 62,
    stripe2H: 3,
    windowFill: '#bfdbfe',
    windowStroke: '#93c5fd',
    doorFill: '#eee',
  },
};
