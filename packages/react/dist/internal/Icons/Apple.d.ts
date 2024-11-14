import { SVGAttributes } from 'react';
type AppleProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Apple: {
    ({ width, height, fill }: AppleProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Apple };
export type { AppleProps };
