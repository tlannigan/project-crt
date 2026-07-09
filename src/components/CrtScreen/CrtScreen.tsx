import type { ComponentProps, CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';
import styles from './CrtScreen.module.css';

export type CrtScreenProps = {
  backgroundColor?: string;
  foregroundColor?: string;
  hasAperture?: boolean;
  hasBloom?: boolean;
  hasCornerReflection?: boolean;
  hasFlicker?: boolean;
  hasGlassCurvature?: boolean;
  hasScanlines?: boolean;
} & ComponentProps<'div'>;

export default function CrtScreen({
  backgroundColor,
  foregroundColor,
  hasAperture = true,
  hasBloom = true,
  hasCornerReflection = true,
  hasFlicker = true,
  hasGlassCurvature = true,
  hasScanlines = true,
  className,
  style,
  children
}: CrtScreenProps) {
  const cssVars = {
    ...(backgroundColor !== undefined && { '--background': backgroundColor }),
    ...(foregroundColor !== undefined && { '--foreground': foregroundColor })
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
      <div className={twMerge(hasFlicker && styles.flicker)}>{children}</div>
      <div className={twMerge(styles.effect, hasCornerReflection && styles.cornerReflection)} />
      <div className={twMerge(styles.effect, hasGlassCurvature && styles.glassCurvature)} />
      <div className={twMerge(styles.effect, hasScanlines && styles.scanlines)} />
      <div className={twMerge(styles.effect, hasAperture && styles.aperture)} />
    </div>
  );
}
