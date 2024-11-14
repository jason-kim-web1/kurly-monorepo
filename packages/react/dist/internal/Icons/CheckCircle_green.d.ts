import { SVGAttributes } from 'react';
type CheckCircle_greenProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'> & {
    pathFill?: string;
};
declare const CheckCircle_green: {
    ({ width, height, fill, pathFill, }: CheckCircle_greenProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { CheckCircle_green };
export type { CheckCircle_greenProps };
