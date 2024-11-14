import { SVGAttributes } from 'react';
type SunProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Sun: {
    ({ width, height, fill }: SunProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Sun };
export type { SunProps };
