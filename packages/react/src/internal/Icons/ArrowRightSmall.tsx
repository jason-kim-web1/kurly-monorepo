import type { SVGAttributes } from 'react';

const NAME = 'ArrowRightSmall';

type ArrowRightSmallProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowRightSmall = ({ width = 9, height = 14, fill = '#222222' }: ArrowRightSmallProps) => (
  <svg width={width} height={height} viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.29289 6.70711L0 1.41421L1.41421 0L8.12132 6.70711L1.41421 13.4142L0 12L5.29289 6.70711Z"
      fill={fill}
    />
  </svg>
);

ArrowRightSmall.displayName = NAME;
ArrowRightSmall.RATIO = '1:1';
ArrowRightSmall.BASE_WIDTH = 0.3383333333;
ArrowRightSmall.BASE_HEIGHT = 0.55875;

export { ArrowRightSmall };
export type { ArrowRightSmallProps };
