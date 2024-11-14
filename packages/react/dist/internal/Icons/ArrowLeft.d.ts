import { SVGAttributes } from 'react';
type ArrowLeftProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const ArrowLeft: {
    ({ width, height, fill }: ArrowLeftProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { ArrowLeft };
export type { ArrowLeftProps };
