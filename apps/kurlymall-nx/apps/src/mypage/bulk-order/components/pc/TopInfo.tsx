import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const InfoList = styled.ul`
  margin: -10px 0 30px;
`;

const Item = styled.li`
  line-height: 22px;
  color: ${COLOR.kurlyGray800};
`;

const LinkInquiry = styled.a``;

export default function TopInfo() {
  return (
    <InfoList>
      <Item>· 최소 구매금액 100만원 이상 시 해당 서비스를 이용하실 수 있습니다. ( 기준 충족 시 다중 배송 가능 )</Item>
      <Item>
        · 여러 주소지에 배송 주문 시, 주소지 1곳 당 결제금액이 4만원 미만일 경우 주소지당 개별 배송비가 발생 됩니다.
      </Item>
      <Item>
        · 문의를 남겨주시면 빠른 시간 내에 상담 전화 드립니다. ( ☎ 1644 - 1108, 메일 :{' '}
        <LinkInquiry href="mailto:kurlygift@kurlycorp.com">kurlygift@kurlycorp.com</LinkInquiry> )
      </Item>
    </InfoList>
  );
}
