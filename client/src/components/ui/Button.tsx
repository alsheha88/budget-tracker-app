import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/cn';

const variantClasses = {
  primary: 'bg-interactive-primary hover:bg-interactive-primary-hover active:bg-interactive-primary-active text-interactive-primary-foreground focus-visible:outline focus-visible:outline-primary',
  secondary: 'bg-interactive-secondary hover:bg-interactive-secondary-hover active:bg-interactive-secondary-active text-interactive-secondary-foreground border border-interactive-secondary-border',
  destructive: 'bg-interactive-destructive hover:bg-interactive-destructive-hover active:bg-interactive-destructive-active text-interactive-destructive-foreground',
  ghost: 'hover:bg-none hover:bg-interactive-ghost-hover active:bg-interactive-ghost-active  text-interactive-ghost-foreground',
} as const

const sizeClasses = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-3.5 py-2 text-[13px]',
  lg: 'px-5 py-3 text-sm',
} as const

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClasses
  size?: keyof typeof sizeClasses
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-sm font-semibold transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button';
