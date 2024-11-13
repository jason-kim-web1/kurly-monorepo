import type { SVGAttributes } from 'react';

const NAME = 'ArrowTop';

type ArrowTopProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowTop = ({ width = 18, height = 11, fill = '#222222' }: ArrowTopProps) => (
  <svg width={width} height={height} viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.70711 0L17.4142 8.70711L16 10.1213L8.70711 2.82843L1.41421 10.1213L0 8.70711L8.70711 0Z"
      fill={fill}
    />
  </svg>
);

ArrowTop.displayName = NAME;
ArrowTop.RATIO = '1:1';
ArrowTop.BASE_WIDTH = 0.7254166667;
ArrowTop.BASE_HEIGHT = 0.4216666667;

export { ArrowTop };
export type { ArrowTopProps };
