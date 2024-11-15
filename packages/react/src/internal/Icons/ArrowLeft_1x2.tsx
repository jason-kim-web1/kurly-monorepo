import type { SVGAttributes } from 'react';

const NAME = 'ArrowLeft_1x2';

type ArrowLeft_1x2Props = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowLeft_1x2 = ({ width = 11, height = 18, fill = '#222222' }: ArrowLeft_1x2Props) => (
  <svg width={width} height={height} viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 9.00008L8.70711 17.7072L10.1213 16.293L2.82843 9.00008L10.1213 1.70718L8.70711 0.292969L0 9.00008Z"
      fill={fill}
    />
  </svg>
);

ArrowLeft_1x2.displayName = NAME;
ArrowLeft_1x2.RATIO = '1:2';
ArrowLeft_1x2.BASE_WIDTH = 1.450833333;
ArrowLeft_1x2.BASE_HEIGHT = 0.4216666667;

export { ArrowLeft_1x2 };
export type { ArrowLeft_1x2Props };
