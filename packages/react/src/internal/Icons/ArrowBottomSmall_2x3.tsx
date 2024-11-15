import type { SVGAttributes } from 'react';

const NAME = 'ArrowBottomSmall_2x3';

type ArrowBottomSmall_2x3Props = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowBottomSmall_2x3 = ({ width = 14, height = 10, fill = '#222222' }: ArrowBottomSmall_2x3Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.70711 6.23332L12 0.94043L13.4142 2.35464L6.70711 9.06175L1.90735e-06 2.35464L1.41422 0.94043L6.70711 6.23332Z"
        fill={fill}
      />
    </svg>
  );
};

ArrowBottomSmall_2x3.displayName = NAME;
ArrowBottomSmall_2x3.RATIO = '2:3';
ArrowBottomSmall_2x3.BASE_WIDTH = 0.5075;
ArrowBottomSmall_2x3.BASE_HEIGHT = 0.55875;

export { ArrowBottomSmall_2x3 };
export type { ArrowBottomSmall_2x3Props };
