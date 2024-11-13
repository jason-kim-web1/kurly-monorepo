import type { SVGAttributes } from 'react';

const NAME = 'Photo_stroke_regular';

type Photo_stroke_regularProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Photo_stroke_regular = ({ width = 24, height = 24, fill = '#222222' }: Photo_stroke_regularProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 22 18" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 11.5C12.1046 11.5 13 10.6046 13 9.5C13 8.39543 12.1046 7.5 11 7.5C9.89543 7.5 9 8.39543 9 9.5C9 10.6046 9.89543 11.5 11 11.5ZM11 13.5C13.2091 13.5 15 11.7091 15 9.5C15 7.29086 13.2091 5.5 11 5.5C8.79086 5.5 7 7.29086 7 9.5C7 11.7091 8.79086 13.5 11 13.5Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.23607 4H4.5C3.39543 4 2.5 4.89543 2.5 6V14C2.5 15.1046 3.39543 16 4.5 16H17.5C18.6046 16 19.5 15.1046 19.5 14V6C19.5 4.89543 18.6046 4 17.5 4H14.7639L13.7639 2L8.23607 2L7.23607 4ZM16 2L15.5528 1.10557C15.214 0.428005 14.5215 0 13.7639 0H8.23607C7.47852 0 6.786 0.428004 6.44721 1.10557L6 2H4.5C2.29086 2 0.5 3.79086 0.5 6V14C0.5 16.2091 2.29086 18 4.5 18H17.5C19.7091 18 21.5 16.2091 21.5 14V6C21.5 3.79086 19.7091 2 17.5 2H16Z"
      fill={fill}
    />
  </svg>
);

Photo_stroke_regular.displayName = NAME;
Photo_stroke_regular.RATIO = '1:1';
Photo_stroke_regular.BASE_WIDTH = 0.875;
Photo_stroke_regular.BASE_HEIGHT = 0.75;

export { Photo_stroke_regular };
export type { Photo_stroke_regularProps };
