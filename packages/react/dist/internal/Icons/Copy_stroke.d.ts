import { SVGAttributes } from 'react';
type Copy_strokeProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Copy_stroke: {
    ({ width, height, fill }: Copy_strokeProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Copy_stroke };
export type { Copy_strokeProps };
