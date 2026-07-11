import type { ReactElement } from 'react';

export type ShapeType = 'rectangle' | 'square' | 'circle' | 'triangle';

/** A rectangle is drawn wider than it is tall; every other shape fills a square box. */
export function dimensions(type: ShapeType, size: number): { width: number; height: number } {
  return type === 'rectangle'
    ? { width: size, height: Math.round(size * 0.62) }
    : { width: size, height: size };
}

export type ShapeOutlineProps = {
  type: ShapeType;
  /** Width in px */
  width: number;
  /** Height in px */
  height: number;
  /** Outline stroke width in px */
  strokeWidth: number;
  /** Stroke color */
  color: string;
};

/** Hollow SVG */
export default function ShapeOutline({
  type,
  width,
  height,
  strokeWidth,
  color
}: ShapeOutlineProps) {
  const inset = strokeWidth / 2;
  const common = {
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinejoin: 'miter' as const
  };

  let outline: ReactElement;
  if (type === 'circle') {
    outline = (
      <ellipse
        cx={width / 2}
        cy={height / 2}
        rx={width / 2 - inset}
        ry={height / 2 - inset}
        {...common}
      />
    );
  } else if (type === 'triangle') {
    // Equilateral triangle
    const base = width - strokeWidth;
    const triHeight = (base * Math.sqrt(3)) / 2;
    const top = (height - triHeight) / 2;
    const bottom = (height + triHeight) / 2;
    outline = (
      <polygon
        points={`${width / 2},${top} ${width - inset},${bottom} ${inset},${bottom}`}
        {...common}
      />
    );
  } else {
    outline = (
      <rect
        x={inset}
        y={inset}
        width={width - strokeWidth}
        height={height - strokeWidth}
        {...common}
      />
    );
  }

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <title>{type}</title>
      {outline}
    </svg>
  );
}
