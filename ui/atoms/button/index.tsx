import { FC } from 'react';
import cn from 'clsx';

import styles from './styles.module.scss';

type ButtonProps = {
  as?: string;
  type?: 'submit' | 'button' | any;
  className?: string;
  variant?: 'solid' | 'outlined' | 'underlined' | 'link' | 'icon';
  size?: 'sm' | 'md';
  disabled?: boolean;
} & Record<string, any>;

export const Button: FC<ButtonProps> = ({
  as = 'button',
  variant = 'solid',
  size = 'sm',
  className,
  type = 'button',
  ...props
}) => {
  const Comp = as as any;

  return <Comp className={cn(styles[variant], styles[size], className)} type={type} {...props} />;
};
