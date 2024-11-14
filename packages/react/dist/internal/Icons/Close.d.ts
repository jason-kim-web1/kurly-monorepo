import { SVGAttributes } from 'react';
type CloseProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Close: {
    ({ width, height, fill }: CloseProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Close };
export type { CloseProps };
