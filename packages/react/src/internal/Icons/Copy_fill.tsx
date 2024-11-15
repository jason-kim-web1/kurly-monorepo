import type { SVGAttributes } from 'react';

const NAME = 'Copy_fill';

type Copy_fillProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Copy_fill = ({ width = 20, height = 22, fill = '#222222' }: Copy_fillProps) => (
  <svg width={width} height={width} viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 0.5C6.79086 0.5 5 2.29086 5 4.5L11 4.5C14.3137 4.5 17 7.18629 17 10.5V15.374C18.7252 14.9299 20 13.3638 20 11.5V4.5C20 2.29086 18.2091 0.5 16 0.5H9Z"
      fill={fill}
    />
    <path
      d="M0 10.5C0 8.29086 1.79086 6.5 4 6.5H11C13.2091 6.5 15 8.29086 15 10.5V17.5C15 19.7091 13.2091 21.5 11 21.5H4C1.79086 21.5 0 19.7091 0 17.5V10.5Z"
      fill={fill}
    />
  </svg>
);

Copy_fill.displayName = NAME;
Copy_fill.RATIO = '1:1';
Copy_fill.BASE_WIDTH = 0.8333333333;
Copy_fill.BASE_HEIGHT = 0.8333333333;

export { Copy_fill };
export type { Copy_fillProps };
