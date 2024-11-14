import { SVGAttributes } from 'react';
type FreezeProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Freeze: {
    ({ width, height, fill }: FreezeProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Freeze };
export type { FreezeProps };
