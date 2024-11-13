import styled from '@emotion/styled';

import { useRouter } from 'next/router';
import { format } from 'date-fns';

import { ParsedUrlQuery } from 'querystring';

import { KAKAO_GIFT_TEMPLATE_ID } from '../../../../shared/configs/config';
import { useAppSelector } from '../../../../shared/store';

import COLOR from '../../../../shared/constant/colorset';

import useLoadKakao from '../../../../shared/hooks/useLoadKakao';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectGiftKakaoButton } from '../../../../shared/amplitude/events';

import KakaoTalkIconImg from '../../../../shared/components/icons/order/gift/KakaoTalkIconImg';

const KakaoButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 52px;
  margin-top: 24px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: ${COLOR.kakaoText};
  border-radius: 30px;
  background-color: ${COLOR.kakaoBtn};
`;

const KakaoText = styled.p`
  margin-left: 6px;
`;

export default function GiftKakaoButton() {
  const router = useRouter();

  useLoadKakao();
  const {
    paymentsResult: { recipientName, name: ordererName, availableDate, externalGroupOrderNo: externalOrderNo },
  } = useAppSelector(({ payments }) => payments);

  const { orderNo } = router.query as ParsedUrlQuery & {
    orderNo: string;
    kurlyPass?: boolean;
    gift?: boolean;
  };

  const handleKakaoMessage = () => {
    const kakao = window.Kakao;

    if (!kakao) {
      return;
    }

    kakao.Share.sendCustom({
      templateId: KAKAO_GIFT_TEMPLATE_ID,
      templateArgs: {
        externalOrderNo,
        recipientName,
        ordererName,
        month: format(new Date(availableDate), 'MM'),
        day: format(new Date(availableDate), 'dd'),
      },
      installTalk: true,
    });

    amplitudeService.logEvent(
      new SelectGiftKakaoButton({
        orderNo: Number(orderNo),
      }),
    );
  };

  return (
    <KakaoButton onClick={handleKakaoMessage}>
      <KakaoTalkIconImg />
      <KakaoText>받으실 분 선택하기</KakaoText>
    </KakaoButton>
  );
}
