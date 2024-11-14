import { SVGAttributes } from 'react';
type ArrowRightProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const ArrowRight: {
    ({ width, height, fill }: ArrowRightProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { ArrowRight };
export type { ArrowRightProps };
