import type { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

interface Props extends SVGAttributes<SVGElement> {
  strokeWidth?: string;
}

export default function MyKurlyPick({
  width = 29,
  height = 28,
  strokeWidth = '1.5',
  fill = COLOR.kurlyWhite,
  stroke = COLOR.kurlyGray800,
  ...props
}: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 29 28" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <rect width={height} height={height} transform="translate(0.333313)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.4195 5.98883C22.8677 3.33706 18.7321 3.33706 16.1817 5.98883L14.3328 7.90876L12.4852 5.98883C9.93345 3.33706 5.79786 3.33706 3.24608 5.98883C0.695724 8.63911 0.695724 12.9368 3.24608 15.5885L5.09362 17.5085L13.6709 25.0822C14.049 25.4161 14.6166 25.4161 14.9947 25.0822L23.5719 17.5085L25.4195 15.5885C27.9713 12.9368 27.9713 8.63911 25.4195 5.98883Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
