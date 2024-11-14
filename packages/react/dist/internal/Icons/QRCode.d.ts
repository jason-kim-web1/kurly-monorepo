import { SVGAttributes } from 'react';
type QRCodeProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const QRCode: {
    ({ width, height, fill }: QRCodeProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { QRCode };
export type { QRCodeProps };
