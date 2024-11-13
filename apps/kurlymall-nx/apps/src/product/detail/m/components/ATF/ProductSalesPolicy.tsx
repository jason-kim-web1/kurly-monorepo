import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

import ProductInfoItem from './ProductInfoList/ProductInfoItem';

const ProductSalesPolicyWrapper = styled.div`
  padding: 10px 16px 24px;
  border-top: 1px solid ${COLOR.bg};
`;

interface Props {
  deliveryName: string;
  deliveryGuide: string;
  sellerName: string;
}

export default function ProductSalesPolicy({ deliveryName, deliveryGuide, sellerName }: Props) {
  return (
    <ProductSalesPolicyWrapper>
      {!!deliveryName && <ProductInfoItem title="배송" value={deliveryName} subText={deliveryGuide} />}
      {sellerName && <ProductInfoItem title="판매자" value={sellerName} />}
    </ProductSalesPolicyWrapper>
  );
}
