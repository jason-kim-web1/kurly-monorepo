import type { SVGAttributes } from 'react';

const NAME = 'ErrorTriangle';

type ErrorTriangleProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ErrorTriangle = ({ width = 22, height = 21, fill = '#222222' }: ErrorTriangleProps) => (
  <svg width={width} height={width} viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6052 1.86998C12.4705 -0.22489 9.46422 -0.224887 8.3295 1.86998L0.366333 16.5712C-0.716405 18.5701 0.730903 21.0001 3.00421 21.0001H18.9305C21.2038 21.0001 22.6511 18.5701 21.5684 16.5712L13.6052 1.86998ZM11.8867 7H9.88672V13.6H11.8867V7ZM11.8867 17.5996H9.88672V15.5996H11.8867V17.5996Z"
      fill={fill}
    />
  </svg>
);

ErrorTriangle.displayName = NAME;
ErrorTriangle.RATIO = '1:1';
ErrorTriangle.BASE_WIDTH = 0.91375;
ErrorTriangle.BASE_HEIGHT = 0.8625;

export { ErrorTriangle };
export type { ErrorTriangleProps };
