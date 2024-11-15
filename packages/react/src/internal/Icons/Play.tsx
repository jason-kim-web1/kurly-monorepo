import type { SVGAttributes } from 'react';

const NAME = 'Play';

type PlayProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const Play = ({ width = 16, height = 18, fill = '#222222' }: PlayProps) => (
  <svg width={width} height={width} viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.0289 7.34178C16.3237 8.11186 16.3237 9.88814 15.0289 10.6582L3.2007 17.6931C1.81181 18.5192 0 17.5805 0 16.0349V1.96509C0 0.41949 1.81181 -0.519174 3.2007 0.306874L15.0289 7.34178Z"
      fill={fill}
    />
  </svg>
);

Play.displayName = NAME;
Play.RATIO = '1:1';
Play.BASE_WIDTH = 0.6666666667;
Play.BASE_HEIGHT = 0.75;

export { Play };
export type { PlayProps };
