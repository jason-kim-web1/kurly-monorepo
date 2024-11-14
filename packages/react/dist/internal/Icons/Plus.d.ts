import { SVGAttributes } from 'react';
type PlusProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Plus: {
    ({ width, height, fill }: PlusProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Plus };
export type { PlusProps };
