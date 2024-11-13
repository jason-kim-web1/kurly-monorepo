import * as React from 'react';

import COLOR from '../constant/colorset';

export default function DropDownArrow({
  width = 20,
  height = 20,
  fill = COLOR.benefitGray,
  viewBox = '0 0 20 20',
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 14.2178L17.2559 6.96185L16.0774 5.78334L10 11.8608L3.92265 5.78334L2.74414 6.96185L10 14.2178Z"
        fill={fill}
      />
    </svg>
  );
}
