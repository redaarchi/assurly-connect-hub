
import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'default', 
  size = 'default',
  className,
  disabled,
  type = 'button'
}) => {
  return (
    <ShadcnButton
      variant={variant}
      size={size}
      onClick={onClick}
      className={className}
      disabled={disabled}
      type={type}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;
