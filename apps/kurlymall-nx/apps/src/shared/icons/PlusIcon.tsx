import type { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

export default function PlusIcon({
  width = 16,
  height = 16,
  fill = COLOR.kurlyGray800,
  ...props
}: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      data-locator-target="webstorm"
      {...props}
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M8.75 2.5v4.75h4.75v1.5H8.75v4.75h-1.5V8.749L2.5 8.75v-1.5l4.75-.001V2.5h1.5z"
      />
    </svg>
  );
}
