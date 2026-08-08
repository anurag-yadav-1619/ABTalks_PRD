import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusty-rose disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none',
  {
    variants: {
      variant: {
        default:
          'bg-dusty-rose text-white hover:bg-dusty-rose-dim active:scale-[0.98] shadow-[0_2px_8px_rgba(188,123,111,0.2)]',
        secondary:
          'bg-bg-surface border border-border-primary text-text-primary hover:bg-bg-elevated active:scale-[0.98]',
        ghost:
          'text-text-secondary hover:text-text-primary hover:bg-bg-surface',
        outline:
          'border border-border-primary text-text-primary hover:bg-bg-surface hover:border-dusty-rose/30',
        accent:
          'bg-soft-coral text-bg-primary font-semibold hover:bg-soft-coral-dim active:scale-[0.98]',
        link:
          'text-dusty-rose underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-11 px-6 py-2.5 text-sm rounded-lg',
        sm: 'h-9 px-4 py-2 text-xs rounded-md',
        lg: 'h-[52px] px-8 py-3 text-base rounded-lg font-semibold',
        icon: 'h-10 w-10 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
