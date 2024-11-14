import { SVGAttributes } from 'react';
type HeartProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Heart: {
    ({ width, height, fill }: HeartProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Heart };
export type { HeartProps };
