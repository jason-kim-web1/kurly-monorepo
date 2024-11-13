import * as React from 'react';

import COLOR from '../constant/colorset';

interface Props extends React.SVGAttributes<SVGElement> {
  fillBg?: string;
}

export default function GrowthIcon({
  width = 44,
  height = 44,
  fillBg = COLOR.kurlyWhite,
  fill = COLOR.kurlyPurple,
  ...props
}: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle fill={fillBg} cx="22" cy="22" r="22" />
      <path
        fill={fill}
        d="M21.2,20h1.66a.4.4,0,0,0,.39-.37l.58-9.32a1.83,1.83,0,1,0-3.66,0l.65,9.33A.38.38,0,0,0,21.2,20Z"
      />
      <path
        fill={fill}
        d="M27.79,21.54H16.21a.77.77,0,0,0-.77.78v4.45a10.16,10.16,0,0,0,6.42,9.48l.14.06.14-.06a10.16,10.16,0,0,0,6.42-9.48V22.32A.77.77,0,0,0,27.79,21.54Zm0,5.23A9.41,9.41,0,0,1,22,35.48a9.41,9.41,0,0,1-5.79-8.71V22.32h3.14v1.07c0,1.72,1,4,2.65,4.61,1.6-.64,2.65-2.89,2.65-4.61V22.32h3.14Z"
      />
    </svg>
  );
}
