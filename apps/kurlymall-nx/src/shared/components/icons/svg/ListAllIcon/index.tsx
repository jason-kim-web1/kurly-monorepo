import type { SVGAttributes } from 'react';

import COLOR from '../../../../constant/colorset';

interface Props {
  width?: SVGAttributes<SVGElement>['width'];
  height?: SVGAttributes<SVGElement>['height'];
  circleStroke?: SVGAttributes<SVGElement>['stroke'];
  pathStroke?: SVGAttributes<SVGElement>['stroke'];
}

export const ListAllIcon = ({
  width = 45,
  height = 45,
  circleStroke = COLOR.lightGray,
  pathStroke = COLOR.kurlyPurple,
}: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 45 45" fill="none">
      <g>
        <circle cx="22.5" cy="22.5" r="22" stroke={circleStroke} />
        <path
          d="M20 15L28 23.2246L20 31"
          stroke={pathStroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
