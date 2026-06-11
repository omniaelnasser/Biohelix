import React from 'react';

const EG = ({ className, size = 24, ...props }) => (
  <svg
    className={className}
    width={size}
    height={size * 0.67} // 4:3 ratio
    viewBox="0 0 24 16"
    {...props}
  >
    <rect width="24" height="16" fill="#CE1126"/>
    <rect y="5" width="24" height="6" fill="#FFFFFF"/>
    <polygon points="0,5 8,8 8,5" fill="#CE1126"/>
    <polygon points="16,5 24,8 24,5" fill="#CE1126"/>
  </svg>
);

export default EG;
