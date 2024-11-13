import * as React from 'react';

import COLOR from '../constant/colorset';

export default function SidebarArrowRight({
  width = 6,
  height = 11,
  fill = COLOR.kurlyGray450,
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 6 11" {...props}>
      <path fill={fill} fillRule="evenodd" d="M1 11L6 5.5 1 0 0 1.1 4 5.5 0 9.9z" />
    </svg>
  );
}
