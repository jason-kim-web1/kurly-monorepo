import type { SVGAttributes } from 'react';

import COLOR from '../../../../constant/colorset';

type Props = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'stroke'>;

const Reset20x20 = ({ width = 20, height = 20, stroke = COLOR.loversWhite }: Props) => (
  <svg width={width} height={height} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="&#236;&#131;&#136;&#235;&#161;&#156;&#234;&#179;&#160;&#236;&#185;&#168;">
      <path
        id="Path"
        d="M14.5297 7.28271C13.5227 5.86754 11.8692 4.94446 10 4.94446C6.93176 4.94446 4.44446 7.43176 4.44446 10.5C4.44446 13.5683 6.93176 16.0556 10 16.0556C13.0683 16.0556 15.5556 13.5683 15.5556 10.5"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        id="&#62;"
        d="M15.1 4.5L15.1 7.83333H11.7666"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default Reset20x20;
