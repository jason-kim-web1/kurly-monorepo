import type { SVGAttributes } from 'react';

const NAME = 'CheckCircle_green';

type CheckCircle_greenProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'> & {
  pathFill?: string;
};

const CheckCircle_green = ({
  width = 22,
  height = 22,
  fill = '#118B66',
  pathFill = '#fff',
}: CheckCircle_greenProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 22 22" fill="none">
    <path
      d="M21.5 11C21.5 16.799 16.799 21.5 11 21.5C5.20101 21.5 0.5 16.799 0.5 11C0.5 5.20101 5.20101 0.5 11 0.5C16.799 0.5 21.5 5.20101 21.5 11Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.1073 7.80673L8.32345 16.5913L4.29297 12.56L5.70732 11.1459L8.32354 13.7627L15.693 6.39258L17.1073 7.80673Z"
      fill={pathFill}
    />
  </svg>
);

CheckCircle_green.displayName = NAME;
CheckCircle_green.RATIO = '1:1';
CheckCircle_green.BASE_WIDTH = 0.875;
CheckCircle_green.BASE_HEIGHT = 0.875;

export { CheckCircle_green };
export type { CheckCircle_greenProps };
