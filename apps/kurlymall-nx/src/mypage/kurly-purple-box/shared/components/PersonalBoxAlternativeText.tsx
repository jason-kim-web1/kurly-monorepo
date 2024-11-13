import styled from '@emotion/styled';

const Wrapper = styled.ul`
  overflow: hidden;
  position: absolute;
  width: 0;
  height: 0;
  z-index: -1;
`;

export default function PersonalBoxAlternativeText() {
  return (
    <Wrapper>
      <li>개인 보냉 박스 신청 방법. 주문 배송지가 샛별 배송 지역(수도권)인 경우 이용 신청이 가능해요.</li>
      <li>
        개인 보냉 박스 이용 방법
        <Wrapper>
          <li>개인 보냉 박스를 보유하고 계신 경우, 개인 보냉 박스 이용 신청이 가능해요</li>
          <li>이용 신청 후 컬리의 승인이 완료되면 상품 주문 시, 개인 보냉 박스로 상품을 받아볼 수 있어요.</li>
          <li>
            승인이 완료된 이후부터는 주문 배송지가 샛별 배송 지역(수도권)인 경우, 주문서 하단 포장 방법에서 개인 보냉
            박스를 선택할 수 있어요.
          </li>
        </Wrapper>
      </li>
    </Wrapper>
  );
}
