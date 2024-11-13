import type { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

interface Props extends SVGAttributes<SVGElement> {
  strokeWidth?: string;
}

export default function MyKurlyBell({
  width = 24,
  height = 24,
  strokeWidth = '1.5',
  stroke = COLOR.kurlyWhite,
  ...props
}: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.99898 18.6072C8.99898 20.264 10.3421 21.6072 11.999 21.6072C13.6558 21.6072 14.999 20.264 14.999 18.6072"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.998 17.9643H3L3.01127 17.9365C3.0799 17.8159 3.43579 17.3035 4.07895 16.3993L4.75423 15.4533V9.48216C4.75423 5.44597 7.84871 2.15623 11.7211 2.0054L11.999 2C16.0001 2 19.2437 5.34988 19.2437 9.48216V15.4533L20.78 17.6235C20.936 17.8507 21.0086 17.9643 20.998 17.9643Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}