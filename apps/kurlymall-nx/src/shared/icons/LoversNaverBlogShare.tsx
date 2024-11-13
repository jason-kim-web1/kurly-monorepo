import type { SVGAttributes } from 'react';

import * as React from 'react';

import COLOR from '../constant/colorset';

export default function LoversNaverBlogShare({
  width = 64,
  height = 64,
  stroke = COLOR.kurlyGray800,
  fill = COLOR.bgLightGray,
  ...props
}: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 64 64" {...props}>
      <defs xmlns="http://www.w3.org/2000/svg">
        <clipPath id="a">
          <path
            fill={stroke}
            d="M10.087-10.02a.9.9 0 01.924.947.881.881 0 01-.924.938.881.881 0 01-.924-.938.9.9 0 01.924-.947zm8.378 0a.9.9 0 01.924.947.88.88 0 01-.924.938.88.88 0 01-.923-.938.894.894 0 01.923-.947zm5.572-.033a.9.9 0 01.923.945.879.879 0 01-.923.937.88.88 0 01-.925-.937.9.9 0 01.925-.945zm2.484 2.745c0 1.789-.889 2.665-2.446 2.665h-.3v-1.343h.283c.778 0 1.014-.493 1.014-1.209v-.2a1.67 1.67 0 01-1.3.575 2.019 2.019 0 01-2.006-2.15 2.151 2.151 0 012.091-2.284 1.375 1.375 0 011.2.583h.016v-.444h1.448zm-7.947.551A2.266 2.266 0 0116.117-9a2.267 2.267 0 012.457-2.252A2.267 2.267 0 0121.032-9a2.268 2.268 0 01-2.458 2.245zM15.139-6.9h-1.445v-3.549c0-.649-.1-1.213-.675-1.3v-1.442c1.259 0 2.121.9 2.121 2.45zm-4.639.144a1.427 1.427 0 01-1.235-.611h-.019v.467H7.8v-6.15h1.446v2.35a1.652 1.652 0 011.264-.55 2.119 2.119 0 012.044 2.24A2.13 2.13 0 0110.5-6.756zm17.118-9.857A4.7 4.7 0 0024.282-18H9.718a4.7 4.7 0 00-3.331 1.387A4.7 4.7 0 005-13.282v7.014a4.7 4.7 0 001.387 3.332 4.7 4.7 0 003.331 1.387H15.1L16.646 1.6c.194.353.513.353.707 0L18.9-1.549h5.382a4.7 4.7 0 003.331-1.387A4.7 4.7 0 0029-6.267v-7.014a4.7 4.7 0 00-1.387-3.331z"
            clipRule="evenodd"
            transform="translate(-5 18)"
          />
        </clipPath>
      </defs>
      <g transform="translate(-242 -182)">
        <circle cx="32" cy="32" r="32" fill={fill} transform="translate(242 182)" />
        <g clipPath="url(#a)" transform="translate(262 205)">
          <path fill={stroke} d="M-8.276 28.142h40.552V-8.276H-8.276z" data-name="패스 91" />
        </g>
      </g>
    </svg>
  );
}
