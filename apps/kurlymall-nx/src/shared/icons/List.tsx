import * as React from 'react';

import COLOR from '../constant/colorset';

export default function List({
  width = 15,
  height = 15,
  stroke = COLOR.kurlyGray800,
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1_101_10540" fill="white">
        <rect x="0.75" y="0.75" width="6.3" height="6.3" rx="1" />
      </mask>
      <rect
        x="0.75"
        y="0.75"
        width="6.3"
        height="6.3"
        rx="1"
        stroke={stroke}
        strokeWidth="2.4"
        mask="url(#path-1-inside-1_101_10540)"
      />
      <mask id="path-2-inside-2_101_10540" fill="white">
        <rect x="8.4502" y="0.75" width="6.3" height="6.3" rx="1" />
      </mask>
      <rect
        x="8.4502"
        y="0.75"
        width="6.3"
        height="6.3"
        rx="1"
        stroke={stroke}
        strokeWidth="2.4"
        mask="url(#path-2-inside-2_101_10540)"
      />
      <mask id="path-3-inside-3_101_10540" fill="white">
        <rect x="0.75" y="8.44995" width="6.3" height="6.3" rx="1" />
      </mask>
      <rect
        x="0.75"
        y="8.44995"
        width="6.3"
        height="6.3"
        rx="1"
        stroke={stroke}
        strokeWidth="2.4"
        mask="url(#path-3-inside-3_101_10540)"
      />
      <mask id="path-4-inside-4_101_10540" fill="white">
        <rect x="8.4502" y="8.44995" width="6.3" height="6.3" rx="1" />
      </mask>
      <rect
        x="8.4502"
        y="8.44995"
        width="6.3"
        height="6.3"
        rx="1"
        stroke={stroke}
        strokeWidth="2.4"
        mask="url(#path-4-inside-4_101_10540)"
      />
    </svg>
  );
}
