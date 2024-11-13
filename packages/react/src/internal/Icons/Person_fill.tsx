import type { SVGAttributes } from 'react';

const NAME = 'Person_fill';

type Person_fillProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Person_fill = ({ width = 17, height = 20, fill = '#222222' }: Person_fillProps) => (
  <svg width={width} height={width} viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.5361 0.799988C6.21857 0.799988 4.33984 2.67872 4.33984 4.99625C4.33984 7.31377 6.21857 9.1925 8.5361 9.1925C10.8536 9.1925 12.7324 7.31377 12.7324 4.99625C12.7324 2.67872 10.8536 0.799988 8.5361 0.799988Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.06019 10.8195C3.95198 10.8195 1.18192 12.7804 0.14891 15.7119C-0.442965 17.3916 0.803213 19.152 2.5841 19.152H14.389C16.2172 19.152 17.4791 17.3212 16.8285 15.6127C15.7295 12.7268 12.9623 10.8195 9.87423 10.8195H7.06019Z"
      fill={fill}
    />
  </svg>
);

Person_fill.displayName = NAME;
Person_fill.RATIO = '1:1';
Person_fill.BASE_WIDTH = 0.7083333333;
Person_fill.BASE_HEIGHT = 0.7645833333;

export { Person_fill };
export type { Person_fillProps };
