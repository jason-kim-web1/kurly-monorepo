import type { SVGAttributes } from 'react';

const NAME = 'CloseCircle';

type CloseCircleProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const CloseCircle = ({ width = 21, height = 22, fill = '#222222' }: CloseCircleProps) => (
  <svg width={width} height={width} viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 21.5C16.299 21.5 21 16.799 21 11C21 5.20101 16.299 0.5 10.5 0.5C4.70101 0.5 0 5.20101 0 11C0 16.799 4.70101 21.5 10.5 21.5ZM5.79297 7.70718L9.08586 11.0001L5.79297 14.293L7.20718 15.7072L10.5001 12.4143L13.793 15.7072L15.2072 14.293L11.9143 11.0001L15.2072 7.70718L13.793 6.29297L10.5001 9.58586L7.20718 6.29297L5.79297 7.70718Z"
      fill={fill}
    />
  </svg>
);

CloseCircle.displayName = NAME;
CloseCircle.RATIO = '1:1';
CloseCircle.BASE_WIDTH = 0.875;
CloseCircle.BASE_HEIGHT = 0.875;

export { CloseCircle };
export type { CloseCircleProps };
