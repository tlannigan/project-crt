import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Box({ title, className, children }: ComponentProps<'div'>) {
  return (
    <div className={twMerge('relative border-2 border-foreground px-6 py-5', className)}>
      {title && <span className="absolute -top-3.5 left-3 bg-background px-3">{title}</span>}
      {children}
    </div>
  );
}
