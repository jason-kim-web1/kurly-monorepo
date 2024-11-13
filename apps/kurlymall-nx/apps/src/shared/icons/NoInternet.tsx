import * as React from 'react';

import COLOR from '../constant/colorset';

export default function NoInternet({
  width = 68,
  height = 68,
  stroke = COLOR.kurlyGray250,
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M17.667 33.2834C22.279 29.442 28.0914 27.3384 34.0937 27.3384C40.0959 27.3384 45.9083 29.442 50.5203 33.2834"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M9.31348 26C16.1325 19.9893 24.9102 16.6729 34.0001 16.6729C37.2309 16.6729 40.4222 17.0918 43.5001 17.9017"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M25.9033 40.59C28.2721 38.9071 31.1059 38.0029 34.0117 38.0029C36.9174 38.0029 39.7512 38.9071 42.12 40.59"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="50" r="2" fill={stroke} />
      <path d="M51 14L61 24" stroke={stroke} strokeWidth="2" />
      <path d="M51 24L61 14" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}
