import type { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

interface Props extends SVGAttributes<SVGElement> {
  strokeWidth?: string;
}

export default function MyKurlyFrequentPurchase({
  width = 28,
  height = 28,
  strokeWidth = '1.5',
  fill = COLOR.kurlyWhite,
  stroke = COLOR.kurlyGray800,
  ...props
}: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 28 28" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <rect width={width} height={height} fill="none" />
      <path
        d="M18.7774 10.9894C20.3717 10.7178 21.6939 11.0351 22.6123 9.97669C23.3273 9.03772 24.2413 8.11796 24 5C23.9226 4 23.556 3.22425 23.3273 2.61553C22.6265 2.54815 21.9538 2.54253 21.3208 2.59576C21.3094 2.59865 21.2934 2.59602 21.282 2.59891C19.37 2.77077 17.7842 3.4912 16.7372 4.69984C15.6909 5.90862 15.052 7.81652 15.8471 10.1332"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M17.4521 9.41134L20.0311 6.13585"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="10.5"
        cy="8.5"
        r="5.75"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M2.11556 11.2485C1.96747 9.91565 3.01077 8.75 4.35179 8.75H23.6482C24.9892 8.75 26.0325 9.91565 25.8844 11.2485L24.5511 23.2485C24.4245 24.3879 23.4614 25.25 22.3149 25.25H5.68513C4.53864 25.25 3.5755 24.3879 3.44889 23.2485L2.11556 11.2485Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M10 12V12C10 13.6569 11.3431 15 13 15L15 15C16.6569 15 18 13.6569 18 12V12"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
