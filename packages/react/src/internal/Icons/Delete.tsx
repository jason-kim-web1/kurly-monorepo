import type { SVGAttributes } from 'react';

const NAME = 'Delete';

type DeleteProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Delete = ({ width = 18, height = 20, fill = '#222222' }: DeleteProps) => (
  <svg width={width} height={width} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 15V8H6V15H8Z" fill={fill} />
    <path d="M12 8H10V15H12V8Z" fill={fill} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 3.5V3C4 1.34315 5.34315 0 7 0H11C12.6569 0 14 1.34315 14 3V3.5H18V5.5H16.8615L15.9861 18.1382C15.9135 19.1866 15.0418 20 13.9909 20H4.00912C2.95818 20 2.08652 19.1866 2.0139 18.1382L1.13853 5.5H0V3.5H4ZM7 2H11C11.5523 2 12 2.44772 12 3V3.5H6V3C6 2.44772 6.44771 2 7 2ZM3.14332 5.5L4.00912 18H13.9909L14.8567 5.5H3.14332Z"
      fill={fill}
    />
  </svg>
);

Delete.displayName = NAME;
Delete.RATIO = '1:1';
Delete.BASE_WIDTH = 0.75;
Delete.BASE_HEIGHT = 0.8333333333;

export { Delete };
export type { DeleteProps };
