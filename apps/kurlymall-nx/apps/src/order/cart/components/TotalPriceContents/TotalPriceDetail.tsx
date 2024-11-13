import styled from '@emotion/styled';

import OriginalPrice from './OriginalPrice';
import DiscountPrice from './DiscountPrice';
import ShippingPrice from './ShippingPrice';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ~ div {
    margin-top: 12px;
  }
`;

export default function TotalPriceDetail() {
  return (
    <>
      <Wrapper>
        <OriginalPrice />
      </Wrapper>

      <Wrapper>
        <DiscountPrice />
      </Wrapper>

      <Wrapper>
        <ShippingPrice />
      </Wrapper>
    </>
  );
}
