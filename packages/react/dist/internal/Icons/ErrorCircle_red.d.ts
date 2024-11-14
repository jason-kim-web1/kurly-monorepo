import { SVGAttributes } from 'react';
type ErrorCircle_redProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'> & {
    pathFill?: string;
};
declare const ErrorCircle_red: {
    ({ width, height, fill, pathFill }: ErrorCircle_redProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { ErrorCircle_red };
export type { ErrorCircle_redProps };
