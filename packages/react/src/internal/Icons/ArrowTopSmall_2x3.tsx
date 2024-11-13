import type { SVGAttributes } from 'react';

const NAME = 'ArrowTopSmall_2x3Props';

type ArrowTopSmall_2x3Props = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowTopSmall_2x3 = ({ width = 14, height = 9, fill = '#222222' }: ArrowTopSmall_2x3Props) => (
  <svg width={width} height={height} viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.70711 2.82844L1.41421 8.12134L0 6.70712L6.70711 1.71661e-05L13.4142 6.70712L12 8.12134L6.70711 2.82844Z"
      fill={fill}
    />
  </svg>
);

ArrowTopSmall_2x3.displayName = NAME;
ArrowTopSmall_2x3.RATIO = '2:3';
ArrowTopSmall_2x3.BASE_WIDTH = 0.5075;
ArrowTopSmall_2x3.BASE_HEIGHT = 0.55875;

export { ArrowTopSmall_2x3 };
export type { ArrowTopSmall_2x3Props };
