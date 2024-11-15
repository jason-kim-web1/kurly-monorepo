import type { SVGAttributes } from 'react';

const NAME = 'SoundOn';

type SoundOnProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const SoundOn = ({ width = 22, height = 16, fill = '#222222' }: SoundOnProps) => (
  <svg width={width} height={width} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.1438 8.00104C19.1438 6.07274 18.4018 4.31996 17.1859 3.00909L18.6297 1.66992C20.17 3.33054 21.1131 5.55677 21.1131 8.00104C21.1131 10.4453 20.17 12.6715 18.6297 14.3322L17.1859 12.993C18.4018 11.6821 19.1438 9.92934 19.1438 8.00104Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.6376 8.00091C14.6376 6.81281 14.1224 5.74634 13.3 5.01035L14.6133 3.54297C15.8354 4.63673 16.6068 6.22938 16.6068 8.00091C16.6068 9.77244 15.8354 11.3651 14.6133 12.4588L13.3 10.9915C14.1224 10.2555 14.6376 9.18901 14.6376 8.00091Z"
      fill={fill}
    />
    <path
      d="M4.7781 12.1906H1.35339C0.605934 12.1906 0 11.4363 0 10.5059V5.49715C0 4.56668 0.605934 3.81239 1.35339 3.81239H4.77467L8.91125 0.349248C9.91994 -0.535428 11.3107 0.362648 11.3107 1.89867V14.1013C11.3107 15.6374 9.91994 16.5354 8.91125 15.6508L4.7781 12.1906Z"
      fill={fill}
    />
  </svg>
);

SoundOn.displayName = NAME;
SoundOn.RATIO = '1:1';
SoundOn.BASE_WIDTH = 0.8795833333;
SoundOn.BASE_HEIGHT = 0.6666666667;

export { SoundOn };
export type { SoundOnProps };
