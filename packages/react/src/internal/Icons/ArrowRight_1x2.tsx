import type { SVGAttributes } from 'react';

const NAME = 'ArrowRight_1x2';

type ArrowRight_1x2Props = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowRight_1x2 = ({ width = 11, height = 18, fill = '#222222' }: ArrowRight_1x2Props) => (
  <svg width={width} height={height} viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.1213 9.00008L1.4142 17.7072L-1.23978e-05 16.293L7.29288 9.00008L-1.23978e-05 1.70718L1.4142 0.292969L10.1213 9.00008Z"
      fill={fill}
    />
  </svg>
);

ArrowRight_1x2.displayName = NAME;
ArrowRight_1x2.RATIO = '1:2';
ArrowRight_1x2.BASE_WIDTH = 1.450833333;
ArrowRight_1x2.BASE_HEIGHT = 0.4216666667;

export { ArrowRight_1x2 };
export type { ArrowRight_1x2Props };
