import type { SVGAttributes } from 'react';

import COLOR from '../../../../constant/colorset';

interface Props {
  width?: SVGAttributes<SVGElement>['width'];
  height?: SVGAttributes<SVGElement>['width'];
  color?: SVGAttributes<SVGElement>['stroke'];
}

const ArrowRight16x17 = ({ width = 16, height = 17, color = COLOR.kurlyGray450 }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 17" fill="none">
    <path d="M7 4.25732L11.2426 8.49996L7 12.7426" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default ArrowRight16x17;
