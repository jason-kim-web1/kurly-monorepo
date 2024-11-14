import { SVGAttributes } from 'react';
type RefreshProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Refresh: {
    ({ width, height, fill }: RefreshProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Refresh };
export type { RefreshProps };
