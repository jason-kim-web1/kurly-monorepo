import type { SVGAttributes } from 'react';

import COLOR from '../../../../constant/colorset';

interface Props {
  width?: SVGAttributes<SVGElement>['width'];
  height?: SVGAttributes<SVGElement>['width'];
  color?: SVGAttributes<SVGElement>['fill'];
  bg?: SVGAttributes<SVGElement>['fill'];
}

const ArrowRight6x10 = ({ width = 6, height = 10, color = COLOR.benefitTextGray, bg = COLOR.kurlyWhite }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 6 10" fill="none">
    <g clipPath="url(#clip0_9163_1569)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.82157 5.00005L0.292969 1.47146L1.23578 0.528648L5.70719 5.00005L1.23578 9.47146L0.292969 8.52865L3.82157 5.00005Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_9163_1569">
        <rect width="5.41422" height="8.94281" fill={bg} transform="translate(0.292969 0.528648)" />
      </clipPath>
    </defs>
  </svg>
);

export default ArrowRight6x10;
