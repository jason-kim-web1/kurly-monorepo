import * as React from 'react';

export default function NewBadge({ width = 14, height = 14 }: React.SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 14 14" data-testid="new-icon">
      <g fill="none" fillRule="evenodd">
        <rect width="14" height="14" fill="#FA622F" rx="7" />
        <polyline
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.2"
          points="4.5 10 4.5 4.5 9.5 10 9.5 4.5"
        />
      </g>
    </svg>
  );
}
