import type { SVGAttributes } from 'react';

import ColorSet from '../../../../constant/colorset';

interface Props {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: SVGAttributes<SVGElement>['strokeWidth'];
  strokeLinecap?: SVGAttributes<SVGElement>['strokeLinecap'];
  strokeLineJoin?: SVGAttributes<SVGElement>['strokeLinejoin'];
}

const ArrowUp14x8 = ({ width, height, stroke, strokeWidth, strokeLinecap, strokeLineJoin }: Props) => {
  return (
    <svg width={width || 14} height={height || 8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.34326 7L7.00012 1.34315L12.657 7"
        stroke={stroke || ColorSet.kurlyGray450}
        strokeWidth={strokeWidth || 1.3}
        strokeLinecap={strokeLinecap || 'round'}
        strokeLinejoin={strokeLineJoin || 'round'}
      />
    </svg>
  );
};

export default ArrowUp14x8;
