import * as React from 'react';

import COLOR from '../constant/colorset';

export default function CheckBoxInactive({
  width = 18,
  height = 18,
  stroke = COLOR.lightGray,
  fill = 'none',
  strokeWidth = '1.5',
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z"
        stroke={stroke}
        fill={fill}
      />
      <path
        d="M7 12.6667L10.3846 16L18 8.5"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
