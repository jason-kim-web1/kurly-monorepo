import type { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

export default function LoversDouble({
  width = 24,
  height = 24,
  stroke = COLOR.kurlyPurple,
  ...props
}: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" {...props}>
      <g transform="translate(-143 -616)">
        <circle cx="16" cy="16" r="16" fill="none" data-name="ico_double" transform="translate(143 616)" />
        <text
          fill={stroke}
          fontFamily="GothamMedium, Gotham Medium"
          fontSize="12"
          letterSpacing="-.025em"
          transform="translate(150 637)"
        >
          <tspan x="0" y="0">
            X
          </tspan>
          <tspan y="0" fontSize="16">
            2
          </tspan>
        </text>
      </g>
    </svg>
  );
}
