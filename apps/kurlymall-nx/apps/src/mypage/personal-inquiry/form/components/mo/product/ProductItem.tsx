import styled from '@emotion/styled';

import Checkbox from '../../../../../../shared/components/Input/Checkbox';
import InquiryProduct from '../../../../shared/components/InquiryProduct';
import { MemberOrderProduct } from '../../../../shared/types';
import useOrderProductItem from '../../../../hook/useOrderProductItem';

const Container = styled.div({
  height: '4.625rem',
  alignItems: 'center',
  display: 'flex',
});

const CheckboxWrap = styled.div({
  marginRight: '.25rem',
});

const InquiryProductWrap = styled.div({
  width: '100%',
});

interface Props {
  product: MemberOrderProduct;
}

export default function ProductItem({ product }: Props) {
  const { toggleSelect, selectionEnabled } = useOrderProductItem(product);

  return (
    <Container>
      <CheckboxWrap>
        <Checkbox label="" checked={product.selected} onChange={toggleSelect} disabled={!selectionEnabled} />
      </CheckboxWrap>
      <InquiryProductWrap>
        <InquiryProduct
          contentsProductName={product.contentsProductName}
          dealProductName={product.dealProductName}
          paymentAmount={product.paymentAmount}
          quantity={product.quantity}
          imageUrl={product.imageUrl}
        />
      </InquiryProductWrap>
    </Container>
  );
}
