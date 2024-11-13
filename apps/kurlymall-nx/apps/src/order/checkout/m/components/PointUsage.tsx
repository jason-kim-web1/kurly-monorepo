import styled from '@emotion/styled';

import { addComma } from '../../../../shared/services';

import COLOR from '../../../../shared/constant/colorset';
import SubPriceIcon from '../../../../shared/components/icons/order/checkout/SubPriceIcon';
import PointUsageButton from './PointUsageButton';
import PointUsageInputBox from './PointUsageInputBox';
import { AvailablePoint } from '../../../../shared/interfaces';

const PointWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 18px;
`;

const BalanceField = styled.div<{ isDisabled: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  line-height: 21px;
  color: ${({ isDisabled }) => (isDisabled ? COLOR.kurlyGray400 : COLOR.kurlyGray800)};
  b {
    font-weight: 600;
  }
`;

const SubBalanceField = styled.div<{ isDisabled: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 14px;
  line-height: 19px;
  color: ${({ isDisabled }) => (isDisabled ? COLOR.kurlyGray400 : COLOR.kurlyGray600)};

  > div {
    display: flex;
    align-items: center;
  }
`;

const InputBoxWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const CashWrapper = styled.div`
  position: relative;
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
  usedPoint,
  availablePoint,
  disabled = false,
  onChange,
  onClickTotalPoint,
  isLiquidity,
}: Props) {
  const { free, paid } = availablePoint;
  // NOTE: 환금성 상품은 컬리캐시만 사용 가능함.
  const total = isLiquidity ? paid : free + paid;
  const isDisabled = total <= 0 || disabled;

  return (
    <>
      <PointWrapper>
        <BalanceField data-testid="available-total-point" isDisabled={isDisabled}>
          <span>사용가능 잔액</span>
          <span>
            <b>{addComma(total)}</b> 원
          </span>
        </BalanceField>
        <SubBalanceField isDisabled={isLiquidity || isDisabled}>
          <div>
            <SubPriceIcon />
            <span>적립금{isLiquidity && ' (사용불가 상품)'}</span>
          </div>
          {addComma(free)} 원
        </SubBalanceField>
        <SubBalanceField isDisabled={isDisabled}>
          <CashWrapper>
            <SubPriceIcon />
            <span>컬리캐시</span>
          </CashWrapper>
          {addComma(paid)} 원
        </SubBalanceField>
      </PointWrapper>
      <InputBoxWrapper>
        <PointUsageInputBox usedPoint={usedPoint} isDisabled={isDisabled} onChange={onChange} />
        <PointUsageButton isDisabled={isDisabled} onClickTotalPoint={onClickTotalPoint} />
      </InputBoxWrapper>
    </>
  );
}
