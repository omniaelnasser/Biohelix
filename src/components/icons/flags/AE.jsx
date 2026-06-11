import React from 'react';

const AE = ({ className, size = 24, ...props }) => (
  <svg
    className={className}
    width={size}
    height={size * 0.67} // 4:3 ratio
    viewBox="0 0 24 16"
    {...props}
  >
    <rect width="24" height="16" fill="#00732F"/>
    <rect width="24" height="1" fill="#FFFFFF"/>
    <rect y="4" width="24" height="1" fill="#FFFFFF"/>
    <rect y="7" width="24" height="1" fill="#FFFFFF"/>
    <rect y="10" width="24" height="1" fill="#FFFFFF"/>
    <rect y="13" width="24" height="1" fill="#FFFFFF"/>
  </svg>
);

export default AE;
