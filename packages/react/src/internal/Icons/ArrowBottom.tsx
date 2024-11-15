import type { SVGAttributes } from 'react';

const NAME = 'ArrowBottom';

type ArrowBottomProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowBottom = ({ width = 18, height = 12, fill = '#222222' }: ArrowBottomProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.70711 11.0615L17.4142 2.35442L16 0.940204L8.70711 8.2331L1.41421 0.940204L0 2.35442L8.70711 11.0615Z"
        fill={fill}
      />
    </svg>
  );
};

ArrowBottom.displayName = NAME;
ArrowBottom.RATIO = '1:1';
ArrowBottom.BASE_WIDTH = 0.7254166667;
ArrowBottom.BASE_HEIGHT = 0.4216666667;

export { ArrowBottom };
export type { ArrowBottomProps };
