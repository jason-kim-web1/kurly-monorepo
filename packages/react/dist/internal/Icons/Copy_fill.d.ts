import { SVGAttributes } from 'react';
type Copy_fillProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Copy_fill: {
    ({ width, height, fill }: Copy_fillProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Copy_fill };
export type { Copy_fillProps };
