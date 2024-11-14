import { SVGAttributes } from 'react';
type BasketProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Basket: {
    ({ width, height, fill }: BasketProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Basket };
export type { BasketProps };
