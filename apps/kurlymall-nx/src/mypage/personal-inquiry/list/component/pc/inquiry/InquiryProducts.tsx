import { useState } from 'react';

import { drop, isEmpty, take } from 'lodash';

import styled from '@emotion/styled';

import { MemberOrderProductData } from '../../../../shared/types';

import InquiryProduct from './InquiryProduct';
import ShowMoreButton from '../../../../form/components/shared/ShowMoreButton';
import COLOR from '../../../../../../shared/constant/colorset';
import SlideToggleWrapper from '../../../../../../shared/components/motion/SlideToggleWrapper';

const MAX_PRODUCTS_COUNT = 3;

const Container = styled.div`
  margin-top: 4px;
`;

const MoreOrFoldButtonWrap = styled.div`
  margin-bottom: 10px;
  > div {
    margin: 8px 0 12px;
    color: ${COLOR.kurlyGray450};
    > button {
      font-size: 12px;
      line-height: 20px;
      margin: 0;
      > span:first-of-type {
        margin-right: 6px;
        + span {
          width: 10px;
        }
      }
    }
  }
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
          <ShowMoreButton onClick={handleClick} folded={folded} />
        </MoreOrFoldButtonWrap>
      )}
    </Container>
  );
}
