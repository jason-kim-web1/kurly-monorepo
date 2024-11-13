import * as React from 'react';

import COLOR from '../constant/colorset';

export default function Reset({
  width = 16,
  height = 16,
  stroke = COLOR.kurlyGray600,
  strokeWidth = '1.6',
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13.78 3.96303C12.504 2.16973 10.4086 1 8.04 1C4.15192 1 1 4.15192 1 8.04C1 11.9281 4.15192 15.08 8.04 15.08C11.9281 15.08 15.08 11.9281 15.08 8.04"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M14.4933 1L14.4933 4.52H10.9733"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}
