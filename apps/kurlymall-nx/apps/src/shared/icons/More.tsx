import React from 'react';

import COLOR from '../constant/colorset';

export default function More({ width = 40, height = 40, fill = COLOR.kurlyGray450 }: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 40 40" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 15.5C20.8284 15.5 21.5 14.8284 21.5 14C21.5 13.1716 20.8284 12.5 20 12.5C19.1716 12.5 18.5 13.1716 18.5 14C18.5 14.8284 19.1716 15.5 20 15.5Z"
        fill={fill}
      />
      <path
        d="M20 21.5C20.8284 21.5 21.5 20.8284 21.5 20C21.5 19.1716 20.8284 18.5 20 18.5C19.1716 18.5 18.5 19.1716 18.5 20C18.5 20.8284 19.1716 21.5 20 21.5Z"
        fill={fill}
      />
      <path
        d="M20 27.5C20.8284 27.5 21.5 26.8284 21.5 26C21.5 25.1716 20.8284 24.5 20 24.5C19.1716 24.5 18.5 25.1716 18.5 26C18.5 26.8284 19.1716 27.5 20 27.5Z"
        fill={fill}
      />
    </svg>
  );
}
