import type { SVGAttributes } from 'react';

const NAME = 'ArrowRightSmall_1x2';

type ArrowRightSmall_1x2Props = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowRightSmall_1x2 = ({ width = 9, height = 14, fill = '#222222' }: ArrowRightSmall_1x2Props) => (
  <svg width={width} height={height} viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.29289 6.70711L0 1.41421L1.41421 0L8.12132 6.70711L1.41421 13.4142L0 12L5.29289 6.70711Z"
      fill={fill}
    />
  </svg>
);

ArrowRightSmall_1x2.displayName = NAME;
ArrowRightSmall_1x2.RATIO = '1:2';
ArrowRightSmall_1x2.BASE_WIDTH = 0.6766666667;
ArrowRightSmall_1x2.BASE_HEIGHT = 0.55875;

export { ArrowRightSmall_1x2 };
export type { ArrowRightSmall_1x2Props };
