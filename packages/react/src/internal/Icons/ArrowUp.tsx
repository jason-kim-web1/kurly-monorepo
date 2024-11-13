import type { SVGAttributes } from 'react';

const NAME = 'ArrowUp';

type ArrowUpProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const ArrowUp = ({ width = 19, height = 20, fill = '#222222' }: ArrowUpProps) => (
  <svg width={width} height={height} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.3848 9.69239L9.19239 0.5L0 9.69239L1.41421 11.1066L8.19336 4.32746V19.3994H10.1934V4.3294L16.9706 11.1066L18.3848 9.69239Z"
      fill={fill}
    />
  </svg>
);

ArrowUp.displayName = NAME;
ArrowUp.RATIO = '1:1';
ArrowUp.BASE_WIDTH = 0.7658333333;
ArrowUp.BASE_HEIGHT = 0.7875;

export { ArrowUp };
export type { ArrowUpProps };
