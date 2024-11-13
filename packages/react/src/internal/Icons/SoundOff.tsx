import type { SVGAttributes } from 'react';

const NAME = 'SoundOff';

type SoundOffProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const SoundOff = ({ width = 22, height = 16, fill = '#222222' }: SoundOffProps) => (
  <svg width={width} height={width} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.7781 12.1906H1.35339C0.605934 12.1906 0 11.4363 0 10.5059V5.49715C0 4.56668 0.605934 3.81239 1.35339 3.81239H4.77467L8.91125 0.349248C9.91994 -0.535428 11.3107 0.362648 11.3107 1.89867V14.1013C11.3107 15.6374 9.91994 16.5354 8.91125 15.6508L4.7781 12.1906Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.888 3.81324L13.4657 5.20569L16.3101 7.99044L13.4662 10.7747L14.8885 12.1671L17.7324 9.38289L20.5772 12.168L21.9995 10.7755L19.1547 7.99044L22 5.20484L20.5777 3.81239L17.7324 6.59798L14.888 3.81324Z"
      fill={fill}
    />
  </svg>
);

SoundOff.displayName = NAME;
SoundOff.RATIO = '1:1';
SoundOff.BASE_WIDTH = 0.9166666667;
SoundOff.BASE_HEIGHT = 0.6666666667;

export { SoundOff };
export type { SoundOffProps };
