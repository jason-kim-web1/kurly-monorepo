import type { SVGAttributes } from 'react';

export default function NewBadgeCircle({
  width = 14,
  height = 14,
}: Pick<SVGAttributes<SVGElement>, 'width' | 'height'>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="new-badge-circle"
    >
      <g clipPath="url(#clip0_681_213)">
        <path
          d="M14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C10.866 14 14 10.866 14 7Z"
          fill="#FA622F"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.38498 10V9.994L5.64498 6.21V10H4.04498V4H5.64498L8.38498 7.788V4H9.98498V10H8.38498Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_681_213">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
