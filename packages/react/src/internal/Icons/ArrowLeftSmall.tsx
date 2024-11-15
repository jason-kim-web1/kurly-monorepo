import type { SVGAttributes } from 'react';

const NAME = 'ArrowLeftSmall';

type ArrowLeftSmallProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowLeftSmall = ({ width = 9, height = 14, fill = '#222222' }: ArrowLeftSmallProps) => (
  <svg width={width} height={height} viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.82843 6.99992L8.12132 12.2928L6.70711 13.707L1.90735e-06 6.99992L6.70711 0.292818L8.12132 1.70703L2.82843 6.99992Z"
      fill={fill}
    />
  </svg>
);

ArrowLeftSmall.displayName = NAME;
ArrowLeftSmall.RATIO = '1:1';
ArrowLeftSmall.BASE_WIDTH = 0.3383333333;
ArrowLeftSmall.BASE_HEIGHT = 0.55875;

export { ArrowLeftSmall };
export type { ArrowLeftSmallProps };
