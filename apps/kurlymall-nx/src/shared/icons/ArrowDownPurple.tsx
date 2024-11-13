import React from 'react';

import COLOR from '../constant/colorset';

export default function ArrowDownPurple({
  width = 18,
  height = 18,
  stroke = COLOR.loversLavender,
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13 7L9 11L5 7" stroke={stroke} strokeWidth="1.2" />
    </svg>
  );
}
