interface TrackGridProps {
  gridSize: number;
}

// Track dimensions (in SVG units where 1 unit = 1 cell)
const BALLAST_WIDTH = 0.36;
const RAIL_GAP = 0.10;       // Half-gauge: each rail is 0.10 from center
const RAIL_THICK = 0.03;
const TIE_LEN = 0.28;        // Length across track
const TIE_WIDTH = 0.02;
const TIE_SPACING = 0.14;
const INTERSECTION_SIZE = 0.30;

export default function TrackGrid({ gridSize }: TrackGridProps) {
  return (
    <svg
      viewBox={`0 0 ${gridSize} ${gridSize}`}
      className="absolute inset-0 w-full h-full"
      style={{ borderRadius: 'inherit' }}
    >
      {/* Grass background */}
      <rect width={gridSize} height={gridSize} fill="#86efac" />

      {/* Horizontal tracks */}
      {Array.from({ length: gridSize }, (_, row) => (
        <HorizontalTrack key={`h-${row}`} row={row} gridSize={gridSize} />
      ))}

      {/* Vertical tracks */}
      {Array.from({ length: gridSize }, (_, col) => (
        <VerticalTrack key={`v-${col}`} col={col} gridSize={gridSize} />
      ))}

      {/* Intersection plates */}
      {Array.from({ length: gridSize }, (_, row) =>
        Array.from({ length: gridSize }, (_, col) => (
          <rect
            key={`i-${col}-${row}`}
            x={col + 0.5 - INTERSECTION_SIZE / 2}
            y={row + 0.5 - INTERSECTION_SIZE / 2}
            width={INTERSECTION_SIZE}
            height={INTERSECTION_SIZE}
            fill="#909090"
            opacity={0.25}
            rx={0.02}
          />
        ))
      )}
    </svg>
  );
}

function HorizontalTrack({ row, gridSize }: { row: number; gridSize: number }) {
  const cy = row + 0.5;

  // Generate crosstie positions
  const ties: number[] = [];
  for (let tx = TIE_SPACING / 2; tx < gridSize; tx += TIE_SPACING) {
    ties.push(tx);
  }

  return (
    <g>
      {/* Ballast bed */}
      <rect
        x={0} y={cy - BALLAST_WIDTH / 2}
        width={gridSize} height={BALLAST_WIDTH}
        fill="#b8a88a"
      />
      {/* Crossties */}
      {ties.map((tx, i) => (
        <rect
          key={i}
          x={tx - TIE_WIDTH / 2} y={cy - TIE_LEN / 2}
          width={TIE_WIDTH} height={TIE_LEN}
          fill="#8B7355"
        />
      ))}
      {/* Rail 1 (top) */}
      <rect
        x={0} y={cy - RAIL_GAP - RAIL_THICK / 2}
        width={gridSize} height={RAIL_THICK}
        fill="#707070"
      />
      {/* Rail 1 highlight */}
      <rect
        x={0} y={cy - RAIL_GAP - RAIL_THICK / 2}
        width={gridSize} height={RAIL_THICK * 0.4}
        fill="#a0a0a0" opacity={0.6}
      />
      {/* Rail 2 (bottom) */}
      <rect
        x={0} y={cy + RAIL_GAP - RAIL_THICK / 2}
        width={gridSize} height={RAIL_THICK}
        fill="#707070"
      />
      {/* Rail 2 highlight */}
      <rect
        x={0} y={cy + RAIL_GAP - RAIL_THICK / 2}
        width={gridSize} height={RAIL_THICK * 0.4}
        fill="#a0a0a0" opacity={0.6}
      />
    </g>
  );
}

function VerticalTrack({ col, gridSize }: { col: number; gridSize: number }) {
  const cx = col + 0.5;

  // Generate crosstie positions
  const ties: number[] = [];
  for (let ty = TIE_SPACING / 2; ty < gridSize; ty += TIE_SPACING) {
    ties.push(ty);
  }

  return (
    <g>
      {/* Ballast bed */}
      <rect
        x={cx - BALLAST_WIDTH / 2} y={0}
        width={BALLAST_WIDTH} height={gridSize}
        fill="#b8a88a"
      />
      {/* Crossties */}
      {ties.map((ty, i) => (
        <rect
          key={i}
          x={cx - TIE_LEN / 2} y={ty - TIE_WIDTH / 2}
          width={TIE_LEN} height={TIE_WIDTH}
          fill="#8B7355"
        />
      ))}
      {/* Rail 1 (left) */}
      <rect
        x={cx - RAIL_GAP - RAIL_THICK / 2} y={0}
        width={RAIL_THICK} height={gridSize}
        fill="#707070"
      />
      {/* Rail 1 highlight */}
      <rect
        x={cx - RAIL_GAP - RAIL_THICK / 2} y={0}
        width={RAIL_THICK * 0.4} height={gridSize}
        fill="#a0a0a0" opacity={0.6}
      />
      {/* Rail 2 (right) */}
      <rect
        x={cx + RAIL_GAP - RAIL_THICK / 2} y={0}
        width={RAIL_THICK} height={gridSize}
        fill="#707070"
      />
      {/* Rail 2 highlight */}
      <rect
        x={cx + RAIL_GAP - RAIL_THICK / 2} y={0}
        width={RAIL_THICK * 0.4} height={gridSize}
        fill="#a0a0a0" opacity={0.6}
      />
    </g>
  );
}
