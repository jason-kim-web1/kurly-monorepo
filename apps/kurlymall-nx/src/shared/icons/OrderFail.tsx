import * as React from 'react';

export default function OrderFail({ width = 50, height = 50, ...props }: React.SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 50 50" {...props}>
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <path d="M0 0H50V50H0z" transform="translate(-162 -312) translate(20 312) translate(142)" />
              <g transform="translate(-162 -312) translate(20 312) translate(142)">
                <circle cx="25" cy="25" r="24" stroke="#5F0080" strokeWidth="2" />
                <path
                  stroke="#5F0080"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M35.238 35.364c-5.538-5.539-14.518-5.539-20.056 0"
                />
                <circle cx="17.364" cy="20.636" r="2.182" fill="#5F0080" />
                <circle cx="32.636" cy="20.636" r="2.182" fill="#5F0080" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
