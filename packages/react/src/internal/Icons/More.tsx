import type { SVGAttributes } from 'react';

const NAME = 'More';

type MoreProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const More = ({ width = 4, height = 16, fill = '#222222' }: MoreProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 4 16" fill="none">
    <path
      d="M3.75 1.90039C3.75 2.86689 2.9665 3.65039 2 3.65039C1.0335 3.65039 0.25 2.86689 0.25 1.90039C0.25 0.933892 1.0335 0.150391 2 0.150391C2.9665 0.150391 3.75 0.933892 3.75 1.90039Z"
      fill={fill}
    />
    <path
      d="M3.75 14.1504C3.75 15.1169 2.9665 15.9004 2 15.9004C1.0335 15.9004 0.25 15.1169 0.25 14.1504C0.25 13.1839 1.0335 12.4004 2 12.4004C2.9665 12.4004 3.75 13.1839 3.75 14.1504Z"
      fill={fill}
    />
    <path
      d="M2 9.77539C2.9665 9.77539 3.75 8.99189 3.75 8.02539C3.75 7.05889 2.9665 6.27539 2 6.27539C1.0335 6.27539 0.25 7.05889 0.25 8.02539C0.25 8.99189 1.0335 9.77539 2 9.77539Z"
      fill={fill}
    />
  </svg>
);

More.displayName = NAME;
More.RATIO = '1:1';
More.BASE_WIDTH = 0.1458333333;
More.BASE_HEIGHT = 0.65625;

export { More };
export type { MoreProps };
