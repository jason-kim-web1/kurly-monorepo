import type { SVGAttributes } from 'react';

const NAME = 'QuestionCircle';

type QuestionCircleProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const QuestionCircle = ({ width = 22, height = 22, fill = '#222222' }: QuestionCircleProps) => (
  <svg width={width} height={width} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22ZM9.032 8.59028H7C7.06982 6.51022 8.47927 5 11.048 5C13.4175 5 15 6.38621 15 8.3275C15 9.66943 14.344 10.6083 13.1658 11.3199C12.0342 11.996 11.7142 12.4433 11.7142 13.3114V13.8133H9.70691L9.69818 13.2154C9.62109 11.9001 10.1229 11.1088 11.3156 10.3987L11.5687 10.2363C12.4473 9.66057 12.7527 9.20293 12.7527 8.40575C12.7527 7.49341 12.0255 6.83352 10.9345 6.83352C9.81891 6.83352 9.10182 7.51851 9.032 8.59028ZM9.36945 16.6049C9.36945 17.4464 9.94109 18 10.8051 18C11.688 18 12.2407 17.4464 12.2407 16.6049C12.2407 15.7531 11.688 15.1995 10.8051 15.1995C9.94109 15.1995 9.36945 15.7531 9.36945 16.6049Z"
      fill={fill}
    />
  </svg>
);

QuestionCircle.displayName = NAME;
QuestionCircle.RATIO = '1:1';
QuestionCircle.BASE_WIDTH = 0.9166666667;
QuestionCircle.BASE_HEIGHT = 0.9166666667;

export { QuestionCircle };
export type { QuestionCircleProps };
