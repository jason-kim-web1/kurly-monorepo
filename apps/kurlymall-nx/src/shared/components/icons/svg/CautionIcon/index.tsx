import type { SVGAttributes } from 'react';

import COLOR from '../../../../constant/colorset';

interface Props extends Pick<SVGAttributes<SVGElement>, 'width' | 'height'> {
  color?: string;
}

export const CautionIcon = ({ width = 50, height = 50, color = COLOR.kurlyGray250 }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M25 49C38.2548 49 49 38.2548 49 25C49 11.7452 38.2548 1 25 1C11.7452 1 1 11.7452 1 25C1 38.2548 11.7452 49 25 49Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25 13.5216C26.1526 13.5216 27.087 14.456 27.087 15.6086V27.0868C27.087 28.2394 26.1526 29.1738 25 29.1738C23.8474 29.1738 22.9131 28.2394 22.9131 27.0868V15.6086C22.9131 14.456 23.8474 13.5216 25 13.5216ZM25 32.3042C26.1526 32.3042 27.087 33.2386 27.087 34.3912C27.087 35.5438 26.1526 36.4781 25 36.4781C23.8474 36.4781 22.9131 35.5438 22.9131 34.3912C22.9131 33.2386 23.8474 32.3042 25 32.3042Z"
        fill={color}
      />
    </svg>
  );
};
