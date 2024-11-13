import * as React from 'react';

import COLOR from '../constant/colorset';

export default function Check({
  width = 15,
  height = 11,
  stroke = COLOR.kurlyWhite,
  strokeWidth = 2,
  viewBox = '0 0 15 11',
  d = 'M1 4.76471L5.5 9L14 1',
  strokeLinecap = undefined,
  strokeLinejoin = undefined,
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>
  );
}
