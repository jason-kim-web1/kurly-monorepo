import type { SVGAttributes } from 'react';

const NAME = 'Gift';

type GiftProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Gift = ({ width = 18, height = 20, fill = '#222222' }: GiftProps) => (
  <svg width={width} height={width} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.791 5.5C15.9377 5.01378 16.0082 4.50779 16 4C16 2.07 14.43 0.5 12.5 0.5C10.878 0.5 9.795 1.982 9.096 3.585C8.407 2.07 7.269 0.5 5.5 0.5C3.57 0.5 2 2.07 2 4C2 4.596 2.079 5.089 2.209 5.5H1C0.447715 5.5 0 5.94772 0 6.5V8C0 8.55228 0.447715 9 1 9H17C17.5523 9 18 8.55228 18 8V6.5C18 5.94772 17.5523 5.5 17 5.5H15.791ZM7.698 5.5H5C4.626 5.5 4 5.5 4 4C4 3.173 4.673 2.5 5.5 2.5C6.388 2.5 7.214 4.025 7.698 5.5ZM13 5.5H10.523C11.033 3.924 11.774 2.5 12.5 2.5C13.327 2.5 14 3.173 14 4C14 5.5 13.374 5.5 13 5.5Z"
      fill={fill}
    />
    <path
      d="M1.25 17.5V10.5H8.25V19.5H3.25C2.71957 19.5 2.21086 19.2893 1.83579 18.9142C1.46071 18.5391 1.25 18.0304 1.25 17.5Z"
      fill={fill}
    />
    <path
      d="M9.75 19.5V10.5H16.75V17.5C16.75 18.0304 16.5393 18.5391 16.1642 18.9142C15.7891 19.2893 15.2804 19.5 14.75 19.5H9.75Z"
      fill={fill}
    />
  </svg>
);

Gift.displayName = NAME;
Gift.RATIO = '1:1';
Gift.BASE_WIDTH = 0.75;
Gift.BASE_HEIGHT = 0.7916666667;

export { Gift };
export type { GiftProps };
