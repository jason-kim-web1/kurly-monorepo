import * as React from 'react';

import COLOR from '../constant/colorset';

export default function Previous({
  width = 23,
  height = 44,
  stroke = COLOR.kurlyWhite,
  strokeWidth = 2,
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 23 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 1.5L2 22L22 42.5" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}
