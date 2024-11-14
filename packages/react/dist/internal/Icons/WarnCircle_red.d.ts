import { SVGAttributes } from 'react';
type WarnCircle_redProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'> & {
    pathFill?: string;
};
declare const WarnCircle_red: {
    ({ width, height, fill, pathFill }: WarnCircle_redProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { WarnCircle_red };
export type { WarnCircle_redProps };
