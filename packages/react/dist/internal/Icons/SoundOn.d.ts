import { SVGAttributes } from 'react';
type SoundOnProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const SoundOn: {
    ({ width, height, fill }: SoundOnProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { SoundOn };
export type { SoundOnProps };
