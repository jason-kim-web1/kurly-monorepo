import type { SVGAttributes } from 'react';

const NAME = 'WaterDrop';

type WaterDropProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const WaterDrop = ({ width = 12, height = 18, fill = '#222222' }: WaterDropProps) => (
  <svg width={width} height={width} viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.00039 17.25C9.3141 17.25 12 14.6599 12 11.4653C12 9.33561 10.0001 5.76409 6.00039 0.75C1.99987 5.76333 0 9.33561 0 11.4653C0 14.6599 2.68668 17.25 6.00039 17.25Z"
      fill={fill}
    />
  </svg>
);

WaterDrop.displayName = NAME;
WaterDrop.RATIO = '1:1';
WaterDrop.BASE_WIDTH = 0.5;
WaterDrop.BASE_HEIGHT = 0.6875;

export { WaterDrop };
export type { WaterDropProps };
