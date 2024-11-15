import type { SVGAttributes } from 'react';

const NAME = 'Photo_stroke_light';

type Photo_stroke_lightProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Photo_stroke_light = ({ width = 24, height = 24, fill = '#222222' }: Photo_stroke_lightProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 22 18" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 3.6H6.98885L7.43108 2.71554L7.8783 1.82111C7.94605 1.6856 8.08456 1.6 8.23607 1.6H13.7639C13.9154 1.6 14.0539 1.6856 14.1217 1.82111L14.5689 2.71554L15.0111 3.6H16H17.5C18.8255 3.6 19.9 4.67452 19.9 6V14C19.9 15.3255 18.8255 16.4 17.5 16.4H4.5C3.17452 16.4 2.1 15.3255 2.1 14V6C2.1 4.67452 3.17452 3.6 4.5 3.6H6ZM15.5528 1.10557C15.214 0.428005 14.5215 0 13.7639 0H8.23607C7.47852 0 6.786 0.428004 6.44721 1.10557L6 2H4.5C2.29086 2 0.5 3.79086 0.5 6V14C0.5 16.2091 2.29086 18 4.5 18H17.5C19.7091 18 21.5 16.2091 21.5 14V6C21.5 3.79086 19.7091 2 17.5 2H16L15.5528 1.10557ZM13.4 9.5C13.4 10.8255 12.3255 11.9 11 11.9C9.67452 11.9 8.6 10.8255 8.6 9.5C8.6 8.17452 9.67452 7.1 11 7.1C12.3255 7.1 13.4 8.17452 13.4 9.5ZM15 9.5C15 11.7091 13.2091 13.5 11 13.5C8.79086 13.5 7 11.7091 7 9.5C7 7.29086 8.79086 5.5 11 5.5C13.2091 5.5 15 7.29086 15 9.5Z"
      fill={fill}
    />
  </svg>
);

Photo_stroke_light.displayName = NAME;
Photo_stroke_light.RATIO = '1:1';
Photo_stroke_light.BASE_WIDTH = 0.875;
Photo_stroke_light.BASE_HEIGHT = 0.75;

export { Photo_stroke_light };
export type { Photo_stroke_lightProps };
