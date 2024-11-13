import * as React from 'react';

import COLOR from '../constant/colorset';

interface Props extends React.SVGAttributes<SVGElement> {
  fillBg?: string;
}

export default function ProcessIcon({
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
        d="M31.07,24.12h-.39V13.7a.77.77,0,0,0-.77-.77H14.09a.77.77,0,0,0-.77.77V24.12h-.39a3.28,3.28,0,0,0,0,6.56H31.07a3.28,3.28,0,1,0,0-6.56Zm-17-10.42h5.08v4.83a.38.38,0,0,0,.39.38h4.88a.38.38,0,0,0,.39-.38V13.7h5.08V24.12H14.09Zm17,16.21H12.93a2.51,2.51,0,0,1,0-5H31.07a2.51,2.51,0,0,1,0,5Z"
      />
      <circle fill={fill} cx="13.7" cy="27.4" r="1.54" />
      <circle fill={fill} cx="19.23" cy="27.4" r="1.54" />
      <circle fill={fill} cx="24.77" cy="27.4" r="1.54" />
      <circle fill={fill} cx="30.3" cy="27.4" r="1.54" />
    </svg>
  );
}
