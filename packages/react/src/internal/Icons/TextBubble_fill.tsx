import type { SVGAttributes } from 'react';

const NAME = 'TextBubble_fill';

type TextBubble_fillProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const TextBubble_fill = ({ width = 19, height = 19, fill = '#222222' }: TextBubble_fillProps) => (
  <svg width={width} height={width} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 4C0 1.79086 1.79086 0 4 0H15C17.2091 0 19 1.79086 19 4V11C19 13.2091 17.2091 15 15 15H11.8713L9.95985 18.2672C9.76677 18.5972 9.28979 18.5972 9.09671 18.2672L7.18524 15H4C1.79086 15 0 13.2091 0 11V4ZM5 9C5.82843 9 6.5 8.32843 6.5 7.5C6.5 6.67157 5.82843 6 5 6C4.17157 6 3.5 6.67157 3.5 7.5C3.5 8.32843 4.17157 9 5 9ZM11 7.5C11 8.32843 10.3284 9 9.5 9C8.67157 9 8 8.32843 8 7.5C8 6.67157 8.67157 6 9.5 6C10.3284 6 11 6.67157 11 7.5ZM15.5 7.5C15.5 8.32843 14.8284 9 14 9C13.1716 9 12.5 8.32843 12.5 7.5C12.5 6.67157 13.1716 6 14 6C14.8284 6 15.5 6.67157 15.5 7.5Z"
      fill={fill}
    />
  </svg>
);

TextBubble_fill.displayName = NAME;
TextBubble_fill.RATIO = '1:1';
TextBubble_fill.BASE_WIDTH = 0.7916666667;
TextBubble_fill.BASE_HEIGHT = 0.77125;

export { TextBubble_fill };
export type { TextBubble_fillProps };
