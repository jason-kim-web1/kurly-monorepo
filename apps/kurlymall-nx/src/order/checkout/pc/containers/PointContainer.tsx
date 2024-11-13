import { css } from '@emotion/react';

import { useAppSelector } from '../../../../shared/store';
import useCheckoutPoint from '../../shared/hooks/useCheckoutPoint';

import COLOR from '../../../../shared/constant/colorset';
import { getPointMessage } from '../../shared/utils';

import usePlccPoint from '../../shared/hooks/usePlccPoint';

import { QuestionMark } from '../../../../shared/icons';

import InformationRow from '../../../../shared/components/layouts/InformationRow';
import PointUsage from '../components/PointUsage';
import PointMessage from '../components/PointMessage';
import { Title } from '../components/Title';
import PointInformationPopup from '../../shared/components/PointInformationPopup';
import useToggle from '../../shared/hooks/useToggle';
import { CheckoutType } from '../../../../shared/interfaces';

const styles = {
  layout: css`
    border-top: 1px solid ${COLOR.bg};
  `,
  title: css`
    justify-content: flex-start;
    gap: 8px;
  `,
};

export default function PointContainer() {
  const { isOpen, open, close } = useToggle();
  const { usedPoint, isEventProducts, isGiftCardOrder, isLiquidity } = useAppSelector(({ checkout }) => ({
    usedPoint: checkout.usedPoint,
    isEventProducts: checkout.isEventProducts,
    isGiftCardOrder: checkout.isGiftCardOrder,
    isLiquidity: checkout.checkoutType === CheckoutType.LIQUIDITY,
  }));
  const { selectedCoupon } = useAppSelector(({ checkoutCoupon }) => checkoutCoupon);
  const { availablePoint, changeTotalPoints, changePoints } = useCheckoutPoint();
  const { selectedPlccPoint } = usePlccPoint();

  const disabled = selectedCoupon && selectedCoupon.paymentGateways[0] !== 'ALL';
  const isAllowedPoint = selectedCoupon?.pointAllowed ?? true;
  const isDisabled = disabled || isEventProducts || !isAllowedPoint || selectedPlccPoint || isGiftCardOrder;

  const pointNotice = getPointMessage({
    disabled,
    selectedCoupon,
    isEventProducts,
    isAllowedPoint,
    selectedPlccPoint,
    isGiftCardOrder,
  });

  return (
    <>
      <Title title="적립금 · 컬리캐시" css={styles.title}>
        <QuestionMark onClick={() => open()} />
      </Title>
      <InformationRow title="적립금 · 컬리캐시" css={styles.layout}>
        <PointUsage
          usedPoint={usedPoint}
          availablePoint={availablePoint}
          disabled={isDisabled}
          onChange={changePoints}
          onClickTotalPoint={changeTotalPoints}
          isLiquidity={isLiquidity}
        />
        <PointMessage message={pointNotice} />
      </InformationRow>
      <PointInformationPopup isOpen={isOpen} onClose={() => close()} />
    </>
  );
}
