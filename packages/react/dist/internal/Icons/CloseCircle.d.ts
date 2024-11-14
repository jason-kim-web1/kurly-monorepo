import { SVGAttributes } from 'react';
type CloseCircleProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const CloseCircle: {
    ({ width, height, fill }: CloseCircleProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { CloseCircle };
export type { CloseCircleProps };
