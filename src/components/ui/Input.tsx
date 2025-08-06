import React from 'react';
import { cn } from '../../utils/cn';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'desert' | 'oasis';
  inputSize?: 'sm' | 'md' | 'lg';
  error?: boolean;
  helperText?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text', 
    variant = 'default', 
    inputSize = 'md', 
    error = false,
    helperText,
    label,
    leftIcon,
    rightIcon,
    disabled,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    
    const baseStyles = 'flex w-full rounded-lg border bg-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    
    const variants = {
      default: 'border-input focus-visible:ring-ring',
      desert: 'border-desert-300 focus-visible:ring-desert-500 focus-visible:border-desert-500',
      oasis: 'border-oasis-300 focus-visible:ring-oasis-500 focus-visible:border-oasis-500'
    };
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-3 py-2',
      lg: 'h-12 px-4 text-lg'
    };
    
    const errorStyles = error ? 'border-red-500 focus-visible:ring-red-500' : '';
    
    const inputElement = (
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-desert-500">
            {leftIcon}
          </div>
        )}
        
        <input
          type={inputType}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[inputSize],
            errorStyles,
            leftIcon && 'pl-10',
            (rightIcon || isPassword) && 'pr-10',
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 flex items-center text-desert-500 hover:text-desert-700 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
        
        {rightIcon && !isPassword && (
          <div className="absolute right-3 flex items-center pointer-events-none text-desert-500">
            {rightIcon}
          </div>
        )}
      </div>
    );
    
    if (label || helperText) {
      return (
        <div className="space-y-2">
          {label && (
            <label className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error ? 'text-red-600' : 'text-desert-900'
            )}>
              {label}
            </label>
          )}
          {inputElement}
          {helperText && (
            <p className={cn(
              'text-sm',
              error ? 'text-red-600' : 'text-desert-600'
            )}>
              {helperText}
            </p>
          )}
        </div>
      );
    }
    
    return inputElement;
  }
);

Input.displayName = 'Input';

// Textarea component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'desert' | 'oasis';
  error?: boolean;
  helperText?: string;
  label?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    variant = 'default', 
    error = false,
    helperText,
    label,
    resize = 'vertical',
    ...props 
  }, ref) => {
    const baseStyles = 'flex min-h-[80px] w-full rounded-lg border bg-background px-3 py-2 text-sm transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    
    const variants = {
      default: 'border-input focus-visible:ring-ring',
      desert: 'border-desert-300 focus-visible:ring-desert-500 focus-visible:border-desert-500',
      oasis: 'border-oasis-300 focus-visible:ring-oasis-500 focus-visible:border-oasis-500'
    };
    
    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    };
    
    const errorStyles = error ? 'border-red-500 focus-visible:ring-red-500' : '';
    
    const textareaElement = (
      <textarea
        className={cn(
          baseStyles,
          variants[variant],
          resizeStyles[resize],
          errorStyles,
          className
        )}
        ref={ref}
        {...props}
      />
    );
    
    if (label || helperText) {
      return (
        <div className="space-y-2">
          {label && (
            <label className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error ? 'text-red-600' : 'text-desert-900'
            )}>
              {label}
            </label>
          )}
          {textareaElement}
          {helperText && (
            <p className={cn(
              'text-sm',
              error ? 'text-red-600' : 'text-desert-600'
            )}>
              {helperText}
            </p>
          )}
        </div>
      );
    }
    
    return textareaElement;
  }
);

Textarea.displayName = 'Textarea';

export { Input, Textarea };