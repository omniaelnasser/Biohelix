import React from 'react';

const US = ({ className, size = 24, ...props }) => (
  <svg
    className={className}
    width={size}
    height={size * 0.67} // 4:3 ratio
    viewBox="0 0 24 16"
    {...props}
  >
    <rect width="24" height="16" fill="#B22234"/>
    <rect y="7" width="24" height="2" fill="#FFFFFF"/>
    <rect x="2" y="8" width="2" height="1" fill="#3C3B6E"/>
    <rect x="5" y="8" width="2" height="1" fill="#3C3B6E"/>
    <rect x="8" y="8" width="2" height="1" fill="#3C3B6E"/>
    <rect x="11" y="8" width="2" height="1" fill="#3C3B6E"/>
    <rect x="14" y="8" width="2" height="1" fill="#3C3B6E"/>
    <rect x="17" y="8" width="2" height="1" fill="#3C3B6E"/>
    <rect x="20" y="8" width="2" height="1" fill="#3C3B6E"/>
  </svg>
);

export default US;
