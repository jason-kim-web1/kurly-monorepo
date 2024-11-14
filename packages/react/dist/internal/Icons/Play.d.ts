import { SVGAttributes } from 'react';
type PlayProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Play: {
    ({ width, height, fill }: PlayProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Play };
export type { PlayProps };
