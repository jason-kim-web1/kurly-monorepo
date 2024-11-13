import type { SVGAttributes } from 'react';

const NAME = 'Heart';

type HeartProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Heart = ({ width = 21, height = 17, fill = '#222222' }: HeartProps) => (
  <svg width={width} height={width} viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 5.49088C21 11.6903 11.2697 16.7082 10.8553 16.9154C10.7461 16.9709 10.624 17 10.5 17C10.376 17 10.2539 16.9709 10.1447 16.9154C9.73031 16.7082 0 11.6903 0 5.49088C0.00173694 4.03511 0.614681 2.63944 1.70436 1.61005C2.79404 0.580669 4.27146 0.00164083 5.8125 0C7.74844 0 9.44344 0.786435 10.5 2.11576C11.5566 0.786435 13.2516 0 15.1875 0C16.7285 0.00164083 18.206 0.580669 19.2956 1.61005C20.3853 2.63944 20.9983 4.03511 21 5.49088Z"
      fill={fill}
    />
  </svg>
);

Heart.displayName = NAME;
Heart.RATIO = '1:1';
Heart.BASE_WIDTH = 0.875;
Heart.BASE_HEIGHT = 0.7083333333;

export { Heart };
export type { HeartProps };
