import * as React from 'react';

import COLOR from '../constant/colorset';

interface Props extends React.SVGAttributes<SVGElement> {
  fillBg?: string;
}

export default function AdditivesFood({
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
        d="M33.58,24.7h-.69c.7-1.16.84-2.88.39-5.15a18.36,18.36,0,0,0-.89-3.1l-.13-.33-.34.11a10.42,10.42,0,0,0-5.65,3.66,5.35,5.35,0,0,0-7-1,4.62,4.62,0,0,0-4-.55,4.68,4.68,0,0,0-2.5,2.62,3.22,3.22,0,0,0-2.13,1.85,2.83,2.83,0,0,0,.08,1.93h-.36a.78.78,0,0,0-.77.77v2.32a3.48,3.48,0,0,0,3.47,3.47H30.88a3.48,3.48,0,0,0,3.47-3.47V25.47A.78.78,0,0,0,33.58,24.7Zm-1.06-5c.33,1.65.48,3.83-.57,5H29.14l2.87-7A20,20,0,0,1,32.52,19.7Zm-1.17-2.46L28.3,24.7H26.14a5.31,5.31,0,0,1-.13-.6,7.27,7.27,0,0,1,.33-2.75,2.56,2.56,0,0,1,.11-.24C27.23,19.46,28.88,18.16,31.35,17.24ZM11.43,23a2.63,2.63,0,0,1,1.81-1.43l.19-.06.06-.18A4.06,4.06,0,0,1,15.6,19a4.07,4.07,0,0,1,3.5.61l.22.13.2-.15a4.64,4.64,0,0,1,6.28.92c-.05.14-.13.35-.2.6a6,6,0,0,0-.35,3.06,4.5,4.5,0,0,0,.08.51H11.61A2.28,2.28,0,0,1,11.43,23Z"
      />
      <rect fill={fill} x="21.36" y="9.26" width="1.27" height="5.08" />
      <rect fill={fill} x="21.36" y="15.31" width="1.27" height="1.12" />
    </svg>
  );
}
