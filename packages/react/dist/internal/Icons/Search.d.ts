import { SVGAttributes } from 'react';
type SearchProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Search: {
    ({ width, height, fill }: SearchProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Search };
export type { SearchProps };
