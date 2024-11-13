import type { SVGAttributes } from 'react';

const NAME = 'Minus';

type MinusProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Minus = ({ width = 16, height = 2, fill = '#222222' }: MinusProps) => (
  <svg width={width} height={width} viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H16V2H0V0Z" fill={fill} />
  </svg>
);

Minus.displayName = NAME;
Minus.RATIO = '1:1';
Minus.BASE_WIDTH = 0.6666666667;
Minus.BASE_HEIGHT = 0.08333333333;

export { Minus };
export type { MinusProps };
