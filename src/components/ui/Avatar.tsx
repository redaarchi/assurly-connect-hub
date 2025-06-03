
import React from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallbackInitials?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 'md', 
  className = '', 
  fallbackInitials 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  };

  return (
    <div className={`
      relative rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 
      flex items-center justify-center text-white font-medium shadow-lg
      ${sizeClasses[size]} ${className}
    `}>
      {src ? (
        <img 
          src={src} 
          alt={alt || 'Avatar'} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      ) : fallbackInitials ? (
        <span className="font-semibold">{fallbackInitials}</span>
      ) : (
        <User size={iconSizes[size]} />
      )}
    </div>
  );
};

export default Avatar;
