import * as React from 'react';

import COLOR from '../constant/colorset';

export default function TextDivider({
  width = 1,
  height = 10,
  stroke = COLOR.kurlyGray350,
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 1 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line x1="0.5" y1="2.18557e-08" x2="0.5" y2="10" stroke={stroke} />
    </svg>
  );
}
