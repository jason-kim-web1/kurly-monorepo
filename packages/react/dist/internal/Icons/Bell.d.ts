import { SVGAttributes } from 'react';
type BellProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Bell: {
    ({ width, height, fill }: BellProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Bell };
export type { BellProps };
