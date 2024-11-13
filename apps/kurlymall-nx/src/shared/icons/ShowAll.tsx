import type { SVGAttributes } from 'react';
import * as React from 'react';

import COLOR from '../constant/colorset';

export default function ShowAll({
  width = 45,
  height = 45,
  stroke = COLOR.mainProductCardBorder,
  fill = COLOR.mainPurple,
}: SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22.5" cy="22.5" r="22" stroke={stroke} />
      <path d="M20 15L28 23.2246L20 31" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
