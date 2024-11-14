import { SVGAttributes } from 'react';
type GiftProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Gift: {
    ({ width, height, fill }: GiftProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Gift };
export type { GiftProps };
