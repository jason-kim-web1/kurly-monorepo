import type { SVGAttributes } from 'react';

const NAME = 'Calendar';

type CalendarProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Calendar = ({ width = 20, height = 20, fill = '#222222' }: CalendarProps) => (
  <svg width={width} height={width} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 0H5V2H4C1.79086 2 0 3.79086 0 6V16C0 18.2091 1.79086 20 4 20H16C18.2091 20 20 18.2091 20 16V6C20 3.79086 18.2091 2 16 2H15V0H13V2H7V0ZM18 9V6C18 4.89543 17.1046 4 16 4H15V6H13V4H7V6H5V4H4C2.89543 4 2 4.89543 2 6V9H18ZM2 11V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V11H2Z"
      fill={fill}
    />
  </svg>
);

Calendar.displayName = NAME;
Calendar.RATIO = '1:1';
Calendar.BASE_WIDTH = 0.8333333333;
Calendar.BASE_HEIGHT = 0.8333333333;

export { Calendar };
export type { CalendarProps };
