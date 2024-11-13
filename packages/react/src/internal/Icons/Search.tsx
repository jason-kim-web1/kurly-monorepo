import type { SVGAttributes } from 'react';

const NAME = 'Search';

type SearchProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Search = ({ width = 21, height = 22, fill = '#222222' }: SearchProps) => (
  <svg width={width} height={width} viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.7617 15.9359C12.3144 17.0781 10.4868 17.7598 8.5 17.7598C3.80558 17.7598 0 13.9542 0 9.25977C0 4.56535 3.80558 0.759766 8.5 0.759766C13.1944 0.759766 17 4.56535 17 9.25977C17 11.2467 16.3183 13.0744 15.176 14.5217L20.4805 19.8262L19.0663 21.2404L13.7617 15.9359ZM15 9.25977C15 12.8496 12.0899 15.7598 8.5 15.7598C4.91015 15.7598 2 12.8496 2 9.25977C2 5.66991 4.91015 2.75977 8.5 2.75977C12.0899 2.75977 15 5.66991 15 9.25977Z"
      fill={fill}
    />
  </svg>
);

Search.displayName = NAME;
Search.RATIO = '1:1';
Search.BASE_WIDTH = 0.8533333333;
Search.BASE_HEIGHT = 0.8533333333;

export { Search };
export type { SearchProps };
