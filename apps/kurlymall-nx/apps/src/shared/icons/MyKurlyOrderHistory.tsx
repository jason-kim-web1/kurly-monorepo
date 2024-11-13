import type { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

interface Props extends SVGAttributes<SVGElement> {
  strokeWidth?: string;
}

export default function MyKurlyOrderHistory({
  width = 28,
  height = 28,
  strokeWidth = '1.5',
  fill = COLOR.kurlyWhite,
  stroke = COLOR.kurlyGray800,
  ...props
}: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 28 28" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" fill="none" />
      <path
        d="M6 5C6 3.89543 6.89543 3 8 3H25C26.1046 3 27 3.89543 27 5V21C27 23.7614 24.7614 26 22 26H8C6.89543 26 6 25.1046 6 24V5Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path d="M10 9H22" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M10 13H18" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M10.5 19H16.5" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path
        d="M18.1147 19H1V22C1 24.2091 2.79086 26 5 26H22L20.9008 25.7162C18.0662 24.9843 16.7336 21.7314 18.2399 19.2211C18.2983 19.1238 18.2281 19 18.1147 19Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
