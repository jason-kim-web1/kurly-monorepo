import * as React from 'react';

import COLOR from '../constant/colorset';

export default function ArrowDown({
  width = 18,
  height = 18,
  stroke = COLOR.kurlyGray450,
  strokeWidth = '1.2',
  viewBox = '0 0 18 18',
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13 7L9 11L5 7" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}
