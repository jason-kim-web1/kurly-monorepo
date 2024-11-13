import { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

interface Props extends SVGAttributes<SVGElement> {
  stroke2?: string;
  strokeWidth2?: string;
}

export const BenefitIconGift = ({
  width = 16,
  height = 16,
  fill = COLOR.mainSecondary,
  stroke = COLOR.mainSecondary,
  stroke2 = '#E8F7FA',
  strokeWidth = '1.5',
  strokeWidth2 = '1.2',
  ...props
}: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} width={width} height={height} viewBox="0 0 16 15" fill="none">
      <path
        d="M7.99815 4.5H4.84814C4.38402 4.5 3.9389 4.31563 3.61071 3.98744C3.28252 3.65925 3.09814 3.21413 3.09814 2.75C3.09814 2.28587 3.28252 1.84075 3.61071 1.51256C3.9389 1.18437 4.38402 1 4.84814 1C7.29815 1 7.99815 4.5 7.99815 4.5Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 4.5H11.15C11.6141 4.5 12.0592 4.31563 12.3874 3.98744C12.7156 3.65925 12.9 3.21413 12.9 2.75C12.9 2.28587 12.7156 1.84075 12.3874 1.51256C12.0592 1.18437 11.6141 1 11.15 1C8.7 1 8 4.5 8 4.5Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6023 7V13C13.6023 13.5523 13.1546 14 12.6023 14H3.40234C2.85006 14 2.40234 13.5523 2.40234 13V7"
        fill={fill}
      />
      <path
        d="M13.6023 7V13C13.6023 13.5523 13.1546 14 12.6023 14H3.40234C2.85006 14 2.40234 13.5523 2.40234 13V7"
        stroke={stroke}
        strokeWidth={strokeWidth2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6 4H1.4C1.17909 4 1 4.17909 1 4.4V5.6C1 5.82091 1.17909 6 1.4 6H14.6C14.8209 6 15 5.82091 15 5.6V4.4C15 4.17909 14.8209 4 14.6 4Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14L8 7.875"
        stroke={stroke2}
        strokeWidth={strokeWidth2}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M1.875 7.20001L15 7.20001"
        stroke={stroke2}
        strokeWidth={strokeWidth2}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};
