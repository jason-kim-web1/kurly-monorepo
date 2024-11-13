import * as React from 'react';

export default function Point({ width = 30, height = 30, ...props }: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h30v30H0z" />
        <g transform="translate(7 5)" stroke="#5F0080" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <ellipse cx="8" cy="3" rx="8" ry="3" />
          <path d="M15.067 9.941C13.727 10.571 11.077 11 8 11c-3.005 0-5.604-.408-6.972-1.015M15.067 14.941C13.727 15.571 11.077 16 8 16c-3.005 0-5.604-.408-6.972-1.015" />
          <path d="M0 4v14.353C0 19.818 3.556 21 8 21s8-1.182 8-2.647V4" />
        </g>
      </g>
    </svg>
  );
}