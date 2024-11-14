import { SVGAttributes } from 'react';
type WaterDropProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const WaterDrop: {
    ({ width, height, fill }: WaterDropProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { WaterDrop };
export type { WaterDropProps };
