
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '', // This will receive theme-specific classes
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';

  // Default variant styles. These will be applied if not overridden by theme-specific classes in `className`.
  // Tailwind merges classes, and later classes in the string take precedence for conflicting properties.
  const defaultVariantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-transparent text-slate-600 border border-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:ring-slate-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  // If `className` (from theme) is provided, it might redefine bg, text, border, hover states.
  // The defaultVariantStyles will apply first, then specific theme classes from `className` can override.
  return (
    <button
      className={`${baseStyles} ${defaultVariantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
