import { SVGAttributes } from 'react';
type MoreInfoProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const MoreInfo: {
    ({ width, height, fill }: MoreInfoProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { MoreInfo };
export type { MoreInfoProps };
