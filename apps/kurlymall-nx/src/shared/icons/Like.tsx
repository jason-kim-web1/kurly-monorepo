import type { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

export default function Like({
  width = 68,
  height = 68,
  stroke = COLOR.kurlyGray250,
  strokeLinecap = 'round',
  strokeWidth = '2',
  fill = 'none',
  ...props
}: SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 68 68" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M57.025 14.975c-5.3-5.3-13.889-5.3-19.186 0L34 18.812l-3.837-3.837c-5.3-5.3-13.89-5.3-19.19 0-5.296 5.297-5.296 13.886 0 19.186l3.838 3.837 18.482 18.485a1 1 0 0 0 1.414 0s0 0 0 0l18.482-18.485h0l3.837-3.837c5.3-5.3 5.3-13.89 0-19.186z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );
}
