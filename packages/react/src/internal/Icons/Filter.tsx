import type { SVGAttributes } from 'react';

const NAME = 'Filter';

type FilterProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Filter = ({ width = 18, height = 16, fill = '#222222' }: FilterProps) => (
  <svg width={width} height={width} viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.85506 3C8.42479 1.55426 7.08551 0.5 5.5 0.5C3.91449 0.5 2.57521 1.55426 2.14494 3H0V5H2.14494C2.57521 6.44574 3.91449 7.5 5.5 7.5C7.08551 7.5 8.42479 6.44574 8.85506 5H18V3H8.85506ZM7 4C7 4.82843 6.32843 5.5 5.5 5.5C4.67157 5.5 4 4.82843 4 4C4 3.17157 4.67157 2.5 5.5 2.5C6.32843 2.5 7 3.17157 7 4Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.14494 11H0V13H9.14494C9.57521 14.4457 10.9145 15.5 12.5 15.5C14.0855 15.5 15.4248 14.4457 15.8551 13H18V11H15.8551C15.4248 9.55425 14.0855 8.5 12.5 8.5C10.9145 8.5 9.57521 9.55425 9.14494 11ZM11 12C11 12.8284 11.6716 13.5 12.5 13.5C13.3284 13.5 14 12.8284 14 12C14 11.1716 13.3284 10.5 12.5 10.5C11.6716 10.5 11 11.1716 11 12Z"
      fill={fill}
    />
  </svg>
);

Filter.displayName = NAME;
Filter.RATIO = '1:1';
Filter.BASE_WIDTH = 0.75;
Filter.BASE_HEIGHT = 0.625;

export { Filter };
export type { FilterProps };
