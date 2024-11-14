import { SVGAttributes } from 'react';
type MinusProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Minus: {
    ({ width, height, fill }: MinusProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Minus };
export type { MinusProps };
