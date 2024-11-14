import { SVGAttributes } from 'react';
type MenuProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Menu: {
    ({ width, height, fill }: MenuProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Menu };
export type { MenuProps };
