import { DealProduct } from '../../../../types';

import CartOptionItem from './Item/CartOptionItem';
import ProductInfoItemWrapper from '../ProductInfoItemWrapper';

interface Props {
  contentNo: number;
  dealProduct: DealProduct;
  isPurchaseStatus: boolean;
  isSoldOut: boolean;
}

export default function SingleDeal({ contentNo, dealProduct, isPurchaseStatus, isSoldOut }: Props) {
  if (!isPurchaseStatus || isSoldOut) {
    return null;
  }

  return (
    <ProductInfoItemWrapper title="상품선택">
      <CartOptionItem contentNo={contentNo} dealProduct={dealProduct} displayRemove={false} />
    </ProductInfoItemWrapper>
  );
}
