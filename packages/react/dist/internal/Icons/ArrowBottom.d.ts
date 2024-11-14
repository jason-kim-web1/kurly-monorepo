import { SVGAttributes } from 'react';
type ArrowBottomProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const ArrowBottom: {
    ({ width, height, fill }: ArrowBottomProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { ArrowBottom };
export type { ArrowBottomProps };
