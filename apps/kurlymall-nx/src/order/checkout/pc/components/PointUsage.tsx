import styled from '@emotion/styled';

import { addComma } from '../../../../shared/services';

import COLOR from '../../../../shared/constant/colorset';
import SubPriceIcon from '../../../../shared/components/icons/order/checkout/SubPriceIcon';
import PointUsageButton from './PointUsageButton';
import PointUsageInputBox from './PointUsageInputBox';
import { AvailablePoint } from '../../../../shared/interfaces';

const Wrapper = styled.div`
  padding: 13px 0 8px;
  width: 414px;
`;

const TotalPointWrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  padding-bottom: 8px;
  justify-content: space-between;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray400 : COLOR.kurlyGray800)};
`;

const PointListWrapper = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

const PointList = styled.div<{ disabled: boolean }>`
  display: flex;
  padding-bottom: 8px;
  justify-content: space-between;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray400 : COLOR.kurlyGray600)};
`;

const TotalLabel = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const TotalPoint = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const Lable = styled.span`
  display: flex;
  position: relative;
  align-items: center;
  flex-shrink: 0;
`;

const Field = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
`;

const Description = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.5px;
  color: ${COLOR.kurlyGray600};

  > p {
    padding-top: 4px;
  }
`;

const Bold = styled.span`
  font-weight: 500;
`;
interface Props {
  availablePoint: AvailablePoint;
  usedPoint: number;
  disabled?: boolean;
  onChange: (point: number) => void;
  onClickTotalPoint: () => void;
  isLiquidity: boolean;
}

export default function PointUsage({
  availablePoint,
  usedPoint,
  disabled = false,
  onChange,
  onClickTotalPoint,
  isLiquidity,
}: Props) {
  const { free, paid } = availablePoint;
  // NOTE: 환금성 상품은 컬리캐시만 사용 가능
  const total = isLiquidity ? paid : free + paid;
  const isDisabled = total <= 0 || disabled;

  return (
    <>
      <Wrapper>
        <TotalPointWrapper data-testid={'available-total-point'} disabled={isDisabled}>
          <TotalLabel>사용가능 잔액</TotalLabel>
          <TotalPoint>
            {addComma(total)} <TotalLabel>원</TotalLabel>
          </TotalPoint>
        </TotalPointWrapper>
        <PointListWrapper>
          <PointList disabled={isDisabled || isLiquidity}>
            <Lable>
              <SubPriceIcon />
              적립금{isLiquidity && ' (사용불가 상품)'}
            </Lable>
            {addComma(free)} 원
          </PointList>
          <PointList disabled={isDisabled}>
            <Lable>
              <SubPriceIcon />
              컬리캐시
            </Lable>
            {addComma(paid)} 원
          </PointList>
        </PointListWrapper>
      </Wrapper>
      <Field>
        <PointUsageInputBox usedPoint={usedPoint} onChange={onChange} isDisabled={isDisabled} />
        <PointUsageButton isDisabled={isDisabled} onClickTotalPoint={onClickTotalPoint} />
      </Field>
      {!disabled && (
        <Description>
          {isLiquidity ? '해당 상품은 적립금 사용이 불가능 합니다.' : '사용 시 적립금이 먼저 소진됩니다.'}
          <p>
            컬리캐시 사용 시 <Bold>컬리페이 간편결제만</Bold> 가능합니다.
          </p>
        </Description>
      )}
    </>
  );
}
