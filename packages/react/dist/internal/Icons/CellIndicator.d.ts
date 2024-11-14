import { SVGAttributes } from 'react';
type CellIndicatorProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const CellIndicator: {
    ({ width, height, fill }: CellIndicatorProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { CellIndicator };
export type { CellIndicatorProps };
