import styled from '@emotion/styled';

import COLOR from '../../shared/constant/colorset';

const GuideWrap = styled.div`
  padding: 20px 0 30px;
  font-size: 10px;
  line-height: 15px;
  text-align: center;
  background-color: ${COLOR.bgLightGray};
  color: ${COLOR.kurlyGray450};
`;

const CompanyCopyright = styled.em`
  display: block;
  padding-top: 7px;
  font-style: normal;
`;

export default function IndemnificationMessage() {
  return (
    <GuideWrap>
      컬리에서 판매되는 상품 중에는 컬리에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어
      있습니다.
      <br />
      마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다. 컬리는 해당 상품의
      주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.
      <CompanyCopyright>&copy; KURLY CORP. ALL RIGHTS RESERVED</CompanyCopyright>
    </GuideWrap>
  );
}