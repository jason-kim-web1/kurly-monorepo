import { SVGAttributes } from 'react';
type SoundOffProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const SoundOff: {
    ({ width, height, fill }: SoundOffProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { SoundOff };
export type { SoundOffProps };
