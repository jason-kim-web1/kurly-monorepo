import { SVGAttributes } from 'react';
type ArrowTopProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const ArrowTop: {
    ({ width, height, fill }: ArrowTopProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { ArrowTop };
export type { ArrowTopProps };
