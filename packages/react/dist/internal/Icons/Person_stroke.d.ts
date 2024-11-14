import { SVGAttributes } from 'react';
type Person_strokeProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Person_stroke: {
    ({ width, height, fill }: Person_strokeProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Person_stroke };
export type { Person_strokeProps };
