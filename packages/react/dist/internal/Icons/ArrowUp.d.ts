import { SVGAttributes } from 'react';
type ArrowUpProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const ArrowUp: {
    ({ width, height, fill }: ArrowUpProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { ArrowUp };
export type { ArrowUpProps };
