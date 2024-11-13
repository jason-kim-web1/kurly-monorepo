import type { SVGAttributes } from 'react';

import * as React from 'react';

import COLOR from '../constant/colorset';

export default function LoversLinkShare({
  width = 64,
  height = 64,
  stroke = COLOR.kurlyGray800,
  fill = COLOR.bgLightGray,
  ...props
}: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 64 64" {...props}>
      <g transform="translate(-122 37)">
        <circle cx="32" cy="32" r="32" fill={fill} transform="translate(122 -37)" />
        <path
          fill={stroke}
          d="M159.5-10h-3.3a1.1 1.1 0 00-1.1 1.1 1.1 1.1 0 001.1 1.1h3.3a3.31 3.31 0 013.3 3.3 3.31 3.31 0 01-3.3 3.3h-3.3a1.1 1.1 0 00-1.1 1.1 1.1 1.1 0 001.1 1.1h3.3a5.5 5.5 0 005.5-5.5 5.5 5.5 0 00-5.5-5.5zm-9.9 5.5a1.1 1.1 0 001.1 1.1h6.6a1.1 1.1 0 001.1-1.1 1.1 1.1 0 00-1.1-1.1h-6.6a1.1 1.1 0 00-1.1 1.1zm2.2 3.3h-3.3a3.31 3.31 0 01-3.3-3.3 3.31 3.31 0 013.3-3.3h3.3a1.1 1.1 0 001.1-1.1 1.1 1.1 0 00-1.1-1.1h-3.3a5.5 5.5 0 00-5.5 5.5 5.5 5.5 0 005.5 5.5h3.3a1.1 1.1 0 001.1-1.1 1.1 1.1 0 00-1.1-1.1z"
        />
      </g>
    </svg>
  );
}
