import { useDispatch } from 'react-redux';

import moment from 'moment';

import { useState, useEffect } from 'react';

import { isMobileDevice, isPC } from '../../../../../../util/window/getDevice';

import { postResendMessage, setMessageTimeCheck } from '../../reducers/mypage-gift.slice';
import { useAppSelector } from '../../../../../shared/store';

import GiftInfo from './GiftInfo';
import Receiver from './Receiver';
import PayInfo from './PayInfo';
import OrderInfo from './OrderInfo';
import AdditionalInfo from './AdditionalInfo';
import Inquiry from './Inquiry';
import Alert from '../../../../../shared/components/Alert/Alert';
import { KAKAO_GIFT_TEMPLATE_ID, KAKAO_SHARE_KEY } from '../../../../../shared/configs/config';
import { logEventAction } from '../../../../../shared/reducers/amplitude.slice';
import { SelectMessageResendButton } from '../../../../../shared/amplitude/events';
import { useScreenName } from '../../../../../shared/hooks';

import { ScreenName } from '../../../../../shared/amplitude';

export default function OrderDetails() {
  useScreenName(ScreenName.GIFT_ORDER_DETAIL);

  const dispatch = useDispatch();
  const { orderDetails, messageTimeCheck } = useAppSelector(({ mypageGift }) => mypageGift);
  const {
    recipientName,
    groupOrderNo,
    externalGroupOrderNo,
    ordererName,
    notificationType,
    notificationSentCount,
    possibleNotificationSentCount,
    availableDate,
  } = orderDetails;
  const [isDisabledSend, setDisabledSend] = useState<boolean>(false);

  const handlekakaoTalkSend = () => {
    const kakao = window.Kakao;

    if (kakao) {
      if (!kakao.isInitialized()) {
        kakao.init(KAKAO_SHARE_KEY);
      }

      kakao.Link.sendCustom({
        templateId: KAKAO_GIFT_TEMPLATE_ID,
        templateArgs: {
          recipientName,
          ordererName,
          month: moment(availableDate).format('MM'),
          day: moment(availableDate).format('DD'),
          externalGroupOrderNo,
        },
        installTalk: true,
      });

      dispatch(logEventAction(new SelectMessageResendButton({ orderDetails })));
    }
  };

  const handleSmsSend = () => {
    dispatch(postResendMessage({ groupOrderNo, recipientName }));
  };

  const handleSendMessage = () => {
    if (notificationType === 'KAKAO_TALK') {
      if (isPC || !isMobileDevice) {
        Alert({
          text: '모바일 기기에서 다시 시도해주세요.',
        });
        return;
      }
      handlekakaoTalkSend();
      return;
    }

    dispatch(logEventAction(new SelectMessageResendButton({ orderDetails })));

    if (notificationSentCount >= possibleNotificationSentCount) {
      Alert({
        text: '메시지는 1일 2회까지 다시 보낼 수 있습니다',
      }).then(() => {
        setDisabledSend(true);
      });

      return;
    }

    handleSmsSend();
  };

  useEffect(() => {
    if (messageTimeCheck) {
      setTimeout(() => {
        dispatch(setMessageTimeCheck(false));
      }, 2000);
    }
  }, [messageTimeCheck, dispatch]);

  return (
    <>
      <GiftInfo />
      <Receiver />
      <PayInfo />
      <OrderInfo />
      <AdditionalInfo />
      <Inquiry isDiabledSend={messageTimeCheck || isDisabledSend} handleSendMessage={handleSendMessage} />
    </>
  );
}
