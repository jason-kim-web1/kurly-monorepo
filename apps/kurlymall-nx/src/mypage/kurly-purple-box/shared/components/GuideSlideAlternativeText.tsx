import styled from '@emotion/styled';

const Wrapper = styled.ul`
  overflow: hidden;
  position: absolute;
  width: 0;
  height: 0;
  z-index: -1;
`;

export default function GuideSlideAlternativeText() {
  return (
    <Wrapper>
      <li>냉장, 냉동 제품은 컬리 퍼플 박스 안에, 상온 제품은 일회용 포장재에 담아 배송해 드려요.</li>
      <li>
        상품의 위생과 파손 방지를 위해 냉장, 냉동 상품은 비닐에 포장해 배송 매니저님이 문 앞에서 컬리 퍼플 박스에
        담아드려요.
      </li>
      <li>디바이더로 섹션을 나누어 냉장, 냉동 제품을 함께 보관할 수 있어요.</li>
      <li>비닐에 담긴 냉장, 냉동 상품을 꺼내 간편하게 냉장고 정리를 할 수 있어요.</li>
      <li>정리가 끝난 컬리 퍼플 박스. 사용하지 않을 땐 접어서 보관하세요.</li>
    </Wrapper>
  );
}
