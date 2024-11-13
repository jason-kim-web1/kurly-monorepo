import * as React from 'react';

import COLOR from '../constant/colorset';

export default function ArrowRight({
  width = 16,
  height = 16,
  stroke = COLOR.kurlyWhite,
  strokeWidth = '1.2',
  ...props
}: React.SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" {...props}>
      <defs>
        <path id="gfk9q0rhta" d="M1.657 1.657L9.657 1.657 9.657 9.657" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <g transform="translate(-339 -398) translate(0 386) translate(339 12) translate(4.69 6.343)">
                <use
                  stroke={stroke}
                  strokeLinecap="round"
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                  transform="rotate(45 5.657 5.657)"
                  xlinkHref="#gfk9q0rhta"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
