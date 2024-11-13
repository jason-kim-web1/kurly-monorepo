import { ReactNode } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { addComma, prefixMinus, prefixPlus } from '../../../../shared/services';

import COLOR from '../../../../shared/constant/colorset';
import SubPriceIcon from '../../../../shared/components/icons/order/checkout/SubPriceIcon';

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 16px;
  color: ${COLOR.kurlyGray800};
  &:first-of-type {
    margin-top: 0px;
  }
`;

const Title = styled.div`
  min-width: 96px;
`;

const Price = styled.span`
  font-size: 18px;
`;

const SubPriceWrap = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${COLOR.kurlyGray450};

  ${Price} {
    font-size: 14px;
  }
`;

const Currency = styled.span`
  margin-left: 4px;
`;

const TotalPriceWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding: 16px 0 1px;
  border-top: 1px solid ${COLOR.bg};
  font-size: 16px;
  color: ${COLOR.kurlyGray700};

  ${Title} {
    display: flex;
    flex-shrink: 0;
    font-weight: 400;
  }

  ${Price} {
    font-size: 22px;
    font-weight: bold;
  }
`;

const Point = styled.div`
  font-weight: 500;
  margin-left: 4px;
`;

const PointWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 15px;
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
`;

const PointIcon = styled.span`
  display: inline-block;
  margin-right: 4px;
  padding: 0 7px;
  border-radius: 9px;
  background-color: ${COLOR.point};
  font-size: 10px;
  line-height: 18px;
  height: 18px;
  color: ${COLOR.kurlyWhite};
  font-weight: 500;
`;

const Prefix = styled.span`
  display: inline-block;
  margin-right: 4px;
`;

export const FreeDeliveryMessage = styled.p`
  color: ${COLOR.kurlyPurple};
  font-size: 14px;
`;

const AccruedPointText = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 6px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.5px;
  color: ${COLOR.loversLavender};
`;

const TitleWrapper = styled.div`
  display: flex;
`;

export const pointTextStyle = css`
  color: ${COLOR.pointText};
`;

export function PriceField({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode | ReactNode[];
  className?: string;
}) {
  return (
    <Wrap className={className}>
      <Title>{title}</Title>
      {children}
    </Wrap>
  );
}

export function SubPriceField({ title, children }: { title: string; children: ReactNode }) {
  return (
    <SubPriceWrap>
      <TitleWrapper>
        <SubPriceIcon />
        <Title>{title}</Title>
      </TitleWrapper>
      {children}
    </SubPriceWrap>
  );
}

export function Content({
  className,
  amount,
  prefix,
}: {
  className?: string;
  amount: number;
  prefix?: typeof prefixMinus | typeof prefixPlus;
}) {
  return (
    <div className={className}>
      <Price>
        <Prefix>{prefix && prefix(amount)}</Prefix>
        {addComma(amount)}
      </Price>
      <Currency>원</Currency>
    </div>
  );
}

export function FinalPrice({ amount }: { amount: number }) {
  return (
    <TotalPriceWrap>
      <Title>최종결제금액</Title>
      <Content amount={amount} />
    </TotalPriceWrap>
  );
}

export function ExpectedPoint({ expectedPoint, ratio }: { expectedPoint: number; ratio?: number }) {
  return (
    <PointWrap>
      <PointIcon>적립</PointIcon>
      구매 시
      <Point>
        {addComma(expectedPoint)}
        원(
        {ratio}
        %)
      </Point>
    </PointWrap>
  );
}

export function KurlycardAccruedPoint({ accruedPoint }: { accruedPoint: number }) {
  if (!accruedPoint) {
    return null;
  }

  return <AccruedPointText>컬리카드 결제 시 최대 {addComma(accruedPoint)}원 추가 적립</AccruedPointText>;
}
