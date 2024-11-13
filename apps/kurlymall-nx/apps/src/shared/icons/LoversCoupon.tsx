import type { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

export default function LoversCoupon({
  width = 24,
  height = 24,
  stroke = COLOR.kurlyPurple,
  ...props
}: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" {...props}>
      <g transform="translate(-143 -577)">
        <circle cx="16" cy="16" r="16" fill="none" data-name="ico_coupon" transform="translate(143 577)" />
        <path
          fill={stroke}
          d="M153.444 589.333h11.112V596h-11.112zm13.889 3.333a1.667 1.667 0 001.667 1.667v3.333a1.667 1.667 0 01-1.667 1.667h-16.666a1.667 1.667 0 01-1.667-1.666v-3.334a1.667 1.667 0 001.667-1.667A1.667 1.667 0 00149 591v-3.333a1.667 1.667 0 011.667-1.667h16.666a1.667 1.667 0 011.667 1.667V591a1.667 1.667 0 00-1.667 1.667zm-1.666-3.61a.833.833 0 00-.833-.833h-11.667a.833.833 0 00-.833.833v7.222a.833.833 0 00.833.833h11.666a.833.833 0 00.833-.833z"
          data-name="Icon awesome-ticket-alt"
        />
      </g>
    </svg>
  );
}
