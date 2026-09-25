import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Box({ title, className, children }: ComponentProps<'div'>) {
  return (
    <div className={twMerge('relative border-2 border-foreground p-5 shadow-glow', className)}>
      {title && <span className="absolute -top-3.5 left-2.5 bg-background px-2.5">{title}</span>}
      {children}
    </div>
  );
}
