
import React from 'react';

interface VibraLogoProps {
  className?: string;
}

const VibraLogo: React.FC<VibraLogoProps> = ({ className }) => {
  return (
    <svg 
      className={className}
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="8" fill="#9146FF"/>
      <path d="M13 9L8 13.5V31H13V9Z" fill="white"/>
      <path d="M32 9H16V21L21 16H27L32 21V9Z" fill="white"/>
      <circle cx="24" cy="17" r="3" fill="#9146FF"/>
    </svg>
  );
};

export default VibraLogo;
