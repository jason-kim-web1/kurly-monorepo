import { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

interface Props extends SVGAttributes<SVGElement> {
  fill2?: string;
  rx?: number;
}

export const ShareUrl = ({
  width = 64,
  height = 64,
  rx = 32,
  fill = '#C6EAF2',
  fill2 = COLOR.benefitGray,
  ...props
}: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} width={width} height={height} viewBox="0 0 64 64" fill="none">
      <rect x="0.5" width={width} height={height} rx={rx} fill={fill} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.3156 23.6737C35.3893 21.6 38.7514 21.6 40.8251 23.6737C42.8987 25.7474 42.8987 29.1095 40.8251 31.1832L37.7774 34.2309L36.3632 32.8167L39.4108 29.769C40.7035 28.4764 40.7035 26.3806 39.4108 25.0879C38.1182 23.7953 36.0224 23.7953 34.7298 25.0879L31.6821 28.1356L30.2679 26.7214L33.3156 23.6737Z"
        fill={fill2}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.6844 40.3263C29.6107 42.4 26.2486 42.4 24.1749 40.3263C22.1013 38.2526 22.1013 34.8905 24.1749 32.8168L27.2226 29.7691L28.6368 31.1833L25.5892 34.231C24.2965 35.5236 24.2965 37.6194 25.5892 38.9121C26.8818 40.2047 28.9776 40.2047 30.2702 38.9121L33.3179 35.8644L34.7321 37.2786L31.6844 40.3263Z"
        fill={fill2}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.2563 33.8326L35.3516 27.7373L36.7658 29.1515L30.6705 35.2468L29.2563 33.8326Z"
        fill={fill2}
      />
    </svg>
  );
};
