import type { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

export default function LoversGift({
  width = 24,
  height = 24,
  stroke = COLOR.kurlyPurple,
  ...props
}: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" {...props}>
      <g transform="translate(-143 -655)">
        <circle cx="16" cy="16" r="16" fill="none" data-name="ico_gift" transform="translate(143 655)" />
        <g transform="translate(147.625 659.75)">
          <path
            d="M18.144 6.2H14.9a2.217 2.217 0 00.781-1.67 2.358 2.358 0 00-2.425-2.28 2.152 2.152 0 00-1.881 1.04 2.152 2.152 0 00-1.881-1.04 2.358 2.358 0 00-2.427 2.277A2.2 2.2 0 007.848 6.2H4.606a1.221 1.221 0 00-1.231 1.211v.759a.153.153 0 00.154.152h15.692a.153.153 0 00.154-.152v-.759A1.221 1.221 0 0018.144 6.2zm-4.888-2.887a1.257 1.257 0 011.3 1.214 1.257 1.257 0 01-1.3 1.214h-1.3c.004-1.821.584-2.428 1.3-2.428zm-3.762 0c.715 0 1.3.607 1.3 2.429h-1.3A1.257 1.257 0 018.2 4.527a1.257 1.257 0 011.294-1.214z"
            fill={stroke}
          />
          <path
            d="M4.5 15.632v8.424a1.226 1.226 0 001.231 1.214h5.615v-9.942H4.808a.307.307 0 00-.308.304z"
            transform="translate(-.51 -6.02)"
            fill={stroke}
          />
          <path
            d="M25.523 15.328h-6.539v9.942H24.6a1.226 1.226 0 001.231-1.214v-8.424a.307.307 0 00-.308-.304z"
            transform="translate(-7.071 -6.02)"
            fill={stroke}
          />
        </g>
      </g>
    </svg>
  );
}
