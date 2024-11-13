import * as React from 'react';

import COLOR from '../constant/colorset';

export default function MagnifyingGlass({
  width = 48,
  height = 48,
  stroke = COLOR.kurlyGray250,
  fill = COLOR.kurlyWhite,
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_368_6766)">
        <path
          d="M22.0732 43.1463C33.7116 43.1463 43.1463 33.7116 43.1463 22.0732C43.1463 10.4348 33.7116 1 22.0732 1C10.4348 1 1 10.4348 1 22.0732C1 33.7116 10.4348 43.1463 22.0732 43.1463Z"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M47.8293 47.8291L37.2927 37.2925" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_368_6766">
          <rect width={width} height={height} fill={fill} />
        </clipPath>
      </defs>
    </svg>
  );
}
