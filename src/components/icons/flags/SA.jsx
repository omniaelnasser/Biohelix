import React from 'react';

const SA = ({ className, size = 24, ...props }) => (
  <svg
    className={className}
    width={size}
    height={size * 0.67} // 4:3 ratio
    viewBox="0 0 24 16"
    {...props}
  >
    <rect width="24" height="16" fill="#006C35"/>
    <rect y="6" width="24" height="4" fill="#FFFFFF"/>
    <polygon points="0,6 8,10 8,6" fill="#FFFFFF"/>
    <polygon points="16,6 24,10 24,6" fill="#FFFFFF"/>
  </svg>
);

export default SA;
