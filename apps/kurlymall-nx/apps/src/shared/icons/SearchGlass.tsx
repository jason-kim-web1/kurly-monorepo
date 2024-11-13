import * as React from 'react';

export default function SearchGlass({ width = 68, height = 68, ...props }: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 68 68" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g stroke="#E2E2E2" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="square" strokeLinejoin="round">
        <path d="M48.933 29.473c0 6.133-2.666 11.466-6.933 14.933-3.467 2.933-7.733 4.533-12.533 4.533C18.533 48.94 10 40.14 10 29.473c0-10.934 8.8-19.467 19.467-19.467 10.666-.267 19.466 8.533 19.466 19.467zM58 58 43.714 43.714" />
      </g>
    </svg>
  );
}