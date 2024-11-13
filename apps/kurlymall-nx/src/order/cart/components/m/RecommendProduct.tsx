import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import RecommendProductImage from './RecommendProductImage';
import RecommendProductDetail from './RecommendProductDetail';
import RecommendProductButton from './RecommendProductButton';

import { CartProduct } from '../../interface/CartProduct';
import { RecommendProductList } from '../../interface/RecommendProduct';

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ~ li {
    margin-top: ${vars.spacing.$12};
  }
`;

interface RecommendProductProps {
  product: RecommendProductList;
  addToCart: (product: RecommendProductList) => Promise<void>;
  availableProducts: CartProduct[];
}

export default function RecommendProduct({ product, addToCart, availableProducts }: RecommendProductProps) {
  const { dealProductName, productPrice, productVerticalSmallUrl, discountRate, labels } = product;

  return (
    <Wrapper>
      <RecommendProductImage imageUrl={productVerticalSmallUrl} productName={dealProductName} />
      <RecommendProductDetail
        labels={labels}
        discountRate={discountRate}
        price={productPrice}
        productName={dealProductName}
      />
      <RecommendProductButton product={product} addToCart={addToCart} availableProducts={availableProducts} />
    </Wrapper>
  );
}
