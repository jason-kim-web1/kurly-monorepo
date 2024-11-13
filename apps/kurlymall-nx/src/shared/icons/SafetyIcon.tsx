import * as React from 'react';

import COLOR from '../constant/colorset';

interface Props extends React.SVGAttributes<SVGElement> {
  fillBg?: string;
}

export default function SafetyIcon({
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
        d="M22,9.6l-9.65,5.22V23.4c0,5,3,8.61,9.5,11.31l.15.06.15-.06c6.48-2.7,9.5-6.3,9.5-11.31V14.82Zm8.88,13.8c0,4.63-2.82,8-8.88,10.53-6.06-2.56-8.88-5.9-8.88-10.53V15.28L22,10.47l8.88,4.81Z"
      />
      <path fill={fill} d="M18.45,21.65a.77.77,0,0,0-1.09,1.09L20.64,26l6-6a.77.77,0,0,0-1.09-1.09l-4.91,4.91Z" />
    </svg>
  );
}
