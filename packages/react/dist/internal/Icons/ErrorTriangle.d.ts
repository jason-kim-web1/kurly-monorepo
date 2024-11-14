import { SVGAttributes } from 'react';
type ErrorTriangleProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const ErrorTriangle: {
    ({ width, height, fill }: ErrorTriangleProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { ErrorTriangle };
export type { ErrorTriangleProps };
