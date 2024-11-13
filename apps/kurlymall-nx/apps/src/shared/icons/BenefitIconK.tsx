import { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

interface Props extends SVGAttributes<SVGElement> {
  pathFill?: string;
  pathStroke?: string;
  pathStrokeWidth?: string;
}

export const BenefitIconK = ({
  width = 18,
  height = 18,
  fill = COLOR.mainSecondary,
  stroke = COLOR.mainSecondary,
  strokeWidth = '1.4',
  pathFill = COLOR.kurlyWhite,
  pathStroke = COLOR.kurlyWhite,
  pathStrokeWidth = '0.3',
  ...props
}: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} width={width} height={height} viewBox="0 0 18 18" fill="none">
      <circle
        cx="9"
        cy="9"
        r="8"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.17722 5.00816C8.78707 4.94304 9.35958 5.25934 9.11066 6.25558L9.05438 6.43105C8.96419 6.70193 8.77725 7.24668 8.56028 7.87157L8.25521 8.74619C9.45832 8.45273 11.6057 7.02856 11.8546 6.11012C11.8853 6.06783 11.9293 6.05261 11.9998 6.10082C12.1267 6.18708 12.1757 6.40273 12.1267 6.60232C11.9309 7.39644 10.4814 8.52123 9.20857 9.09969L9.25313 9.21678C9.44946 9.71827 9.92769 10.7973 10.2872 11.4812C10.7137 12.2965 11.1643 12.677 11.8637 12.7193C12.2339 12.7414 12.6272 12.6059 12.8541 12.4075L12.9001 12.3641L12.8967 12.3717C12.9465 12.3185 13.0278 12.392 12.9905 12.4563C12.7014 12.8956 12.2281 13.1726 11.7102 13.2056C10.0831 13.3172 9.45998 12.1941 8.29836 9.41683L7.97642 9.53439L7.43046 11.0567C7.18818 11.8068 7.17241 12.2178 7.33836 12.3362C7.37569 12.3599 7.35744 12.4233 7.29272 12.4445C6.6447 12.6525 6.04812 12.2626 6.38002 11.2833L8.15315 6.15325C8.26268 5.81497 8.20377 5.59762 8.02703 5.55026C7.18154 5.32192 5.22503 7.14357 5.50548 8.82568C5.55117 9.09879 5.73058 9.25992 5.83727 9.26231L5.85894 9.26038C5.8702 9.25811 5.88182 9.26178 5.88984 9.27013C5.89787 9.27848 5.90123 9.2904 5.89877 9.30182C5.83968 9.50816 5.62928 9.62818 5.42582 9.5716C5.12546 9.50479 5.02755 9.17665 5.01096 9.00751C4.84584 7.26705 6.57666 5.17815 8.17722 5.00816Z"
        fill={pathFill}
        stroke={pathStroke}
        strokeWidth={pathStrokeWidth}
      />
    </svg>
  );
};
