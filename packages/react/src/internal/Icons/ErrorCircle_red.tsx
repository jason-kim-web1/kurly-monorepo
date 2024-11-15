import type { SVGAttributes } from 'react';

const NAME = 'ErrorCircle_red';

type ErrorCircle_redProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'> & {
  pathFill?: string;
};

const ErrorCircle_red = ({ width = 21, height = 22, fill = '#222222', pathFill = '#fff' }: ErrorCircle_redProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 22 22" fill="none">
    <path
      d="M21.5 11C21.5 16.799 16.799 21.5 11 21.5C5.20101 21.5 0.5 16.799 0.5 11C0.5 5.20101 5.20101 0.5 11 0.5C16.799 0.5 21.5 5.20101 21.5 11Z"
      fill="#E22D2E"
    />
    <path d="M9.91992 5.2002H11.9199V12.8002H9.91992V5.2002Z" fill={pathFill} />
    <path d="M9.91992 16.7998H11.9199V14.7998H9.91992V16.7998Z" fill={pathFill} />
  </svg>
);
ErrorCircle_red.displayName = NAME;
ErrorCircle_red.RATIO = '1:1';
ErrorCircle_red.BASE_WIDTH = 0.875;
ErrorCircle_red.BASE_HEIGHT = 0.875;

export { ErrorCircle_red };
export type { ErrorCircle_redProps };
