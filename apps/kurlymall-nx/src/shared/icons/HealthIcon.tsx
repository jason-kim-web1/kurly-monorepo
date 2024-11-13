import * as React from 'react';

import COLOR from '../constant/colorset';

interface Props extends React.SVGAttributes<SVGElement> {
  fillBg?: string;
}

export default function HealthIcon({
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
        d="M27,13.21V10a.78.78,0,0,0-.77-.78h-8.5A.78.78,0,0,0,17,10v3.17a3.49,3.49,0,0,0-2.7,3.39V32.81a.78.78,0,0,0,.77.77H29a.78.78,0,0,0,.77-.77V16.6A3.49,3.49,0,0,0,27,13.21Zm-.77-.09H24.7V10h1.55Zm-6.18,0V10h1.54v3.08ZM22.39,10h1.54v3.08H22.39Zm-4.64,0H19.3v3.08H17.75Zm-2.7,22.77V16.6a2.71,2.71,0,0,1,2.7-2.71h8.5A2.71,2.71,0,0,1,29,16.6V32.81Z"
      />
      <polygon
        fill={fill}
        points="23.19 20.26 20.81 20.26 20.81 22.16 18.91 22.16 18.91 24.54 20.81 24.54 20.81 26.44 23.19 26.44 23.19 24.54 25.09 24.54 25.09 22.16 23.19 22.16 23.19 20.26"
      />
    </svg>
  );
}
