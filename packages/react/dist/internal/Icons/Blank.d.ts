import { SVGAttributes } from 'react';
type BlankProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Blank: {
    ({ width, height, fill }: BlankProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Blank };
export type { BlankProps };
