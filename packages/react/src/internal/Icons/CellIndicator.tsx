import type { SVGAttributes } from 'react';

const NAME = 'CellIndicator';

type CellIndicatorProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const CellIndicator = ({ width = 16, height = 12, fill = '#222222' }: CellIndicatorProps) => (
  <svg width={width} height={width} viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0.5H15.9988V2.5H0V0.5Z" fill={fill} />
    <path d="M0 4.99609H15.9988V6.99609H0V4.99609Z" fill={fill} />
    <path d="M16.0008 9.5H0.00195312V11.5H16.0008V9.5Z" fill={fill} />
  </svg>
);

CellIndicator.displayName = NAME;
CellIndicator.RATIO = '1:1';
CellIndicator.BASE_WIDTH = 0.6666666667;
CellIndicator.BASE_HEIGHT = 0.4583333333;

export { CellIndicator };
export type { CellIndicatorProps };
