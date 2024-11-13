import type { SVGAttributes } from 'react';

const NAME = 'Close';

type CloseProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Close = ({ width = 16, height = 16, fill = '#222222' }: CloseProps) => (
  <svg width={width} height={width} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.41421 0.22168L0 1.63589L6.36396 7.99985L0 14.3638L1.41421 15.778L7.77817 9.41407L14.1421 15.778L15.5563 14.3638L9.19239 7.99985L15.5563 1.63589L14.1421 0.22168L7.77817 6.58564L1.41421 0.22168Z"
      fill={fill}
    />
  </svg>
);

Close.displayName = NAME;
Close.RATIO = '1:1';
Close.BASE_WIDTH = 0.6483333333;
Close.BASE_HEIGHT = 0.6483333333;

export { Close };
export type { CloseProps };
