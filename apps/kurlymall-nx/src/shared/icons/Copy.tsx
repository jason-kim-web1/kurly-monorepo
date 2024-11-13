import type { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

export default function Copy({ width = 17, height = 16, fill = COLOR.kurlyGray600 }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 17 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.6 3.49999C6.6 3.27908 6.77909 3.09999 7 3.09999H13C13.2209 3.09999 13.4 3.27908 13.4 3.49999V9.49999C13.4 9.72091 13.2209 9.89999 13 9.89999H11.5V6.5C11.5 5.67157 10.8284 5 10 5H4C3.17157 5 2.5 5.67158 2.5 6.5V12.5C2.5 13.3284 3.17157 14 4 14H10C10.8284 14 11.5 13.3284 11.5 12.5V11.1H13C13.8837 11.1 14.6 10.3836 14.6 9.49999V3.49999C14.6 2.61634 13.8837 1.89999 13 1.89999H7C6.11634 1.89999 5.4 2.61634 5.4 3.49999V4.99999H6.6V3.49999ZM3.7 6.5C3.7 6.33432 3.83431 6.2 4 6.2H10C10.1657 6.2 10.3 6.33432 10.3 6.5V12.5C10.3 12.6657 10.1657 12.8 10 12.8H4C3.83431 12.8 3.7 12.6657 3.7 12.5V6.5Z"
        fill={fill}
      />
    </svg>
  );
}
