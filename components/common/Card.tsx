
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, interactive = false }) => {
  // Removed default bg-white and shadow-lg from baseClasses. These should come from theme.cardBgClass via className.
  const baseClasses = "rounded-xl overflow-hidden"; 
  // Adjusted interactive classes for better theme compatibility. Theme might provide its own shadow.
  const interactiveClasses = interactive ? "transition-all duration-200 ease-in-out hover:scale-[1.03] hover:brightness-105 cursor-pointer" : "";
  
  return (
    <div className={`${baseClasses} ${className} ${interactiveClasses}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
