import { SVGAttributes } from 'react';
type Person_fillProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Person_fill: {
    ({ width, height, fill }: Person_fillProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Person_fill };
export type { Person_fillProps };
