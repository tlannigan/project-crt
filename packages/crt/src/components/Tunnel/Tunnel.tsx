'use client';

import { type ComponentProps, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import AnimatedShape, { type Path } from '@/components/AnimatedShape/AnimatedShape';
import type { ShapeType } from '@/components/ShapeOutline/ShapeOutline';

export type { ShapeType };

export type TunnelDirection =
  | 'bottom-left-to-top-right'
  | 'bottom-right-to-top-left'
  | 'top-right-to-bottom-left'
  | 'top-left-to-bottom-right';

export type TunnelProps = {
  /** Max shapes visible at once */
  maxShapes?: number;
  /** Lifetime of each shape in ms, from spawn to fully faded */
  duration?: number;
  /** The diagonal every shape travels along */
  direction?: TunnelDirection;
  shape?: ShapeType;
  /** Shape size in px */
  size?: number;
  /** Vertical wave amplitude in px. Set to `0` for a straight line */
  waveAmplitude?: number;
  /** Number of shapes that make up one full up-and-down wave cycle */
  waveLength?: number;
  /** Outline stroke width in px */
  strokeWidth?: number;
} & ComponentProps<'div'>;

const DIRECTIONS: Record<TunnelDirection, Path> = {
  'bottom-left-to-top-right': { from: { x: '0%', y: '100%' }, to: { x: '100%', y: '0%' } },
  'bottom-right-to-top-left': { from: { x: '100%', y: '100%' }, to: { x: '0%', y: '0%' } },
  'top-right-to-bottom-left': { from: { x: '100%', y: '0%' }, to: { x: '0%', y: '100%' } },
  'top-left-to-bottom-right': { from: { x: '0%', y: '0%' }, to: { x: '100%', y: '100%' } }
};

type ActiveShape = {
  id: number;
  /** How far into its duration the shape spawns, in ms */
  age: number;
  /** Vertical spawn position in px */
  offset: number;
};

export default function Tunnel({
  maxShapes = 10,
  duration = 6000,
  direction = 'bottom-left-to-top-right',
  shape = 'square',
  size = 64,
  waveAmplitude = 40,
  waveLength = 6,
  strokeWidth = 2,
  color = 'currentColor',
  className,
  ...props
}: TunnelProps) {
  const [active, setActive] = useState<ActiveShape[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  const idRef = useRef(0);
  const waveRef = useRef({ waveAmplitude, waveLength });
  const tickRef = useRef(0);

  useEffect(() => {
    waveRef.current = { waveAmplitude, waveLength };
  }, [waveAmplitude, waveLength]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const count = Math.max(1, Math.floor(maxShapes));
    const interval = duration / count;

    // Sample the wave at a monotonic spawn tick, so successive shapes trace a sine.
    const offsetFor = (tick: number) => {
      const { waveAmplitude: amplitude, waveLength: length } = waveRef.current;
      return amplitude * Math.sin((2 * Math.PI * tick) / (length > 0 ? length : 1));
    };

    // Seed a full, evenly-phased field so the stream reads as established on first paint.
    // The oldest shape gets the earliest tick so the seeded wave joins the live one.
    const seeded = Array.from({ length: count }, (_, i) => ({
      id: idRef.current++,
      age: i * interval,
      offset: offsetFor(count - 1 - i)
    }));
    tickRef.current = count;
    setActive(seeded);

    if (reducedMotion) {
      return;
    }

    const timeouts = new Set<ReturnType<typeof setTimeout>>();
    const scheduleRemoval = (id: number, life: number) => {
      const t = setTimeout(() => {
        setActive((current) => current.filter((s) => s.id !== id));
        timeouts.delete(t);
      }, life);
      timeouts.add(t);
    };

    for (const item of seeded) {
      scheduleRemoval(item.id, duration - item.age);
    }

    const spawner = setInterval(() => {
      const item = { id: idRef.current++, age: 0, offset: offsetFor(tickRef.current++) };
      setActive((current) => [...current, item]);
      scheduleRemoval(item.id, duration);
    }, interval);

    return () => {
      clearInterval(spawner);
      for (const t of timeouts) {
        clearTimeout(t);
      }
    };
  }, [reducedMotion, maxShapes, duration]);

  const path = DIRECTIONS[direction];

  return (
    <div className={twMerge('relative overflow-hidden', className)} {...props}>
      {active.map((item) => (
        <AnimatedShape
          key={item.id}
          shape={shape}
          size={size}
          strokeWidth={strokeWidth}
          color={color}
          path={path}
          offset={item.offset}
          age={item.age}
          duration={duration}
        />
      ))}
    </div>
  );
}
