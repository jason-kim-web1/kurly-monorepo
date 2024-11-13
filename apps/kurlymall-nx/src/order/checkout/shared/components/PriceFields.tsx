import styled from '@emotion/styled';

import { addComma } from '../../../../shared/services';

import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;

const Head = styled.span`
  width: 100px;
  font-size: 16px;
  line-height: 24px;
  white-space: nowrap;
`;

const ContentWrapper = styled.span`
  min-width: 162px;
  text-align: right;
`;

const Amount = styled.span`
  font-size: 18px;
  line-height: 24px;
  text-align: right;
`;

const PaymentAmount = styled(Amount)`
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
`;

const Won = styled.span`
  padding-left: 2px;
  font-size: 16px;
  font-weight: normal;
  vertical-align: bottom;
`;

const Reason = styled.span`
  width: 162px;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: ${COLOR.kurlyPurple};
`;

const Description = styled(Reason)`
  display: block;
  width: auto;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
`;

export function ReservesPrice({
  price,
  description,
  showPlusSign,
  className,
}: {
  price: number;
  description: string;
  showPlusSign?: boolean;
  className?: string;
}) {
  if (!description) {
    return null;
  }

  return (
    <>
      <Wrapper>
        <Head>적립금</Head>
        <ContentWrapper>
          <Amount className={className}>
            {showPlusSign && '+'}
            {addComma(price)}
            <Won>원</Won>
          </Amount>
        </ContentWrapper>
      </Wrapper>
      <Description>적립금은 배송완료 7일후 적립 ({description})</Description>
    </>
  );
}

export function PaymentPrice({ price }: { price: number }) {
  return (
    <Wrapper>
      <Head>결제금액</Head>
      <PaymentAmount>
        {addComma(price)}
        <Won>원</Won>
      </PaymentAmount>
    </Wrapper>
  );
}
