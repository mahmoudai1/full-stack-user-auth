import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

type ButtonVariant = 
  | 'primary' 
  | 'dark'
  | 'default';

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  type = 'button',
  variant = 'default',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  ...props
}) => {
  const baseClasses = [
    'inline-flex items-center justify-center rounded-lg focus-visible:outline-none',
    'font-semibold text-white shadow-xs transition-all cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'active:ring-3 active:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    fullWidth ? 'w-full' : '',
  ].join(' ');

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600 active:ring-blue-600',
    dark: 'bg-gray-800 hover:bg-gray-700 focus-visible:outline-gray-800 active:ring-gray-800',
    default: 'bg-gray-50 !text-gray-800 !shadow border border-gray-200 hover:bg-gray-100 focus-visible:outline-gray-200 active:ring-gray-200',
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs gap-x-1.5',
    md: 'px-3.5 py-2.5 text-sm gap-x-2',
    lg: 'px-4 py-3 text-base gap-x-2.5',
  };

  return (
    <button
      {...props}
      type={type}
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="inline-flex items-center">{icon}</span>
          )}
          {text}
          {icon && iconPosition === 'right' && (
            <span className="inline-flex items-center">{icon}</span>
          )}
        </>
      )}
    </button>
  );
}

export default Button;