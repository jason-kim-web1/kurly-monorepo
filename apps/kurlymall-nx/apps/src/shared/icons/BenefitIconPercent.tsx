import { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

interface Props extends SVGAttributes<SVGElement> {
  fill2?: string;
  stroke2?: string;
  strokeWidth2?: string;
}

export const BenefitIconPercent = ({
  width = 18,
  height = 18,
  fill = COLOR.mainSecondary,
  stroke = COLOR.mainSecondary,
  strokeWidth = '1.4',
  fill2 = COLOR.kurlyWhite,
  stroke2 = COLOR.kurlyWhite,
  strokeWidth2 = '1.2',
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
        d="M11.4723 6.26736L6.26746 11.4722"
        stroke={stroke2}
        strokeWidth={strokeWidth2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.61448 7.82891C7.28521 7.82891 7.82894 7.28518 7.82894 6.61445C7.82894 5.94373 7.28521 5.39999 6.61448 5.39999C5.94376 5.39999 5.40002 5.94373 5.40002 6.61445C5.40002 7.28518 5.94376 7.82891 6.61448 7.82891Z"
        fill={fill2}
      />
      <path
        d="M11.3855 12.5999C12.0562 12.5999 12.5999 12.0562 12.5999 11.3854C12.5999 10.7147 12.0562 10.171 11.3855 10.171C10.7148 10.171 10.171 10.7147 10.171 11.3854C10.171 12.0562 10.7148 12.5999 11.3855 12.5999Z"
        fill={fill2}
      />
    </svg>
  );
};
