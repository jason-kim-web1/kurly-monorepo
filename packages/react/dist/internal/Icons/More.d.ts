import { SVGAttributes } from 'react';
type MoreProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const More: {
    ({ width, height, fill }: MoreProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { More };
export type { MoreProps };
