import type { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

export default function LoversPartnership({
  width = 24,
  height = 24,
  stroke = COLOR.kurlyWhite,
  fill = COLOR.kurlyPurple,
  ...props
}: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="-5 -5 24 24" {...props}>
      <defs>
        <clipPath id="clip-path">
          <rect width={width} height={height} fill={fill} />
        </clipPath>
      </defs>
      <g transform="translate(-839.429 -765)">
        <g>
          <rect
            id="사각형_103"
            data-name="사각형 103"
            width="18.14"
            height="10.252"
            transform="translate(839.929 773.748)"
            fill={fill}
          />
          <g transform="translate(839.429 765)">
            <g clipPath="url(#clip-path)">
              <path d="M.5,8.747V19H18.641V8.747" fill={fill} stroke={stroke} strokeLinejoin="round" strokeWidth="1" />
            </g>
          </g>
          <path d="M15.411,5.63,18.64,8.747l-6.413,3.625" transform="translate(839.429 765)" fill={fill} />
          <g transform="translate(839.429 765)">
            <g clipPath="url(#clip-path)">
              <path
                d="M15.411,5.63,18.64,8.747l-6.413,3.625"
                fill={fill}
                stroke={stroke}
                strokeLinejoin="round"
                strokeWidth="1"
              />
            </g>
          </g>
          <path d="M9.579,0,6.444,3.021l6.416.146Z" transform="translate(839.429 765)" fill={fill} />
          <path d="M.5,8.748l6.4,3.615-3.3-6.6Z" transform="translate(839.429 765)" fill={fill} />
          <g transform="translate(839.429 765)">
            <g clipPath="url(#clip-path)">
              <path
                d="M6.9,12.363.5,8.747,3.595,5.766"
                fill={fill}
                stroke={stroke}
                strokeLinejoin="round"
                strokeWidth="1"
              />
            </g>
          </g>
          <path d="M3.729,10.164v-7H15.411v7.1" transform="translate(839.429 765)" fill={fill} />
          <path
            d="M3.729,10.164v-7H15.411v7.1"
            transform="translate(839.429 765)"
            fill={fill}
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          />
          <path d="M.976,18.524l17.232.045L9.57,9.9Z" transform="translate(839.429 765)" fill={fill} />
          <g transform="translate(839.429 765)">
            <g clipPath="url(#clip-path)">
              <path
                d="M.977,18.523,9.571,9.9l8.638,8.673"
                fill={fill}
                stroke={stroke}
                strokeLinejoin="round"
                strokeWidth="1"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
