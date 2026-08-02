import { cn } from "../../lib/cn";
import {type HTMLAttributes, forwardRef} from 'react';


const sizeClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
  xl: 'p-6'
} as const

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof sizeClasses
}



export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({className,  size = "lg",...props}, ref) => (
        <div ref={ref} className={cn('border border-border-default bg-card-default text-card-foreground rounded-lg', sizeClasses[size] , className)} {...props} />
    )
)
Card.displayName = 'Card';


