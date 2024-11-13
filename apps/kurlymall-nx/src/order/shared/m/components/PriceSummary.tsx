import { ReactNode } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { addComma, prefixMinus, prefixPlus } from '../../../../shared/services';

import COLOR from '../../../../shared/constant/colorset';
import SubPriceIcon from '../../../../shared/components/icons/order/checkout/SubPriceIcon';

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
  font-size: 16px;
  color: ${COLOR.kurlyGray800};
`;

const Title = styled.div``;

const Price = styled.span`
  font-size: 18px;
`;

const SubPriceWrap = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  font-size: 14px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
  > div {
    display: flex;
  }
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
  margin-top: 12px;
  padding: 21px 0 0;
  border-top: 1px solid ${COLOR.bg};
  font-size: 16px;
  line-height: 21px;

  ${Title} {
    font-weight: 600;
  }

  ${Price} {
    font-size: 20px;
    line-height: 25px;
    font-weight: bold;
  }
`;

const Point = styled.div`
  font-weight: 600;
  margin-left: 4px;
`;

const PointWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
`;

const PointIcon = styled.span`
  display: inline-block;
  margin-right: 6px;
  padding: 4px 7px;
  border-radius: 9px;
  background-color: ${COLOR.point};
  font-size: 10px;
  font-weight: 600;
  color: ${COLOR.kurlyWhite};
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
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.loversLavender};
`;

export const pointTextStyle = css`
  color: ${COLOR.pointText};
`;

export function PriceField({ title, children }: { title: string; children: ReactNode | ReactNode[] }) {
  return (
    <Wrap>
      <div>{title}</div>
      {children}
    </Wrap>
  );
}

export function SubPriceField({ title, children }: { title: string; children: ReactNode }) {
  return (
    <SubPriceWrap>
      <div>
        <SubPriceIcon />
        {title}
      </div>
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
        {prefix && prefix(amount)}
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
