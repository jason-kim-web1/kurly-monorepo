import type { SVGAttributes } from 'react';

const NAME = 'Basket';

type BlankProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Blank = ({ width = 19, height = 19, fill = '#222222' }: BlankProps) => (
  <svg width={width} height={width} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 4C0 1.79086 1.79086 0 4 0H15C17.2091 0 19 1.79086 19 4V15C19 17.2091 17.2091 19 15 19H4C1.79086 19 0 17.2091 0 15V4ZM4 2C2.89543 2 2 2.89543 2 4V15C2 16.1046 2.89543 17 4 17H15C16.1046 17 17 16.1046 17 15V4C17 2.89543 16.1046 2 15 2H4Z"
      fill={fill}
    />
  </svg>
);

Blank.displayName = NAME;
Blank.RATIO = '1:1';
Blank.BASE_WIDTH = 0.7916666667;
Blank.BASE_HEIGHT = 0.7916666667;

export { Blank };
export type { BlankProps };
