import styled from '@emotion/styled';

import { useEffect } from 'react';

import { useAppSelector } from '../../../../shared/store';

import useCheckoutResult from '../../../shared/shared/hooks/useCheckoutResult';
import useEventLogPurchaseSuccess from '../../shared/hooks/useEventLogPurchaseSuccess';

import { isWebview } from '../../../../../util/window/getDevice';

import { getOrderSuccessPolicy } from '../../shared/utils/getCheckoutCompletePolicy';
import { getBenefitsText } from '../../../../shared/utils/member';

import { ButtonProps } from '../../../../shared/components/Button/Button';
import PaymentResult from '../../shared/components/PaymentResult';
import OrderEndMessage from '../../shared/components/OrderEndMessage';
import KurlyPurpleBoxBanner from '../../shared/components/KurlyPurpleBoxBanner';
import InformationList from '../../../../shared/components/InformationList/InformationList';
import ButtonGroup from '../../../../shared/components/Button/ButtonGroup';
import MobileFooter from '../../../../shared/components/layouts/MobileFooter';
import appService from '../../../../shared/services/app.service';
import MemberShipBannerContainer from '../../shared/containers/MemberShipBannerContainer';
import PlccBanner from '../../shared/components/PlccBanner';
import useCheckoutResultPush from '../../../shared/shared/hooks/useCheckoutResultPush';
import { isValidDeliveryPolicy } from '../../shared/utils/isValidDeliveryPolicy';
import { CART_DELIVERY_TYPE } from '../../../cart/constants/CartDeliveryType';

const MainContent = styled.div`
  padding: 0 20px 52px;
  overflow-y: auto;
`;

const BannerWrapper = styled.div`
  margin-top: 32px;
  > div ~ div {
    margin-top: 12px;
  }
`;

const GuideWrap = styled.div`
  padding: 20px 0;
  text-align: left;
`;

const buttonStyles = {
  'button:first-of-type': {
    '> span': {
      fontWeight: 600,
    },
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
    isDeliveryOrder,
    totalUsedPoint,
    reusablePackageType,
    isViewPackage,
    isKurlypayPlccMember,
    orderDealProducts,
  } = useAppSelector(({ payments }) => payments.paymentsResult);

  useEffect(() => {
    if (!totalUsedPoint) {
      return;
    }
  }, [totalUsedPoint]);

  const { moveHomePage, moveOrderListPage, orderNo } = useCheckoutResult();

  const MEMBER_RESPONSE: ButtonProps[] = [
    {
      text: '주문 상세보기',
      theme: 'tertiary',
      onClick: moveOrderListPage,
      height: 52,
    },
    {
      text: '쇼핑 계속하기',
      onClick: moveHomePage,
      height: 52,
    },
  ];

  const hasPickupOrder = isValidDeliveryPolicy({
    validDeliveryPolicy: CART_DELIVERY_TYPE.SELF_PICKUP_WINE,
    orderDealProducts,
  });

  const policyText = getOrderSuccessPolicy({ hasPickupOrder, isDeliveryOrder });

  useEventLogPurchaseSuccess();
  useCheckoutResultPush({ orderNo, isDeliveryOrder, orderDealProducts });

  useEffect(() => {
    if (isWebview() && orderNo) {
      appService.postOrderSuccess({
        orderNumber: orderNo,
        amount: totalPrice,
      });
    }
  }, [orderNo, totalPrice]);

  return (
    <>
      <MainContent>
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
      </MainContent>
      <MobileFooter transparent height={0}>
        <ButtonGroup contents={MEMBER_RESPONSE} css={buttonStyles} />
      </MobileFooter>
    </>
  );
}
