import type { SVGAttributes } from 'react';

const NAME = 'ArrowLeftSmall_1x2';

type ArrowLeftSmall_1x2Props = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowLeftSmall_1x2 = ({ width = 9, height = 14, fill = '#222222' }: ArrowLeftSmall_1x2Props) => (
  <svg width={width} height={height} viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.82843 6.99992L8.12132 12.2928L6.70711 13.707L1.90735e-06 6.99992L6.70711 0.292818L8.12132 1.70703L2.82843 6.99992Z"
      fill={fill}
    />
  </svg>
);

ArrowLeftSmall_1x2.displayName = NAME;
ArrowLeftSmall_1x2.RATIO = '1:2';
ArrowLeftSmall_1x2.BASE_WIDTH = 0.6766666667;
ArrowLeftSmall_1x2.BASE_HEIGHT = 0.55875;

export { ArrowLeftSmall_1x2 };
export type { ArrowLeftSmall_1x2Props };
