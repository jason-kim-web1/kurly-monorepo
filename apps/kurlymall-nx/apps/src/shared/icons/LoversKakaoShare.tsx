import type { SVGAttributes } from 'react';

import * as React from 'react';

import COLOR from '../constant/colorset';

interface Props extends SVGAttributes<SVGElement> {
  fillBg?: string;
}

export default function LoversKakaoShare({
  width = 64,
  height = 64,
  stroke = COLOR.kurlyGray800,
  fill = COLOR.bgLightGray,
  fillBg = COLOR.kurlyWhite,
  ...props
}: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 64 64" {...props}>
      <g id="prefix__share_kakao" transform="translate(-216.945 -94.638)">
        <circle id="prefix__circle" cx="32" cy="32" r="32" fill={fill} transform="translate(216.945 94.638)" />
        <g id="prefix__icon" transform="translate(-3 -3)">
          <path
            fill={stroke}
            d="M67.1 77.391c-6.628 0-12 4.266-12 9.529 0 3.425 2.276 6.427 5.693 8.107-.251.941-.909 3.41-1.041 3.938-.162.656.239.647.5.47.206-.138 3.288-2.242 4.618-3.151a15.131 15.131 0 002.227.164c6.627 0 12-4.267 12-9.529s-5.373-9.529-12-9.529"
            transform="translate(185.209 41.626)"
          />
          <g transform="translate(243.522 125.698)">
            <path
              d="M108.433 185.048h-3.447a.586.586 0 100 1.172h1.12v4.129a.574.574 0 00.572.572h.125a.573.573 0 00.571-.572v-4.129h1.058a.586.586 0 100-1.172z"
              fill={fillBg}
              transform="translate(-104.4 -184.965)"
            />
            <path
              d="M261.907 188.548h-1.6v-4.218a.636.636 0 10-1.272 0v4.546a.616.616 0 00.01.1.54.54 0 00-.01.1.532.532 0 00.532.533h2.342a.532.532 0 000-1.064z"
              fill={fillBg}
              transform="translate(-249.591 -183.694)"
            />
            <path
              d="M324.884 188.741l-1.786-2.346 1.614-1.614a.56.56 0 10-.792-.791l-2 2v-1.66a.636.636 0 10-1.272 0v4.685a.636.636 0 101.272 0v-1.445l.363-.363 1.689 2.217a.569.569 0 10.909-.683z"
              fill={fillBg}
              transform="translate(-307.446 -183.694)"
            />
            <path
              d="M172.541 188.893l-1.718-4.7-.006-.005a.844.844 0 00-.8-.495.82.82 0 00-.835.592.784.784 0 00-.033.077l-1.689 4.53a.57.57 0 101.075.378l.292-.834h2.351l.292.834a.57.57 0 101.075-.378zm-3.345-1.521l.79-2.254h.025l.789 2.252z"
              fill={fillBg}
              transform="translate(-163.575 -183.694)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
