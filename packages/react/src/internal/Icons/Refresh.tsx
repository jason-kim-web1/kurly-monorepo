import type { SVGAttributes } from 'react';

const NAME = 'Refresh';

type RefreshProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Refresh = ({ width = 16, height = 16, fill = '#222222' }: RefreshProps) => (
  <svg width={width} height={width} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.64 2.35C12.19 0.9 10.2 0 7.99 0C3.57 0 0 3.58 0 8C0 12.42 3.57 16 7.99 16C11.72 16 14.83 13.45 15.72 10H13.64C12.82 12.33 10.6 14 7.99 14C4.68 14 1.99 11.31 1.99 8C1.99 4.69 4.68 2 7.99 2C9.65 2 11.13 2.69 12.21 3.78L10.0143 5.97574C9.63628 6.35371 9.90398 7 10.4385 7H15.39C15.7214 7 15.99 6.73137 15.99 6.4V1.44853C15.99 0.913985 15.3437 0.646285 14.9657 1.02426L13.64 2.35Z"
      fill={fill}
    />
  </svg>
);

Refresh.displayName = NAME;
Refresh.RATIO = '1:1';
Refresh.BASE_WIDTH = 0.66625;
Refresh.BASE_HEIGHT = 0.6666666667;

export { Refresh };
export type { RefreshProps };
