import { useState } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

import { useAppSelector } from '../../../../../shared/store';

import { isMobileDevice, isPC } from '../../../../../../util/window/getDevice';
import { addComma } from '../../../../../shared/services';
import { GiftOrderStatusTextMap } from '../../constants/status';
import { GiftListItem } from '../../../../../shared/interfaces';
import { GIFT_PATH, INQUIRY_PATH, getPageUrl } from '../../../../../shared/constant';

import Alert from '../../../../../shared/components/Alert/Alert';
import { ButtonProps } from '../../../../../shared/components/Button/Button';
import ButtonGroup from '../../../../../shared/components/Button/ButtonGroup';
import ProductImage from '../../../../../shared/components/product/productImage/ProductImage';
import { redirectTo } from '../../../../../shared/reducers/page';
import { ArrowRight } from '../../../../../shared/icons';
import COLOR from '../../../../../shared/constant/colorset';

const Wrapper = styled.div`
  background: ${COLOR.kurlyWhite};
`;

const ProductName = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  color: ${COLOR.kurlyGray800};
  border-bottom: 1px solid ${COLOR.bg};
  cursor: pointer;

  div {
    display: block;
    overflow: hidden;
    max-width: 70vw;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  span {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: ${COLOR.kurlyGray450};
  }

  ${isPC
    ? css`
        margin: 0 20px;
        padding: 12px 0;
      `
    : css`
        padding: 12px 20px;
      `}
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding: 19px 20px 15px;
`;

const GiftInfo = styled.ul`
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
  color: #333;
  li {
    display: flex;
    padding-left: 70px;
    word-break: break-all;
  }
  li + li {
    padding-top: 3px;
  }
`;

const Desc = styled.em`
  display: inline-flex;
  flex-shrink: 0;
  width: 70px;
  font-style: normal;
  margin-left: -70px;
`;

const Text = styled.span`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
`;

const ButtonArea = styled.div`
  padding: 0 20px 20px;
  button span {
    font-size: 15px;
    font-weight: 600;
  }
`;

const imageStyle = css`
  flex-shrink: 0;
  margin-right: 20px;

  > span {
    border-radius: 4px;
  }
`;

interface Props {
  item: GiftListItem;
  handleOrderCancel(): void;
  handleKakaoTalkSend(gift: GiftListItem): void;
  handleSmsSend(gift: GiftListItem): void;
}

export default function GiftOrderItem({ item, handleOrderCancel, handleKakaoTalkSend, handleSmsSend }: Props) {
  const {
    notificationType,
    groupOrderNo,
    contentsProductName,
    paymentCompletedAt,
    recipientName,
    totalPaymentPrice,
    productVerticalSmallUrl,
    giftOrderStatus,
    notificationSentCount,
    possibleNotificationSentCount,
  } = item;

  const dispatch = useDispatch();
  const messageTimeCheck = useAppSelector(({ mypageGift }) => mypageGift.messageTimeCheck);
  const [isDisabledSend, setDisabledSend] = useState<boolean>(false);

  const handleMessage = () => {
    if (notificationType === 'KAKAO_TALK') {
      if (isPC || !isMobileDevice) {
        Alert({
          text: '모바일 기기에서 다시 시도해주세요.',
        });
        return;
      }
      handleKakaoTalkSend(item);
      return;
    }

    if (notificationSentCount >= possibleNotificationSentCount) {
      Alert({
        text: '메시지는 1일 2회까지 다시 보낼 수 있습니다',
      }).then(() => {
        setDisabledSend(true);
      });

      return;
    }

    handleSmsSend(item);
  };

  const moveInquiryPage = () => {
    dispatch(
      redirectTo({
        url: getPageUrl(INQUIRY_PATH.inquiry),
      }),
    );
  };

  const moveDetailPage = () => {
    dispatch(
      redirectTo({
        url: `${getPageUrl(GIFT_PATH.detail)}${groupOrderNo}`,
      }),
    );
  };

  const BASIC_RESPONSE: ButtonProps[] = [
    {
      text: '선물하기',
      theme: 'tertiary',
      onClick: () => {
        Alert({ text: '선물하기 기능은 컬리 앱을 이용해 주세요.' });
        return;
      },
      height: 44,
    },
    {
      text: '1:1문의',
      theme: 'tertiary',
      onClick: moveInquiryPage,
      height: 44,
    },
  ];

  const READY_FOR_ACCEPT: ButtonProps[] = [
    {
      text: '주문취소',
      theme: 'tertiary',
      onClick: handleOrderCancel,
      height: 44,
    },
    {
      text: '메시지 재전송',
      theme: 'tertiary',
      disabled: messageTimeCheck || isDisabledSend,
      onClick: handleMessage,
      height: 44,
    },
  ];

  const method = notificationType === 'SMS' ? '연락처' : '카카오톡';

  return (
    <Wrapper>
      <ProductName onClick={moveDetailPage}>
        <div>{contentsProductName}</div>
        <span>
          선물 상세 <ArrowRight stroke={COLOR.kurlyGray450} />
        </span>
      </ProductName>
      <Content>
        <ProductImage type="small" imageUrl={productVerticalSmallUrl} css={imageStyle} />
        <GiftInfo>
          <li>
            <Desc>받으실 분</Desc>
            <Text>
              {recipientName} ({method})
            </Text>
          </li>
          <li>
            <Desc>결제 일시</Desc>
            <Text>{format(new Date(paymentCompletedAt), 'yyyy-MM-dd HH:mm:ss')}</Text>
          </li>
          <li>
            <Desc>주문번호</Desc>
            <Text>{groupOrderNo}</Text>
          </li>
          <li>
            <Desc>결제 금액</Desc>
            <Text>{addComma(totalPaymentPrice)}원</Text>
          </li>
          <li>
            <Desc>선물 상태</Desc>
            <Text>{GiftOrderStatusTextMap[giftOrderStatus]}</Text>
          </li>
        </GiftInfo>
      </Content>
      {!isPC && (
        <ButtonArea>
          <ButtonGroup contents={giftOrderStatus === 'READY_FOR_ACCEPT' ? READY_FOR_ACCEPT : BASIC_RESPONSE} />
        </ButtonArea>
      )}
    </Wrapper>
  );
}
