import { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

export default function SearchIcon({
  width = 44,
  height = 44,
  stroke = `${COLOR.kurlyGray800}`,
}: Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'stroke'>) {
  return (
    <svg width={width} height={height} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.1 20.8022C27.1 23.1022 26.1 25.1022 24.5 26.4022C23.2 27.5022 21.6 28.1022 19.8 28.1022C15.7 28.1022 12.5 24.8022 12.5 20.8022C12.5 16.7022 15.8 13.5022 19.8 13.5022C23.8 13.4022 27.1 16.7022 27.1 20.8022Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path d="M30.5 31.5L25.5 26.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}
