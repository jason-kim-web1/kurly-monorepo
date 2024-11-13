import * as React from 'react';

import COLOR from '../constant/colorset';

export default function Info({ width = 14, height = 14, fill = COLOR.kurlyGray450 }: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>Shape</title>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="commonIcon_info" fill={fill} fillRule="nonzero">
          <path
            d="M6.3,3.5 L7.7,3.5 L7.7,4.9 L6.3,4.9 L6.3,3.5 Z M6.3,6.3 L7.7,6.3 L7.7,10.5 L6.3,10.5 L6.3,6.3 Z M0,7 C0,10.864 3.129,14 6.993,14 C10.864,14 14,10.864 14,7 C14,3.136 10.864,0 6.993,0 C3.129,0 0,3.136 0,7 Z M1.4,7 C1.4,3.906 3.906,1.4 7,1.4 C10.094,1.4 12.6,3.906 12.6,7 C12.6,10.094 10.094,12.6 7,12.6 C3.906,12.6 1.4,10.094 1.4,7 Z"
            id="Shape"
          ></path>
        </g>
      </g>
    </svg>
  );
}
