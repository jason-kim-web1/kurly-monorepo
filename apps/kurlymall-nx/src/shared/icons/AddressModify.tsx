import * as React from 'react';

import COLOR from '../constant/colorset';

export default function AddressModify({
  width = 24,
  height = 24,
  stroke = COLOR.kurlyGray350,
  strokeWidth = 1.5,
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="m13.83 5.777 4.393 4.393-10.58 10.58H3.25v-4.394l10.58-10.58zm3.204-2.527c.418 0 .837.16 1.157.48l2.08 2.08a1.63 1.63 0 0 1 0 2.314l-2.157 2.156-4.394-4.394 2.157-2.156c.32-.32.738-.48 1.157-.48z"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  );
}
