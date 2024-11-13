import type { SVGAttributes } from 'react';

import COLOR from '../constant/colorset';

type Props = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'color'>;

const ProductListRestockNotify = ({ width = 18, height = 18, color = COLOR.kurlyGray800 }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.19922 12.6646C7.19922 13.6587 8.00511 14.4646 8.99922 14.4646C9.99333 14.4646 10.7992 13.6587 10.7992 12.6646"
        fill="#ffffff"
        stroke={color}
      />
      <path
        fill="#ffffff"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4003 12.2788H3.60156L3.60833 12.2621C3.6495 12.1897 3.86304 11.8823 4.24894 11.3398L4.6541 10.7722V7.18949C4.6541 4.76778 6.51079 2.79393 8.83422 2.70344L9.00095 2.70019C11.4016 2.70019 13.3478 4.71012 13.3478 7.18949V10.7722L14.2696 12.0743C14.3631 12.2106 14.4067 12.2788 14.4003 12.2788Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ProductListRestockNotify;
