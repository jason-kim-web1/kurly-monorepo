import type { SVGAttributes } from 'react';

const NAME = 'TextBubble_stroke_regular';

type TextBubble_stroke_regularProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const TextBubble_stroke_regular = ({ width = 21, height = 21, fill = '#222222' }: TextBubble_stroke_regularProps) => (
  <svg width={width} height={width} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 5C2 3.34315 3.34315 2 5 2H16C17.6569 2 19 3.34315 19 5V12C19 13.6569 17.6569 15 16 15H12.2978L10.5283 18.0246L8.75876 15H5C3.34315 15 2 13.6569 2 12V5ZM5 0C2.23858 0 0 2.23858 0 5V12C0 14.7614 2.23858 17 5 17H7.61171L9.23358 19.7722C9.8128 20.7622 11.2438 20.7623 11.823 19.7722L13.4448 17H16C18.7614 17 21 14.7614 21 12V5C21 2.23858 18.7614 0 16 0H5ZM6 10C6.82843 10 7.5 9.32843 7.5 8.5C7.5 7.67157 6.82843 7 6 7C5.17157 7 4.5 7.67157 4.5 8.5C4.5 9.32843 5.17157 10 6 10ZM12 8.5C12 9.32843 11.3284 10 10.5 10C9.67157 10 9 9.32843 9 8.5C9 7.67157 9.67157 7 10.5 7C11.3284 7 12 7.67157 12 8.5ZM16.5 8.5C16.5 9.32843 15.8284 10 15 10C14.1716 10 13.5 9.32843 13.5 8.5C13.5 7.67157 14.1716 7 15 7C15.8284 7 16.5 7.67157 16.5 8.5Z"
      fill={fill}
    />
  </svg>
);

TextBubble_stroke_regular.displayName = NAME;
TextBubble_stroke_regular.RATIO = '1:1';
TextBubble_stroke_regular.BASE_WIDTH = 0.875;
TextBubble_stroke_regular.BASE_HEIGHT = 0.8545833333;

export { TextBubble_stroke_regular };
export type { TextBubble_stroke_regularProps };
