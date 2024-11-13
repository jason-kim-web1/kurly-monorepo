import * as React from 'react';

import COLOR from '../constant/colorset';

interface Props extends React.SVGAttributes<SVGElement> {
  fillBg?: string;
}

export default function OrganicIcon({
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
        d="M30.7,16.81l-.36.14-.36.14h0a7.6,7.6,0,0,1,.29,4.9l-.09.28a8.51,8.51,0,0,1-7.79,6.21V21.86L29,15.22l0,0a9.15,9.15,0,0,1,.89,1.7l.05.13.36-.13.34-.19,0-.09a8.77,8.77,0,0,0-1-1.85A23,23,0,0,0,22.18,8L22,7.94l-.18.1a23,23,0,0,0-7.5,6.78,8.94,8.94,0,0,0-1,1.84l-.06.15a8.27,8.27,0,0,0-.22,5.69v0a9.29,9.29,0,0,0,8.52,6.72v6.58a.39.39,0,0,0,.78,0V29.25a9.29,9.29,0,0,0,8.52-6.72v0A8.27,8.27,0,0,0,30.7,16.81Zm-9.09-1.13L17.84,11.9a26,26,0,0,1,3.77-2.84Zm7-1.11-6.19,6.2V9.06A22.82,22.82,0,0,1,28.58,14.57ZM14.08,17A8.42,8.42,0,0,1,15,15.24a16.24,16.24,0,0,1,2.31-2.81l4.33,4.34v8.52l-7.75-7.75c.05-.15.1-.31.16-.46Zm-.26,5.32L13.74,22h0a7.39,7.39,0,0,1-.1-3.59l8,8v2.1A8.51,8.51,0,0,1,13.82,22.27Z"
      />
    </svg>
  );
}
