'use client';

import { type ComponentProps, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type ProgressBarOrientation = 'horizontal' | 'vertical';

export type ProgressBarProps = {
  /** Progress from 0 to 100. Ignored when `autoPlay` is set to true */
  value?: number;
  /** Number of blocks that make up a full bar */
  cells?: number;
  /** Fill left-to-right (horizontal) or bottom-to-top (vertical) */
  orientation?: ProgressBarOrientation;
  /** Animate from empty to full */
  autoPlay?: boolean;
  /** Length of the autoPlay animation in ms */
  duration?: number;
  /** Render dimly lit characters in empty cells */
  showTrack?: boolean;
} & ComponentProps<'div'>;

const clamp = (n: number) => Math.min(100, Math.max(0, n));

export default function ProgressBar({
  value = 0,
  cells = 20,
  orientation = 'horizontal',
  autoPlay = false,
  duration = 3000,
  showTrack = false,
  className,
  'aria-label': ariaLabel = 'Progress',
  ...props
}: ProgressBarProps) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setAnimated(progress * 100);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoPlay, duration]);

  const count = Math.max(1, Math.floor(cells));
  const percent = clamp(autoPlay ? animated : value);
  const filled = Math.round((percent / 100) * count);
  const vertical = orientation === 'vertical';

  const cellIds = useMemo(() => Array.from({ length: count }, () => crypto.randomUUID()), [count]);

  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={twMerge(
        'inline-flex font-vga text-2xl leading-none text-shadow-glow select-none',
        vertical ? 'flex-col-reverse' : 'flex-row',
        className
      )}
      {...props}
    >
      {cellIds.map((id, i) => {
        const isFilled = i < filled;
        const cell = isFilled ? undefined : showTrack ? 'opacity-30' : 'invisible';
        return (
          <span key={id} aria-hidden="true" className={cell}>
            {/* Solid unicode block (U+2588) */}
            &#x2588;
          </span>
        );
      })}
    </div>
  );
}
