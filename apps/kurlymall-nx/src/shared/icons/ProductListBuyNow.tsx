import type { SVGAttributes } from 'react';

type Props = Pick<SVGAttributes<SVGElement>, 'width' | 'height'>;

const ProductListBuyNow = ({ width = 18, height = 18 }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.30078" y="3.7" width="13.5" height="10.5" rx="1" stroke="#333333" />
      <path d="M1.80078 6.66055H16.1854" stroke="#333333" strokeLinejoin="round" />
      <path d="M4.49609 11.6H7.49609" stroke="#333333" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
};

export default ProductListBuyNow;
