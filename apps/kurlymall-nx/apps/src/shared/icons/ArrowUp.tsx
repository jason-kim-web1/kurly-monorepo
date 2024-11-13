import * as React from 'react';

import COLOR from '../constant/colorset';

export default function ArrowUp({
  width = 18,
  height = 18,
  stroke = COLOR.kurlyGray450,
  strokeWidth = 1.2,
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      stroke={stroke}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 11L9 7L13 11" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}
