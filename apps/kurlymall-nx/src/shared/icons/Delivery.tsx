import * as React from 'react';

export default function Delivery({ width = 30, height = 30, ...props }: React.SVGAttributes<SVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h30v30H0z" />
        <g transform="translate(3 6)" stroke="#5F0080" strokeWidth="1.5">
          <path d="M4.676 16H.937A.94.94 0 0 1 0 15.059V1.882C0 .842.84 0 1.875 0h11.25C14.161 0 15 .843 15 1.882v12.236c0 1.04-.84 1.882-1.875 1.882h-4.7" />
          <path
            d="M15.5 5h4.634c.809-.044 1.49.383 2.045 1.28.28.455.631.871.902 1.245.176.242.41.568.702.975C24.594 9.577 25 10.324 25 10.74v3.979c-.063.852-.469 1.278-1.217 1.278h-1.458m-4.895 0H14.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="16" r="2.25" />
          <circle cx="20" cy="16" r="2.25" />
        </g>
      </g>
    </svg>
  );
}
