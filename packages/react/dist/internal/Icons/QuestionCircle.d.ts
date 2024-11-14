import { SVGAttributes } from 'react';
type QuestionCircleProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const QuestionCircle: {
    ({ width, height, fill }: QuestionCircleProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { QuestionCircle };
export type { QuestionCircleProps };
