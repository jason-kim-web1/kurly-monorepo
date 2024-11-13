import type { SVGAttributes } from 'react';

const NAME = 'InfoCircle';

type InfoCircleProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const InfoCircle = ({ width = 21, height = 22, fill = '#222222' }: InfoCircleProps) => (
  <svg width={width} height={width} viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 0.5C4.70101 0.5 0 5.20101 0 11C0 16.799 4.70101 21.5 10.5 21.5C16.299 21.5 21 16.799 21 11C21 5.20101 16.299 0.5 10.5 0.5ZM9.58008 16.7998H11.5801L11.5801 9.1998H9.58008L9.58008 16.7998ZM9.58008 5.2002H11.5801V7.2002H9.58008V5.2002Z"
      fill={fill}
    />
  </svg>
);

InfoCircle.displayName = NAME;
InfoCircle.RATIO = '1:1';
InfoCircle.BASE_WIDTH = 0.875;
InfoCircle.BASE_HEIGHT = 0.875;

export { InfoCircle };
export type { InfoCircleProps };
