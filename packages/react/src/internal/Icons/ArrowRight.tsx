import type { SVGAttributes } from 'react';

const NAME = 'ArrowRight';

type ArrowRightProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowRight = ({ width = 9, height = 14, fill = '#222222' }: ArrowRightProps) => (
  <svg width={width} height={height} viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.29289 6.70711L0 1.41421L1.41421 0L8.12132 6.70711L1.41421 13.4142L0 12L5.29289 6.70711Z"
      fill={fill}
    />
  </svg>
);

ArrowRight.displayName = NAME;
ArrowRight.RATIO = '1:1';
ArrowRight.BASE_WIDTH = 0.7254166667;
ArrowRight.BASE_HEIGHT = 0.4216666667;

export { ArrowRight };
export type { ArrowRightProps };
