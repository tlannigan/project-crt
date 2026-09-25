import type { ComponentProps, CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';
import { type ErrorCorrection, encodeQrMatrix } from './utils/qr';
import '../../styles/base.css';

export type QrCodeProps = {
  url: string;
  /** Error-correction level. Higher levels tolerates more damage decrease the amount of information that can be stored. */
  errorCorrection?: ErrorCorrection;
  /** Margin width around the matrix, in modules. QR code spec requires a minimum of 4 to scan to be reliably scanned. */
  quietZone?: number;
} & Omit<ComponentProps<'div'>, 'children'>;

export default function QrCode({
  url,
  errorCorrection = 'M',
  quietZone = 4,
  className,
  style,
  ...rest
}: QrCodeProps) {
  const matrix = encodeQrMatrix(url, errorCorrection);
  const size = matrix.length;

  const gridStyle: CSSProperties = {
    padding: `${quietZone}em`,
    gridTemplateColumns: `repeat(${size}, 1em)`,
    gridTemplateRows: `repeat(${size}, 1em)`,
    ...style
  };

  return (
    <div
      role="img"
      aria-label={`QR code linking to ${url}`}
      className={twMerge(className, 'inline-grid')}
      style={gridStyle}
      {...rest}
    >
      {matrix.flatMap((row, y) =>
        row.flatMap((dark, x) =>
          dark
            ? [
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: Array items are homogenous and don't change positions
                  key={`${y}-${x}`}
                  className="bg-current"
                  style={{ gridColumn: x + 1, gridRow: y + 1 }}
                />
              ]
            : []
        )
      )}
    </div>
  );
}
