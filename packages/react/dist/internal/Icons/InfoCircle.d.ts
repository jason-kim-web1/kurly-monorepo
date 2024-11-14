import { SVGAttributes } from 'react';
type InfoCircleProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const InfoCircle: {
    ({ width, height, fill }: InfoCircleProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { InfoCircle };
export type { InfoCircleProps };
