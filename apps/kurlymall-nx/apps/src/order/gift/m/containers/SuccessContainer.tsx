import styled from '@emotion/styled';

import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';

import { addComma } from '../../../../shared/services';
import { useAppSelector } from '../../../../shared/store';
import { getOrderSuccessPolicy } from '../../../checkout/shared/utils/getCheckoutCompletePolicy';
import useCheckoutResult from '../../../shared/shared/hooks/useCheckoutResult';

import { Notification, NotificationType } from '../../shared/interfaces/ReceiverForm.interface';

import { ButtonProps } from '../../../../shared/components/Button/Button';
import ButtonGroup from '../../../../shared/components/Button/ButtonGroup';
import InformationList from '../../../../shared/components/InformationList/InformationList';
import GiftSuccessIcon from '../../../../shared/components/icons/order/gift/GiftSuccessIcon';
import GiftKakaoButton from '../../shared/components/GiftKaKaoButton';
import appService from '../../../../shared/services/app.service';
import { useWebview } from '../../../../shared/hooks';
import useEventLogPurchaseSuccess from '../../../checkout/shared/hooks/useEventLogPurchaseSuccess';
import CopyButton from '../../../../shared/components/Button/CopyButton';
import { ORDER_NO_SUCCESS_MESSAGE } from '../../../checkout/shared/constants/copy-alert-message';

export const GIFT_BUTTON_HEIGHT = 52;

const MainContent = styled.div<{ isShowButton: boolean }>`
  padding: 30px 20px;
  overflow-y: auto;
  padding-bottom: env(safe-area-inset-bottom));

  ${({ isShowButton }) =>
    isShowButton && `padding-bottom: calc(${GIFT_BUTTON_HEIGHT}px + env(safe-area-inset-bottom));`}
`;

const buttonStyles = css`
  button:first-of-type {
    > span {
      font-weight: 600;
    }
  }
`;

const MessageWrapper = styled.div`
  padding: 20px 0;
  text-align: center;
`;

const GuideMessage = styled.p<{ type?: NotificationType }>`
  font-size: 14px;
  color: ${COLOR.kurlyGray800};
  padding-top: 10px;
  ${({ type }) => type === Notification.SMS && `padding-bottom: 16px;`}
  line-height: 19px;
  font-weight: 600;
  text-align: center;
`;

const NameMessage = styled.p`
  font-size: 18px;
  color: ${COLOR.kurlyGray800};
`;

const OrderNoWrapper = styled.div`
  display: flex;
  border-radius: 6px;
  justify-content: center;
  padding: 17px 0px;
  gap: 4px;
  text-align: center;
  background-color: ${COLOR.kurlyGray100};
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${COLOR.bg};
  margin-top: 40px;
  padding-top: 16px;
  text-align: left;
`;

const Message = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR.kurlyGray800};
`;

const TotalPrice = styled.div`
  display: flex;
  flex-direction: row;
`;

const PolicyWrapper = styled.div`
  padding: 20px 0;
  margin-top: 20px;
  text-align: left;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  color: ${COLOR.kurlyGray800};
  margin-right: 4px;
`;

const KakaoButtonWrapper = styled.button`
  width: 100%;
`;

const OrderNo = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${COLOR.kurlyGray600};
`;

const Head = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: ${COLOR.kurlyGray600};
`;

export default function SuccessContainer() {
  const webview = useWebview();
  const {
    paymentsResult: { notificationType, recipientName, totalPrice },
  } = useAppSelector(({ payments }) => payments);
  const { moveGiftListPage, moveGiftProductPage, orderNo } = useCheckoutResult();
  const [isSendMessage, setIsSendMessage] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  const policyText = getOrderSuccessPolicy({ hasGiftOrder: true, notificationType });

  useEffect(() => {
    if (notificationType === Notification.SMS || isSendMessage) {
      setIsShowButton(true);
    }
  }, [isSendMessage, notificationType]);

  useEffect(() => {
    if (isSendMessage && webview) {
      appService.setNavigationButton({
        buttonType: 'close',
      });
    }
  }, [isSendMessage, webview]);

  useEffect(() => {
    if (orderNo && webview) {
      appService.postOrderSuccess({
        orderNumber: orderNo,
        amount: totalPrice,
      });
    }
  }, [orderNo, totalPrice, webview]);

  const GIFT_RESPONSE: ButtonProps[] = [
    {
      text: '선물 내역 보기',
      theme: 'tertiary',
      onClick: moveGiftListPage,
      height: 52,
    },
    {
      text: '계속 선물하기',
      onClick: moveGiftProductPage,
      height: 52,
    },
  ];

  useEventLogPurchaseSuccess();

  return (
    <MainContent isShowButton={isShowButton}>
      <GiftSuccessIcon />
      <MessageWrapper>
        <NameMessage>
          {recipientName}님을 위한
          <br />
          선물 주문이 완료되었습니다.
        </NameMessage>
      </MessageWrapper>
      {notificationType === Notification.SMS && (
        <GuideMessage type={notificationType}>받으실 분의 연락처로 선물이 발송되었습니다.</GuideMessage>
      )}
      <OrderNoWrapper>
        <Head>주문번호</Head>
        <OrderNo>{orderNo}</OrderNo>
        <CopyButton copyString={orderNo} message={ORDER_NO_SUCCESS_MESSAGE} />
      </OrderNoWrapper>
      {notificationType === Notification.KAKAO_TALK && (
        <KakaoButtonWrapper onClick={() => setIsSendMessage(true)}>
          <GiftKakaoButton />
          <GuideMessage>카카오톡에서 받으실 분을 선택해주세요.</GuideMessage>
        </KakaoButtonWrapper>
      )}
      <PriceWrapper>
        <Message>결제금액</Message>
        <TotalPrice>
          <Price>{addComma(totalPrice)}</Price>
          <Message>원</Message>
        </TotalPrice>
      </PriceWrapper>
      <PolicyWrapper>
        <InformationList size="small" contents={policyText} />
      </PolicyWrapper>
      {isShowButton && <ButtonGroup contents={GIFT_RESPONSE} css={buttonStyles} isFixed />}
    </MainContent>
  );
}
