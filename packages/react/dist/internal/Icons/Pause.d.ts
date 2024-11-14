import { SVGAttributes } from 'react';
type PauseProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Pause: {
    ({ width, height, fill }: PauseProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Pause };
export type { PauseProps };
