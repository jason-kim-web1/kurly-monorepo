import styled from '@emotion/styled';
import { isEmpty } from 'lodash';

import { useAppSelector } from '../../../../shared/store';
import useCheckoutPoint from '../../shared/hooks/useCheckoutPoint';

import { getPointMessage } from '../../shared/utils';

import useToggle from '../../shared/hooks/useToggle';
import usePlccPoint from '../../shared/hooks/usePlccPoint';

import COLOR from '../../../../shared/constant/colorset';

import { QuestionMark } from '../../../../shared/icons';

import { Panel } from '../../../../shared/components/Panel';
import PointInformationPopup from '../../shared/components/PointInformationPopup';
import PointUsage from '../components/PointUsage';
import PointMessage from '../components/PointMessage';
import { Divider } from '../../../../shared/components/Divider/Divider';
import { CheckoutType } from '../../../../shared/interfaces';

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

const PointPanel = styled(Panel)`
  > div {
    :first-of-type {
      gap: 3px;
    }
    justify-content: flex-start;
  }
`;

const Description = styled.p`
  font-size: 13px;
  color: ${COLOR.kurlyGray450};
  line-height: 18px;

  :first-of-type {
    padding-bottom: 2px;
  }

  > span {
    margin-right: 8px;
  }

  > b {
    color: ${COLOR.kurlyGray600};
    font-weight: 600;
  }
`;

const Descriptions = ({ isLiquidity }: { isLiquidity: boolean }) => (
  <DescriptionWrapper>
    <Description>
      <span>·</span>
      {isLiquidity ? '해당 상품은 적립금 사용이 불가능 합니다.' : '사용시 적립금이 먼저 소진됩니다.'}
    </Description>
    <Description>
      <span>·</span>컬리캐시 사용 시 <b>컬리페이 간편결제만</b> 가능합니다.
    </Description>
  </DescriptionWrapper>
);

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
      <PointPanel title={'적립금 · 컬리캐시'} headerContent={<QuestionMark onClick={open} />}>
        <PointUsage
          usedPoint={usedPoint}
          availablePoint={availablePoint}
          disabled={isDisabled}
          onChange={changePoints}
          onClickTotalPoint={changeTotalPoints}
          isLiquidity={isLiquidity}
        />
        {isEmpty(pointNotice) ? <Descriptions isLiquidity={isLiquidity} /> : <PointMessage message={pointNotice} />}
      </PointPanel>
      <Divider />
      <PointInformationPopup isOpen={isOpen} onClose={close} />
    </>
  );
}
