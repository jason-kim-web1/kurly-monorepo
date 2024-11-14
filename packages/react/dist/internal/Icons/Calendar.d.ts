import { SVGAttributes } from 'react';
type CalendarProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;
declare const Calendar: {
    ({ width, height, fill }: CalendarProps): JSX.Element;
    displayName: string;
    RATIO: string;
    BASE_WIDTH: number;
    BASE_HEIGHT: number;
};
export { Calendar };
export type { CalendarProps };
