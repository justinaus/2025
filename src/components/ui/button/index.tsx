import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(['rounded', 'cursor-pointer'], {
  variants: {
    variant: {
      filled: ['bg-primary', 'text-primary-foreground hover:bg-primary/90'],
      outline: ['border', 'border-blue-500', 'text-blue-500'],
      ghost: ['bg-transparent', 'text-blue-500'],
    },
    size: {
      xs: ['text-xs', 'px-2', 'py-1'],
      sm: ['text-sm', 'px-3', 'py-2'],
      md: ['text-base', 'px-4', 'py-2'],
      lg: ['text-lg', 'px-5', 'py-3'],
      xl: ['text-xl', 'px-6', 'py-4'],
    },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md',
  },
});

export function Button({
  className,
  variant,
  size,
  ...rest
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className,
      )}
      {...rest}
    />
  );
}
