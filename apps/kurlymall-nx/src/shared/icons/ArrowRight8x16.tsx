import * as React from 'react';

import COLOR from '../constant/colorset';

export default function ArrowRight8x16({
  width = 8,
  height = 16,
  fill = COLOR.benefitTextGray,
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 8 16" fill="none" {...props}>
      <g clipPath="url(#clip0_1700_10545)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.82157 8.00005L1.29297 4.47145L2.23578 3.52864L6.70719 8.00005L2.23578 12.4714L1.29297 11.5286L4.82157 8.00005Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_1700_10545">
          <rect width="5.41422" height="8.94281" fill="white" transform="translate(1.29297 3.52864)" />
        </clipPath>
      </defs>
    </svg>
  );
}
