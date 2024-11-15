import type { SVGAttributes } from 'react';

const NAME = 'ArrowLeft';

type ArrowLeftProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowLeft = ({ width = 12, height = 18, fill = '#222222' }: ArrowLeftProps) => (
  <svg width={width} height={height} viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.939453 9.00008L9.64656 17.7072L11.0608 16.293L3.76788 9.00008L11.0608 1.70718L9.64656 0.292969L0.939453 9.00008Z"
      fill={fill}
    />
  </svg>
);

ArrowLeft.displayName = NAME;
ArrowLeft.RATIO = '1:1';
ArrowLeft.BASE_WIDTH = 0.7254166667;
ArrowLeft.BASE_HEIGHT = 0.4216666667;

export { ArrowLeft };
export type { ArrowLeftProps };
