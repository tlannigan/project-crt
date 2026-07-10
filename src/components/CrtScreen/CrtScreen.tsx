import type { ComponentProps, CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';
import styles from './CrtScreen.module.css';

export type CrtScreenProps = {
  backgroundColor?: string;
  foregroundColor?: string;
  /** Enables glowing text-shadow */
  hasBloom?: boolean;
  /** Enables rounded glass reflection in top left corner */
  hasCornerReflection?: boolean;
  /** Enables vignette */
  hasEdgeShadow?: boolean;
  /** Enables light opacity flicker animation */
  hasFlicker?: boolean;
  /** Enables film grain noise animation */
  hasGrain?: boolean;
  /** Enables dark and light oscillating hum bar that moves from bottom to top  */
  hasHumBar?: boolean;
  /** Enables a vertical phosphor stripe mask  */
  hasPhosphorMask?: boolean;
  /** Enables static alternating horizontal dark bars */
  hasScanlines?: boolean;
  /** The number of vertical scanlines */
  scanlineCount?: number;
} & ComponentProps<'div'>;

export default function CrtScreen({
  backgroundColor,
  foregroundColor,
  hasBloom = true,
  hasCornerReflection = true,
  hasEdgeShadow = true,
  hasFlicker = true,
  hasGrain = true,
  hasHumBar = true,
  hasPhosphorMask = true,
  hasScanlines = true,
  scanlineCount = 240,
  className,
  style,
  children
}: CrtScreenProps) {
  const cssVars = {
    ...(backgroundColor !== undefined && { '--background': backgroundColor }),
    ...(foregroundColor !== undefined && { '--foreground': foregroundColor }),
    '--scanline-count': scanlineCount
  } as CSSProperties;

  return (
    <div
      className={twMerge(
        'relative bg-background text-foreground outline-foreground border-foreground caret-foreground',
        hasBloom && 'text-shadow-glow',
        className
      )}
      style={{ ...style, ...cssVars }}
    >
      <div>{children}</div>
      {hasBloom && <div className={twMerge(styles.effect, styles.screenGlow)} />}
      {hasPhosphorMask && <div className={twMerge(styles.effect, styles.phosphorMask)} />}
      {hasScanlines && <div className={twMerge(styles.effect, styles.scanlines)} />}
      {hasHumBar && <div className={twMerge(styles.effect, styles.humBar)} />}
      {hasGrain && <div className={twMerge(styles.effect, styles.grain)} />}
      {hasFlicker && <div className={twMerge(styles.effect, styles.flicker)} />}
      {hasEdgeShadow && <div className={twMerge(styles.effect, styles.edgeShadow)} />}
      {hasCornerReflection && <div className={twMerge(styles.effect, styles.cornerReflection)} />}
    </div>
  );
}
