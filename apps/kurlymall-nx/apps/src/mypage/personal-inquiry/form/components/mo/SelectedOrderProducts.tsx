import styled from '@emotion/styled';

import { useState } from 'react';

import { drop, take } from 'lodash';

import InquiryProduct from '../../../shared/components/InquiryProduct';
import CloseButton from '../../../../../shared/components/Button/CloseButton';
import { MemberOrderProduct } from '../../../shared/types';
import MoreOrFoldButton from '../../../shared/components/MoreOrFoldButton';
import SlideToggleWrapper from '../../../../../shared/components/motion/SlideToggleWrapper';

const Container = styled.div`
  margin-bottom: 1.4rem;
`;

const InquiryProductWrap = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const MoreOrFoldButtonWrap = styled.div`
  margin-top: 1.4rem;
`;

const styles = {
  closeButton: {
    span: {
      width: '35px',
      height: '35px',
    },
  },
};

const DEFAULT_PRODUCT_DISPLAY_COUNT = 3;

interface Props {
  products: Array<MemberOrderProduct>;
  displayDeselectButton: boolean;
  onDeselectProduct(product: MemberOrderProduct): void;
}

export default function SelectedOrderProducts({ products, displayDeselectButton, onDeselectProduct }: Props) {
  const [folded, setFolded] = useState(true);

  const handleDeselectProduct = (product: MemberOrderProduct) => () => {
    onDeselectProduct(product);
  };

  const handleClickShowMore = () => {
    setFolded(!folded);
  };

  return (
    <Container>
      {take(products, DEFAULT_PRODUCT_DISPLAY_COUNT).map((product) => (
        <InquiryProductWrap key={product.dealProductNo}>
          <InquiryProduct
            contentsProductName={product.contentsProductName}
            dealProductName={product.dealProductName}
            paymentAmount={product.paymentAmount}
            quantity={product.quantity}
            imageUrl={product.imageUrl}
          />
          {displayDeselectButton && <CloseButton onClick={handleDeselectProduct(product)} css={styles.closeButton} />}
        </InquiryProductWrap>
      ))}
      <SlideToggleWrapper opened={!folded}>
        {drop(products, DEFAULT_PRODUCT_DISPLAY_COUNT).map((product) => (
          <InquiryProductWrap key={product.dealProductNo}>
            <InquiryProduct
              contentsProductName={product.contentsProductName}
              dealProductName={product.dealProductName}
              paymentAmount={product.paymentAmount}
              quantity={product.quantity}
              imageUrl={product.imageUrl}
            />
            {displayDeselectButton && <CloseButton onClick={handleDeselectProduct(product)} css={styles.closeButton} />}
          </InquiryProductWrap>
        ))}
      </SlideToggleWrapper>
      {products.length > DEFAULT_PRODUCT_DISPLAY_COUNT && (
        <MoreOrFoldButtonWrap>
          <MoreOrFoldButton folded={folded} onClickMore={handleClickShowMore} />
        </MoreOrFoldButtonWrap>
      )}
    </Container>
  );
}
