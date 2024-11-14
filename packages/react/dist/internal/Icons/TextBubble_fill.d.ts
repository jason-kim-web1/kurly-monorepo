import { SVGAttributes } from 'react';
type TextBubble_fillProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const TextBubble_fill: {
    ({ width, height, fill }: TextBubble_fillProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { TextBubble_fill };
export type { TextBubble_fillProps };
