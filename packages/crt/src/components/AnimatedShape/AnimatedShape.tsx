import type { CSSProperties } from 'react';
import ShapeOutline, { dimensions, type ShapeType } from '../ShapeOutline/ShapeOutline';
import '../../styles/base.css';
import './AnimatedShape.css';

/** The diagonal a shape travels along, as left/top CSS positions */
export type Path = { from: { x: string; y: string }; to: { x: string; y: string } };

export type AnimatedShapeProps = {
  /** The shape type rendered */
  shape: ShapeType;
  /** Shape size in px */
  size: number;
  /** Outline stroke width in px */
  strokeWidth: number;
  /** Outline color */
  color: string;
  /** The diagonal this shape travels along */
  path: Path;
  /** Vertical spawn position in px */
  offset: number;
  /** How far into its duration the shape spawns, in ms */
  age: number;
  /** Lifetime in ms */
  duration: number;
  /** Pause the animation without setting prefers-reduced-motion */
  paused?: boolean;
};

function shiftInitialY(base: string, offset: number): string {
  if (offset === 0) {
    return base;
  }
  return `calc(${base} ${offset < 0 ? '-' : '+'} ${Math.abs(offset)}px)`;
}

/** Shape that animates across a diagonal and fades out */
export default function AnimatedShape({
  shape,
  size,
  strokeWidth,
  color,
  path,
  offset,
  age,
  duration,
  paused = false
}: AnimatedShapeProps) {
  const { from, to } = path;
  const { width, height } = dimensions(shape, size);
  const fromY = shiftInitialY(from.y, offset);
  const toY = shiftInitialY(to.y, offset);

  const style = {
    '--from-x': from.x,
    '--from-y': fromY,
    '--to-x': to.x,
    '--to-y': toY,
    '--duration': `${duration}ms`,
    '--delay': `${-age}ms`,
    width,
    height,
    transform: 'translate(-50%, -50%)',
    ...(paused && { animationPlayState: 'paused' })
  } as CSSProperties;

  return (
    <span className="crt-animated-shape" style={style} aria-hidden="true">
      <ShapeOutline
        type={shape}
        width={width}
        height={height}
        strokeWidth={strokeWidth}
        color={color}
      />
    </span>
  );
}
