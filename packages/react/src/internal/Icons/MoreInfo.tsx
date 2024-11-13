import type { SVGAttributes } from 'react';

const NAME = 'MoreInfo';

type MoreInfoProps = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'fill'>;

const MoreInfo = ({ width = 10, height = 10, fill = '#222222' }: MoreInfoProps) => (
  <svg width={width} height={width} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 8V0H4.76837e-07L0 10H10V8H2Z" fill={fill} />
  </svg>
);

MoreInfo.displayName = NAME;
MoreInfo.RATIO = '1:1';
MoreInfo.BASE_WIDTH = 0.4166666667;
MoreInfo.BASE_HEIGHT = 0.4166666667;

export { MoreInfo };
export type { MoreInfoProps };
