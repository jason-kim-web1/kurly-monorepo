import * as React from 'react';

import COLOR from '../constant/colorset';

export default function Certifycation({
  width = 40,
  height = 28,
  fill = COLOR.kurlyGray800,
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 40 28" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-149.000000, -118.000000)">
          <g transform="translate(149.000000, 118.000000)">
            <g>
              <rect stroke={fill} strokeWidth="2" x="1" y="1" width="38" height="26" />
              <g transform="translate(5.000000, 6.000000)" fill={fill}>
                <rect id="Rectangle" x="0" y="0" width="13" height="2" />
                <rect id="Rectangle" x="0" y="4.66666667" width="13" height="2" />
                <rect id="Rectangle" x="0" y="9.33333333" width="13" height="2" />
                <rect id="Rectangle" x="0" y="14" width="13" height="2" />
              </g>
              <g transform="translate(18.400000, 1.400000)" stroke={fill} strokeWidth="2">
                <path
                  d="M11.444449,4.60924287 L10,5.44979897 L8.55555098,4.60924287 L7.72489949,6.05941032 L6.05369189,6.05369189 L6.05941032,7.72489949 L4.60924287,8.55555098 L5.44979897,10 L4.60924287,11.444449 L6.05941032,12.2751005 L6.05369189,13.9463081 L7.72489949,13.9405897 L8.55555098,15.3907571 L10,14.550201 L11.444449,15.3907571 L12.2751005,13.9405897 L13.9463081,13.9463081 L13.9405897,12.2751005 L15.3907571,11.444449 L14.550201,10 L15.3907571,8.55555098 L13.9405897,7.72489949 L13.9463081,6.05369189 L12.2751005,6.05941032 L11.444449,4.60924287 Z"
                  transform="translate(10.000000, 10.000000) rotate(29.000000) translate(-10.000000, -10.000000) "
                />
                <polyline points="13.8 14.2 13.8 21.2 10.0769653 19.6782609 6.4 21.2 6.4 14.2" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
