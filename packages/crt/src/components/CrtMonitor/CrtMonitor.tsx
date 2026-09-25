import type { ComponentProps, CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';
import '../../styles/base.css';
import './CrtMonitor.css';

export type CrtMonitorProps = {
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

export default function CrtMonitor({
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
}: CrtMonitorProps) {
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
      {hasBloom && <div className="crt-monitor-effect crt-monitor-screen-glow" />}
      {hasPhosphorMask && <div className="crt-monitor-effect crt-monitor-phosphor-mask" />}
      {hasScanlines && <div className="crt-monitor-effect crt-monitor-scanlines" />}
      {hasHumBar && <div className="crt-monitor-effect crt-monitor-hum-bar" />}
      {hasGrain && <div className="crt-monitor-effect crt-monitor-grain" />}
      {hasFlicker && <div className="crt-monitor-effect crt-monitor-flicker" />}
      {hasEdgeShadow && <div className="crt-monitor-effect crt-monitor-edge-shadow" />}
      {hasCornerReflection && <div className="crt-monitor-effect crt-monitor-corner-reflection" />}
    </div>
  );
}
