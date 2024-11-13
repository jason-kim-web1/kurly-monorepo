import type { SVGAttributes } from 'react';

import COLOR from '../../../../constant/colorset';

interface Props {
  width?: SVGAttributes<SVGElement>['width'];
  height?: SVGAttributes<SVGElement>['height'];
  stroke?: SVGAttributes<SVGElement>['stroke'];
}

export const ArrowNext18x18 = ({ width = 18, height = 18, stroke = COLOR.kurlyWhite }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18" fill="none">
      <path d="M8 4.75735L12.2426 9L8 13.2426" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
