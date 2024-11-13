import styled from '@emotion/styled';

const GuideWrap = styled.div`
  padding: 12px 0 10px;
`;

const GuideText = styled.p`
  position: relative;
  font-size: 12px;
  line-height: 16px;
  color: #999;
  padding-left: 7px;
  &:before {
    content: '·';
    position: absolute;
    left: 0;
    top: 0;
  }
`;

export default function PaymentInfoMessage() {
  return (
    <GuideWrap>
      <GuideText>[주문완료] 상태일 경우에만 주문 취소 가능합니다.</GuideText>
      <GuideText>미성년자 결제 시 법정대리인이 거래를 취소할 수 있습니다.</GuideText>
      <GuideText>
        배송 불가 시, 결제수단으로 환불됩니다. 일부 또는 전체 상품이 품절 등의 사유로 배송 되지 못할 경우, 신속하게
        환불해 드리겠습니다.
      </GuideText>
      <GuideText>카카오페이, 토스, 네이버페이, 페이코 결제 시, 결제하신 수단으로만 환불됩니다.</GuideText>
    </GuideWrap>
  );
}
