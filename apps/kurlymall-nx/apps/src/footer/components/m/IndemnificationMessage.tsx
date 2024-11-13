import styled from '@emotion/styled';

const Guide = styled.p`
  padding: 24px 0;
  font-size: 10px;
  line-height: 16px;
`;

export default function IndemnificationMessage() {
  return (
    <Guide>
      컬리에서 판매되는 상품 중에는 컬리에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어
      있습니다. 마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다. 컬리는 해당
      상품의 주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.
    </Guide>
  );
}
