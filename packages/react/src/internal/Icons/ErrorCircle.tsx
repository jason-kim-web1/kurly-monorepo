import type { SVGAttributes } from 'react';

const NAME = 'ErrorCircle';

type ErrorCircleProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ErrorCircle = ({ width = 21, height = 22, fill = '#222222' }: ErrorCircleProps) => (
  <svg width={width} height={width} viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 21.5C16.299 21.5 21 16.799 21 11C21 5.20101 16.299 0.5 10.5 0.5C4.70101 0.5 0 5.20101 0 11C0 16.799 4.70101 21.5 10.5 21.5ZM11.4199 5.2002H9.41992V12.8002H11.4199V5.2002ZM11.4199 16.7998H9.41992V14.7998H11.4199V16.7998Z"
      fill={fill}
    />
  </svg>
);

ErrorCircle.displayName = NAME;
ErrorCircle.RATIO = '1:1';
ErrorCircle.BASE_WIDTH = 0.875;
ErrorCircle.BASE_HEIGHT = 0.875;

export { ErrorCircle };
export type { ErrorCircleProps };
