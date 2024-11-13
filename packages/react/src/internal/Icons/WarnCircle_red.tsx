import type { SVGAttributes } from 'react';

const NAME = 'WarnCircle_red';

type WarnCircle_redProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'> & {
  pathFill?: string;
};

const WarnCircle_red = ({ width = 22, height = 22, fill = '#E22D2E', pathFill = '#fff' }: WarnCircle_redProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 22 22" fill="none">
    <path
      d="M21.5 11C21.5 16.799 16.799 21.5 11 21.5C5.20101 21.5 0.5 16.799 0.5 11C0.5 5.20101 5.20101 0.5 11 0.5C16.799 0.5 21.5 5.20101 21.5 11Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.58586 11.0001L6.29297 7.70718L7.70718 6.29297L11.0001 9.58586L14.293 6.29297L15.7072 7.70718L12.4143 11.0001L15.7072 14.293L14.293 15.7072L11.0001 12.4143L7.70718 15.7072L6.29297 14.293L9.58586 11.0001Z"
      fill={pathFill}
    />
  </svg>
);

WarnCircle_red.displayName = NAME;
WarnCircle_red.RATIO = '1:1';
WarnCircle_red.BASE_WIDTH = 0.875;
WarnCircle_red.BASE_HEIGHT = 0.875;

export { WarnCircle_red };
export type { WarnCircle_redProps };
