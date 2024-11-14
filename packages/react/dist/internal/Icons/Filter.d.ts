import { SVGAttributes } from 'react';
type FilterProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Filter: {
    ({ width, height, fill }: FilterProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Filter };
export type { FilterProps };
