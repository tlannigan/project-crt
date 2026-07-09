import type { ComponentProps, CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';
import styles from './CrtScreen.module.css';

export type CrtScreenProps = {
  backgroundColor?: string;
  foregroundColor?: string;
  hasBloom?: boolean;
  hasCornerReflection?: boolean;
  hasEdgeShadow?: boolean;
  hasFlicker?: boolean;
  hasGrain?: boolean;
  hasHumBar?: boolean;
  hasPhosphorMask?: boolean;
  hasScanlines?: boolean;
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
