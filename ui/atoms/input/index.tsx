import { FC, forwardRef, HTMLAttributes } from 'react';
import cn from 'clsx';

import styles from './styles.module.scss';

// TODO: finish off component and it's styles
type InputProps = {
  as?: string;
  variant?: 'default' | 'search';
} & Record<string, any> &
  HTMLAttributes<HTMLInputElement>;

export const Input: FC<InputProps> = forwardRef(
  ({ as = 'input', variant = 'default', type = 'text', className, error, ...props }, ref) => {
    const Comp = as as any;

    return (
      <Comp
        className={cn(styles.root, styles[variant], error && styles.error, className)}
        type={type}
        ref={ref}
        {...props}
      />
    );
  },
);
