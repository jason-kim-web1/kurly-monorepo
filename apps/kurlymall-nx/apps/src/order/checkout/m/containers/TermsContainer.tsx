import { memo } from 'react';
import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { useAppSelector } from '../../../../shared/store';
import CheckoutTerms from '../../../shared/shared/components/CheckoutTerms';

const Wrapper = styled.div`
  padding: 0 20px;
`;

const MessageWrapper = styled.div`
  padding: 16px 0 12px;
`;

const IndemnificationMessage = styled.p`
  padding-left: 12px;
  font-size: 13px;
  line-height: 18px;
  color: ${COLOR.kurlyGray450};
  &:before {
    display: inline-block;
    width: 3px;
    height: 3px;
    margin: 8px 9px 0 -12px;
    background: ${COLOR.kurlyGray350};
    vertical-align: top;
    border-radius: 50%;
    content: '';
  }

  + p {
    padding-top: 4px;
  }
`;

function TermsContainer() {
  const isGiftOrder = useAppSelector(({ checkout }) => checkout.isGiftOrder);

  return (
    <Wrapper>
      <MessageWrapper>
        <IndemnificationMessage>
          {isGiftOrder ? "직접 주문취소는 '선물 수락 대기' 상태에서만 " : '[주문완료] 상태일 경우에만 주문 취소가 '}
          가능하며, 상품 미배송 시 결제하신 수단으로 환불 됩니다.
        </IndemnificationMessage>
        <IndemnificationMessage>
          컬리 내 개별 판매자가 등록한 오픈마켓 상품의 경우 컬리는 통신판매중개자로서 주문, 품질, 교환/환불 등 의무와
          책임을 부담하지 않습니다.
        </IndemnificationMessage>
      </MessageWrapper>
      <CheckoutTerms />
    </Wrapper>
  );
}

export default memo(TermsContainer);
