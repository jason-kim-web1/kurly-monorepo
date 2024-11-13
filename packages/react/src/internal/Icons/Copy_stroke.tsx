import type { SVGAttributes } from 'react';

const NAME = 'Copy_stroke';

type Copy_strokeProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Copy_stroke = ({ width = 20, height = 20, fill = '#222222' }: Copy_strokeProps) => (
  <svg width={width} height={width} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 15V16C15 18.2091 13.2091 20 11 20H4C1.79086 20 0 18.2091 0 16V9C0 6.79086 1.79086 5 4 5H5V4C5 1.79086 6.79086 0 9 0H16C18.2091 0 20 1.79086 20 4V11C20 13.2091 18.2091 15 16 15H15ZM16 2H9C7.89543 2 7 2.89543 7 4V5H11C13.2091 5 15 6.79086 15 9V13H16C17.1046 13 18 12.1046 18 11V4C18 2.89543 17.1046 2 16 2ZM4 7H11C12.1046 7 13 7.89543 13 9V16C13 17.1046 12.1046 18 11 18H4C2.89543 18 2 17.1046 2 16V9C2 7.89543 2.89543 7 4 7Z"
      fill={fill}
    />
  </svg>
);

Copy_stroke.displayName = NAME;
Copy_stroke.RATIO = '1:1';
Copy_stroke.BASE_WIDTH = 0.8333333333;
Copy_stroke.BASE_HEIGHT = 0.875;

export { Copy_stroke };
export type { Copy_strokeProps };
