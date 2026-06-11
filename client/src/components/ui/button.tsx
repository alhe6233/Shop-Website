import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  render?: React.ReactElement
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', render, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50',
      variant === 'default' && 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm',
      variant === 'outline' && 'border border-border bg-transparent hover:bg-muted text-foreground',
      variant === 'ghost' && 'hover:bg-muted text-foreground',
      size === 'sm' && 'h-8 px-3 text-xs',
      size === 'md' && 'h-9 px-4 text-sm',
      size === 'lg' && 'h-10 px-5 text-sm',
      className
    )

    if (render) {
      return (
        <render.type
          {...render.props}
          className={cn(classes, render.props.className)}
        >
          {children}
        </render.type>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
