import React from 'react';

import COLOR from '../constant/colorset';

export const ArrowDown24x24 = ({
  width = 24,
  height = 24,
  stroke = COLOR.kurlyGray600,
  strokeWidth = '1.8',
  ...props
}: React.SVGAttributes<SVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
      <g clipPath="url(#clip0_1665_746)">
        <path d="M21 8L12 17L3 8" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="square" />
      </g>
      <defs>
        <clipPath id="clip0_1665_746">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
