import type { SVGAttributes } from 'react';

const NAME = 'Pause';

type PauseProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Pause = ({ width = 17, height = 18, fill = '#222222' }: PauseProps) => (
  <svg width={width} height={width} viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.26667 0.5C1.01482 0.5 0 1.45139 0 2.625V15.375C0 16.5486 1.01482 17.5 2.26667 17.5H4.53333C5.78518 17.5 6.8 16.5486 6.8 15.375V2.625C6.8 1.4514 5.78518 0.5 4.53333 0.5H2.26667Z"
      fill={fill}
    />
    <path
      d="M12.4667 0.5C11.2148 0.5 10.2 1.45139 10.2 2.625V15.375C10.2 16.5486 11.2148 17.5 12.4667 17.5H14.7333C15.9852 17.5 17 16.5486 17 15.375V2.625C17 1.4514 15.9852 0.5 14.7333 0.5H12.4667Z"
      fill={fill}
    />
  </svg>
);

Pause.displayName = NAME;
Pause.RATIO = '1:1';
Pause.BASE_WIDTH = 0.7083333333;
Pause.BASE_HEIGHT = 0.7083333333;

export { Pause };
export type { PauseProps };
