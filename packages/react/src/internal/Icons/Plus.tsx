import type { SVGAttributes } from 'react';

const NAME = 'Plus';

type PlusProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Plus = ({ width = 16, height = 16, fill = '#222222' }: PlusProps) => (
  <svg width={width} height={width} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 0H7V7H0V9H7V16H9V9H16V7H9V0Z" fill={fill} />
  </svg>
);

Plus.displayName = NAME;
Plus.RATIO = '1:1';
Plus.BASE_WIDTH = 0.6666666667;
Plus.BASE_HEIGHT = 0.6666666667;

export { Plus };
export type { PlusProps };
