import moment from 'moment';

import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { css } from '@emotion/react';

import { useCallback } from 'react';

import { AppState } from '../../../../shared/store';
import { getPageUrl, GiftStatus, PRODUCT_PATH } from '../../../../shared/constant';
import COLOR from '../../../../shared/constant/colorset';

import ProductImage from '../../../../shared/components/product/productImage/ProductImage';
import { redirectTo } from '../../../../shared/reducers/page';

const Wrapper = styled.div`
  padding: 10px 20px 30px;
  text-align: center;
`;

const GiftDate = styled.div`
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  font-weight: 600;
  color: ${COLOR.kurlyGray800};
`;

const Type = styled.span`
  display: inline-block;
  margin-right: 5px;
`;

const Status = styled.div`
  max-width: 335px;
  padding: 30px 20px 17px;
  margin: 0 auto;
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  color: ${COLOR.kurlyGray800};
  letter-spacing: 0.025em;
`;

const Text = styled.span<{ status: GiftStatus }>`
  color: #5f0080;
  ${({ status }) => (status === 'REJECTED' || status === 'CANCELED') && `color: ${COLOR.invalidRed};`}
`;

const ProductWrapper = styled.div`
  padding-bottom: 20px;
  text-align: center;
  max-width: 280px;
  margin: 0 auto;
`;

const ProductName = styled.strong`
  font-size: 16px;
  line-height: 24px;
  color: #333;
  font-weight: 600;
  text-align: center;
`;

const OptionName = styled.span`
  display: block;
  padding-top: 4px;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const OrderNumber = styled.p`
  padding-top: 14px;
  font-size: 12px;
  line-height: 16px;
  color: #666;
`;

const Count = styled.span`
  &:before {
    display: inline-block;
    width: 1px;
    height: 12px;
    margin: 0 6px;
    vertical-align: top;
    background: #ddd;
    content: '';
  }
`;

const statusResult: Record<GiftStatus, [string, string, string]> = {
  READY_FOR_ACCEPT: ['선물이', '도착', '했습니다.'],
  ACCEPTED: ['선물을', '수락', '했습니다.'],
  DELIVERED: ['선물을', '수락', '했습니다.'],
  REJECTED: ['선물을', '거절', '했습니다.'],
  CANCELED: ['선물이', '취소', '되었습니다.'],
};

export default function GiftReceiveArea() {
  const dispatch = useDispatch();

  const {
    ordererName,
    status,
    dealProducts: { dealProductNo, dealProductName, dealProductImageUrl, contentProductName, quantity },
    giftSentDateTime,
    giftAcceptedDateTime,
    giftCanceledDateTime,
    giftRejectedDateTime,
    orderNo,
  } = useSelector(({ gift }: AppState) => gift.receiver);

  const StatusResultText = useCallback(
    () => (
      <>
        {statusResult[status][0]} <Text status={status}>{statusResult[status][1]}</Text>
        {statusResult[status][2]}
      </>
    ),
    [status],
  );

  const statusTime: Record<GiftStatus, number | null> = {
    READY_FOR_ACCEPT: giftAcceptedDateTime,
    ACCEPTED: giftAcceptedDateTime,
    DELIVERED: giftAcceptedDateTime,
    REJECTED: giftRejectedDateTime,
    CANCELED: giftCanceledDateTime,
  };

  const moveProductPage = () => {
    dispatch(
      redirectTo({
        url: `${getPageUrl(PRODUCT_PATH.detail)}/${dealProductNo}`,
      }),
    );
  };

  const imageStyle = css`
    display: block;
    margin: 0 auto 14px;
  `;

  return (
    <Wrapper>
      <Status>
        {ordererName}
        님이 보내신
        <br />
        <StatusResultText />
      </Status>
      <ProductImage type={'giftReceiverResult'} imageUrl={dealProductImageUrl} css={imageStyle} />
      <ProductWrapper onClick={moveProductPage}>
        <ProductName>{contentProductName}</ProductName>
        {dealProductName && <OptionName>{dealProductName}</OptionName>}
      </ProductWrapper>
      <GiftDate>
        <Type>선물 발신일</Type>
        {moment(giftSentDateTime).format('YYYY. MM. DD')}
        <br />
        <Type>선물 {statusResult[status][1]}일</Type>
        {moment(statusTime[status] || new Date()).format('YYYY. MM. DD')}
      </GiftDate>
      <OrderNumber>
        주문번호 {orderNo}
        <Count>{quantity}개</Count>
      </OrderNumber>
    </Wrapper>
  );
}
