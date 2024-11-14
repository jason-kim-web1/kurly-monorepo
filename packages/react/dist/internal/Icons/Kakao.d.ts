import { SVGAttributes } from 'react';
type KakaoProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Kakao: {
    ({ width, height, fill }: KakaoProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Kakao };
export type { KakaoProps };
