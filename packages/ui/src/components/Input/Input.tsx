import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  inputSize?: 'sm' | 'md' | 'lg';
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      variant = 'default',
      inputSize = 'md',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();

    const baseStyles =
      'flex w-full rounded-md transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50';

    const variantStyles = {
      default:
        'border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500',
      filled:
        'bg-gray-100 border-b-2 border-gray-300 rounded-t-md rounded-b-none text-gray-900 placeholder:text-gray-400 focus-visible:bg-gray-50 focus-visible:border-primary-500',
      outlined:
        'border-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-400 focus-visible:border-primary-500',
    };

    const sizeStyles = {
      sm: 'h-8 px-3 py-1 text-sm',
      md: 'h-10 px-3 py-2 text-base',
      lg: 'h-12 px-4 py-3 text-lg',
    };

    const errorStyles = error
      ? 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500'
      : '';

    return (
      <div className="w-full space-y-2">
        {label && (
          <Label
            htmlFor={inputId}
            className={cn(
              'text-gray-700',
              error && 'text-red-600',
              disabled && 'opacity-50'
            )}
          >
            {label}
          </Label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[inputSize],
            errorStyles,
            className
          )}
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-red-600 font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
