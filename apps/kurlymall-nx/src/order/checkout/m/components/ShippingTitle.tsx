import styled from '@emotion/styled';

import GuideTooltip from '../../shared/components/GuideTooltip';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  padding: 18px 20px;
`;

const Title = styled.h3`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

export default function ShippingTitle() {
  return (
    <Wrapper>
      <Title>배송지</Title>
      <GuideTooltip
        title="배송지 변경 안내"
        content={
          <>
            장바구니, 마이컬리에서
            <br /> 배송지를 변경할 수 있어요.
          </>
        }
      />
    </Wrapper>
  );
}
