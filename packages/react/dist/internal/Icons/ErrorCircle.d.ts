import { SVGAttributes } from 'react';
type ErrorCircleProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const ErrorCircle: {
    ({ width, height, fill }: ErrorCircleProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { ErrorCircle };
export type { ErrorCircleProps };
