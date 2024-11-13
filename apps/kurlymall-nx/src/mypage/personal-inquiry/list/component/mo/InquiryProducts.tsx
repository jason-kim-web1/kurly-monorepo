import { useState } from 'react';

import { drop, isEmpty, take } from 'lodash';

import styled from '@emotion/styled';

import InquiryProduct from '../../../shared/components/InquiryProduct';
import MoreOrFoldButton from '../../../shared/components/MoreOrFoldButton';
import { MemberOrderProductData } from '../../../shared/types';
import SlideToggleWrapper from '../../../../../shared/components/motion/SlideToggleWrapper';

const MAX_PRODUCTS_COUNT = 3;

const Container = styled.div`
  margin: 12px 0;
  .inquiry-product-item {
    margin-bottom: 15px;
    display: flex;
    align-items: flex-start;
  }
`;

const MoreOrFoldButtonWrap = styled.div`
  margin-top: 18px;
`;

interface Props {
  products: MemberOrderProductData[];
}

export default function InquiryProducts({ products }: Props) {
  const [folded, setFolded] = useState(true);

  if (isEmpty(products)) {
    return null;
  }

  const handleClick = () => {
    setFolded((it) => !it);
  };

  return (
    <Container>
      {take(products, MAX_PRODUCTS_COUNT).map((product) => (
        <InquiryProduct
          key={product.dealProductNo}
          contentsProductName={product.contentsProductName}
          dealProductName={product.dealProductName}
          paymentAmount={product.paymentAmount}
          quantity={product.quantity}
          imageUrl={product.imageUrl}
        />
      ))}
      <SlideToggleWrapper opened={!folded}>
        {drop(products, MAX_PRODUCTS_COUNT).map((product) => (
          <InquiryProduct
            key={product.dealProductNo}
            contentsProductName={product.contentsProductName}
            dealProductName={product.dealProductName}
            paymentAmount={product.paymentAmount}
            quantity={product.quantity}
            imageUrl={product.imageUrl}
          />
        ))}
      </SlideToggleWrapper>
      {products.length > MAX_PRODUCTS_COUNT && (
        <MoreOrFoldButtonWrap>
          <MoreOrFoldButton folded={folded} onClickMore={handleClick} />
        </MoreOrFoldButtonWrap>
      )}
    </Container>
  );
}
