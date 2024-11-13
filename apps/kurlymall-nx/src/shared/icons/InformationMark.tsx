import * as React from 'react';

import COLOR from '../constant/colorset';

export default function ExclamationMark({
  width = 14,
  height = 14,
  stroke = COLOR.kurlyGray800,
  fill = COLOR.kurlyGray800,
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" stroke={stroke} strokeWidth="1.2" />
      <circle cx="8" cy="5.15625" r="0.984375" fill={fill} />
      <rect x="7.23438" y="7.125" width="1.53125" height="4.8125" rx="0.7" fill="#333333" />
    </svg>
  );
}
