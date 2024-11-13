import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  margin-top: 10px;
  padding: 22px 20px 0;
  background-color: ${COLOR.kurlyWhite};
`;

const Title = styled.strong`
  display: block;
  padding-bottom: 8px;
  font-weight: 500;
`;

const InfoList = styled.ul`
  font-size: 12px;
  line-height: 1.4;
`;

const Item = styled.li`
  padding-top: 8px;
`;

const LinkInquiry = styled.a`
  color: ${COLOR.kurlyPurple};
`;

export default function MobileTopInfo() {
  return (
    <Container>
      <Title>대량주문 문의</Title>
      <InfoList>
        <Item>최소 구매금액 100만원 이상 시 해당 서비스를 이용하실 수 있습니다. ( 기준 충족 시 다중 배송 가능 )</Item>
        <Item>
          여러 주소지에 배송 주문 시, 주소지 1곳 당 결제금액이 4만원 미만일 경우 주소지당 개별 배송비가 발생 됩니다.
        </Item>
        <Item>
          문의를 남겨주시면 빠른 시간 내에 상담 전화 드립니다.
          <br />( <LinkInquiry href="tel:02-1644-1108">☎ 1644 - 1108</LinkInquiry>, 메일 :{' '}
          <LinkInquiry href="mailto:kurlygift@kurlycorp.com">kurlygift@kurlycorp.com</LinkInquiry> )
        </Item>
      </InfoList>
    </Container>
  );
}
