import styled from '@emotion/styled';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';
import Info from '../../../../shared/icons/Info';
import { CheckoutType } from '../../../../shared/interfaces';

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  padding-top: ${isPC ? 14 : 12}px;
  font-size: 12px;
  font-weight: ${isPC ? 500 : 600};
  line-height: 16px;
  color: ${COLOR.loversLavender};
  svg {
    margin-right: 5.5px;
  }
`;

export const PaymentDescription = ({ checkoutType }: { checkoutType: CheckoutType }) => {
  if (checkoutType === CheckoutType.NORMAL) {
    return null;
  }

  return (
    <Wrapper>
      <Info width={11} height={11} fill={COLOR.loversLavender} />
      {checkoutType === CheckoutType.GIFT_CARD && '컬리페이 계좌결제만 가능한 상품입니다.'}
      {checkoutType === CheckoutType.LIQUIDITY &&
        '컬리페이 계좌 및 일부 카드(신한/농협/비씨/우리) 결제만 가능한 상품입니다.'}
    </Wrapper>
  );
};
