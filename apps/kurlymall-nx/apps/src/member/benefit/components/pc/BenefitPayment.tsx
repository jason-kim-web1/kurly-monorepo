import styled from '@emotion/styled';

const Container = styled.div``;

const Link = styled.a`
  display: table;
  width: 100%;
  position: relative;
  margin-bottom: 12px;
  padding: 15px 0 15px 25px;
  border-radius: 8px;
  font-weight: 300;
  font-size: 14px;
  background-color: #eee;
  letter-spacing: -0.6px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Cell = styled.span`
  display: table-cell;
  line-height: 1.2;
  letter-spacing: -0.4px;
  vertical-align: middle;

  &:first-of-type {
    width: 85px;
  }
  &:last-of-type {
    width: 50px;
  }
`;

const Icon = styled.img`
  width: 56px;
  height: 56px;
  background-size: 56px 56px;
  border-radius: 4px;
  vertical-align: middle;
`;

const Title = styled.strong`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 16px;
  color: #282828;
`;

const ArrowIcon = styled.span`
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: middle;
  background: url('https://res.kurly.com/images/event/fixed/common/ico-arr-b.svg') no-repeat;
`;

export default function TotalPayment() {
  return (
    <Container>
      <Link href="#none">
        <Cell>
          <Icon src="https://res.kurly.com/images/event/fixed/common/thum-kakaopay.png" alt="" />
        </Cell>
        <Cell>
          <Title>카카오페이</Title>
          7만원 이상 결제 시 4천원 즉시할인
        </Cell>
        <Cell>
          <ArrowIcon />
        </Cell>
      </Link>
    </Container>
  );
}
