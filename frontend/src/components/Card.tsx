import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'blue';
}

export const Card = ({ children, className = '', variant = 'default' }: CardProps) => {
  const baseStyle = 'rounded-xl shadow-lg overflow-hidden p-6';
  const variantStyles = {
    default: 'bg-card border border-gray-800',
    blue: 'bg-gradient-to-br from-primary-start to-primary-end border-none',
  };

  return (
    <div className={`${baseStyle} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};
