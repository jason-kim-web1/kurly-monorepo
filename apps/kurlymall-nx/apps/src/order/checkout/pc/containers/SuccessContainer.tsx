import styled from '@emotion/styled';

import { useEffect } from 'react';

import { useAppSelector } from '../../../../shared/store';

import useCheckoutResult from '../../../shared/shared/hooks/useCheckoutResult';
import useEventLogPurchaseSuccess from '../../shared/hooks/useEventLogPurchaseSuccess';

import COLOR from '../../../../shared/constant/colorset';
import { getOrderSuccessPolicy } from '../../shared/utils/getCheckoutCompletePolicy';
import { getBenefitsText } from '../../../../shared/utils/member';

import OrderEndMessage from '../../shared/components/OrderEndMessage';
import PaymentResult from '../../shared/components/PaymentResult';
import KurlyPurpleBoxBanner from '../../shared/components/KurlyPurpleBoxBanner';
import Button from '../../../../shared/components/Button/Button';
import InformationList from '../../../../shared/components/InformationList/InformationList';
import MemberShipBannerContainer from '../../shared/containers/MemberShipBannerContainer';
import PlccBanner from '../../shared/components/PlccBanner';
import { isValidDeliveryPolicy } from '../../shared/utils/isValidDeliveryPolicy';
import { CART_DELIVERY_TYPE } from '../../../cart/constants/CartDeliveryType';

const Container = styled.div`
  position: relative;
  width: 400px;
  padding: 30px;
  margin: 0 auto;
  background: ${COLOR.kurlyWhite};
  text-align: center;
`;

const GuideWrap = styled.div`
  padding: 20px 0;
  text-align: left;
`;

const BannerWrapper = styled.div`
  margin-top: 32px;
  > div ~ div {
    margin-top: 12px;
  }
`;

const ButtonWrapper = styled.div`
  button + button {
    margin-top: 10px;
  }
`;

const styles = {
  buttonRadius: {
    borderRadius: '3px',
  },
};

export default function SuccessContainer() {
  const isUseAllPoint = useAppSelector(({ checkout }) => checkout.isUseAllPoint);
  const pointBenefit = useAppSelector(({ member }) => member.pointBenefit);

  const {
    name,
    address,
    addressDetail,
    totalPrice,
    expectedPoint,
    displayMessages,
    totalUsedPoint,
    reusablePackageType,
    isViewPackage,
    isKurlypayPlccMember,
    isDeliveryOrder,
    orderDealProducts,
  } = useAppSelector(({ payments }) => payments.paymentsResult);

  useEffect(() => {
    if (!totalUsedPoint) {
      return;
    }
  }, [totalUsedPoint]);

  const { moveHomePage, moveOrderListPage, orderNo } = useCheckoutResult();

  const hasPickupOrder = isValidDeliveryPolicy({
    validDeliveryPolicy: CART_DELIVERY_TYPE.SELF_PICKUP_WINE,
    orderDealProducts,
  });
  const policyText = getOrderSuccessPolicy({ hasPickupOrder, isDeliveryOrder });

  useEventLogPurchaseSuccess();

  return (
    <Container>
      <OrderEndMessage name={name} displayMessages={displayMessages} />
      {/* 첫 구매 혜택, 주문 번호, 주소, 결제 금액 영역 */}
      <PaymentResult
        orderNo={orderNo}
        address={address}
        addressDetail={addressDetail}
        price={totalPrice}
        expectedPoint={expectedPoint}
        description={getBenefitsText(pointBenefit)}
        showReservesPrice={!isUseAllPoint && expectedPoint !== 0}
        isDeliveryOrder={isDeliveryOrder}
      />
      <BannerWrapper>
        {/* PLCC 띠배너 */}
        {!isKurlypayPlccMember && <PlccBanner />}
        {/* 컬리 퍼플 박스 띠배너 */}
        <KurlyPurpleBoxBanner reusablePackageType={reusablePackageType} isViewPackage={isViewPackage} />
        {/* 로레알 멤버쉽 연동 */}
        <MemberShipBannerContainer />
      </BannerWrapper>
      <GuideWrap>
        <InformationList size="medium" contents={policyText} />
      </GuideWrap>
      <ButtonWrapper>
        <Button theme="tertiary" text={'주문 상세보기'} onClick={moveOrderListPage} css={styles.buttonRadius} />
        <Button text="쇼핑 계속하기" onClick={moveHomePage} css={styles.buttonRadius} />
      </ButtonWrapper>
    </Container>
  );
}
