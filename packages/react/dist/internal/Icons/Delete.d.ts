import { SVGAttributes } from 'react';
type DeleteProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Delete: {
    ({ width, height, fill }: DeleteProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Delete };
export type { DeleteProps };
