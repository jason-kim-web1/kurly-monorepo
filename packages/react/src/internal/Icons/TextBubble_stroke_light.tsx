import type { SVGAttributes } from 'react';

const NAME = 'TextBubble_stroke_light';

type TextBubble_stroke_lightProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const TextBubble_stroke_light = ({ width = 19, height = 19, fill = '#222222' }: TextBubble_stroke_lightProps) => (
  <svg width={width} height={width} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 9C5.82843 9 6.5 8.32843 6.5 7.5C6.5 6.67157 5.82843 6 5 6C4.17157 6 3.5 6.67157 3.5 7.5C3.5 8.32843 4.17157 9 5 9Z"
      fill={fill}
    />
    <path
      d="M11 7.5C11 8.32843 10.3284 9 9.5 9C8.67157 9 8 8.32843 8 7.5C8 6.67157 8.67157 6 9.5 6C10.3284 6 11 6.67157 11 7.5Z"
      fill={fill}
    />
    <path
      d="M15.5 7.5C15.5 8.32843 14.8284 9 14 9C13.1716 9 12.5 8.32843 12.5 7.5C12.5 6.67157 13.1716 6 14 6C14.8284 6 15.5 6.67157 15.5 7.5Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 0C1.79086 0 0 1.79086 0 4V11C0 13.2091 1.79086 15 4 15H7.18524L9.09671 18.2672C9.28979 18.5972 9.76677 18.5972 9.95985 18.2672L11.8713 15H15C17.2091 15 19 13.2091 19 11V4C19 1.79086 17.2091 0 15 0H4ZM7.75876 14H4C2.34315 14 1 12.6569 1 11V4C1 2.34315 2.34315 1 4 1H15C16.6569 1 18 2.34315 18 4V11C18 12.6569 16.6569 14 15 14H11.2978L9.52828 17.0246L7.75876 14Z"
      fill={fill}
    />
  </svg>
);

TextBubble_stroke_light.displayName = NAME;
TextBubble_stroke_light.RATIO = '1:1';
TextBubble_stroke_light.BASE_WIDTH = 0.7916666667;
TextBubble_stroke_light.BASE_HEIGHT = 0.77125;

export { TextBubble_stroke_light };
export type { TextBubble_stroke_lightProps };
