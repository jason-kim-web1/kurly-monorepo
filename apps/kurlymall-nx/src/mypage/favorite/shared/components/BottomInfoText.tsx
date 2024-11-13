import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { isPC } from '../../../../../util/window/getDevice';

const Wrapper = styled.div`
  padding: ${isPC ? `24px 0px` : `16px`};

  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: calc(16px + constant(safe-area-inset-bottom));
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(16px + env(safe-area-inset-bottom));
  }
`;
const InfoText = styled.div`
  align-items: center;
  font-size: ${isPC ? 14 : 12}px;
  line-height: ${isPC ? 22 : 16}px;
  color: ${COLOR.kurlyGray450};
  background-color: ${COLOR.kurlyWhite};

  > p:first-of-type {
    padding-bottom: 4px;
  }

  > p::before {
    content: '';
    margin: 0 6px 3px 0;
    display: inline-block;
    background-color: ${COLOR.kurlyGray450};
    border-radius: 50%;
    width: 2px;
    height: 2px;
  }
`;

export default function BottomInfoText() {
  return (
    <Wrapper>
      <InfoText>
        <p>당일 기준 최근 12개월간 자주 구매한 상품 100개 리스트입니다.</p>
        <p>현재 판매되고 있는 상품 가격을 제공합니다.</p>
      </InfoText>
    </Wrapper>
  );
}
