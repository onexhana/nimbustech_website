// src/components/About/KeywordIcon.tsx
import { useState } from 'react';

interface KeywordIconProps {
  keyword: string;
  icon: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function KeywordIcon({ 
  keyword, 
  icon, 
  description, 
  size = 'md',
  color = 'blue'
}: KeywordIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-20 h-20 text-lg'
  };

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div 
      className="flex flex-col items-center space-y-2 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          ${sizeClasses[size]} rounded-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}
          flex items-center justify-center text-white font-bold
          transition-all duration-300 transform
          ${isHovered ? 'scale-110 shadow-xl' : 'shadow-lg'}
          group-hover:rotate-12
        `}
        style={{
          boxShadow: isHovered ? '0 15px 30px rgba(59, 130, 246, 0.4)' : '0 8px 20px rgba(59, 130, 246, 0.2)'
        }}
      >
        <span className="text-xl">{icon}</span>
      </div>
      
      <div className="text-center">
        <span 
          className={`
            font-semibold text-gray-700 transition-colors duration-300
            ${isHovered ? 'text-blue-600' : ''}
          `}
        >
          {keyword}
        </span>
        {description && (
          <p className="text-xs text-gray-500 mt-1 max-w-20 leading-tight">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
