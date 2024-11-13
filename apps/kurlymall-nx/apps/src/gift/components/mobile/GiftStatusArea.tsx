import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import { css } from '@emotion/react';

import COLOR from '../../../shared/constant/colorset';
import { AppState } from '../../../shared/store';

import ProductImage from '../../../shared/components/product/productImage/ProductImage';

const GiftStatus = styled.div`
  position: relative;
  text-align: center;
  padding: 0 20px;
`;

const Status = styled.div`
  max-width: 335px;
  padding: 30px 20px 11px;
  margin: 0 auto;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #333;
`;

const ProductName = styled.strong`
  display: block;
  max-width: 280px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 18px;
  color: #333;
  font-weight: normal;
  text-align: center;
`;

const OptionName = styled.span`
  display: block;
  max-width: 280px;
  margin: 0 auto;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const OrderNumber = styled.p`
  padding-top: 6px;
  font-size: 12px;
  line-height: 16px;
  color: #333;
`;

const Count = styled.span`
  display: inline-block;
  color: #666;
  :before {
    display: inline-block;
    margin: 2px 6px 0;
    width: 1px;
    height: 12px;
    background: #ddd;
    vertical-align: top;
    content: '';
  }
`;

const statusResult: any = {
  READY_FOR_ACCEPT: '선물이 도착했습니다.',
  ACCEPTED: '선물을 수락했습니다.',
  DELIVERED: '선물을 수락했습니다.',
  REJECTED: '선물을 거절했습니다.',
  CANCELED: '선물이 취소되었습니다.',
};

const imageStyle = css`
  display: block;
  overflow: hidden;
  border-radius: 4px;
  margin: 0 auto 20px;
`;

export default function GiftStatusArea() {
  const {
    ordererName,
    status,
    dealProducts: { dealProductName, productVerticalSmallUrl, contentProductName, quantity },
    orderNo,
  } = useSelector(({ gift }: AppState) => gift.receiver);

  return (
    <GiftStatus>
      <Status>
        {ordererName}
        님이 보내신
        <br /> {statusResult[status]}
      </Status>
      <ProductImage type={'giftReceiver'} imageUrl={productVerticalSmallUrl} css={imageStyle} />
      <ProductName>{contentProductName}</ProductName>
      {dealProductName && <OptionName>{dealProductName}</OptionName>}
      <OrderNumber>
        주문번호 {orderNo}
        {quantity && <Count>{quantity}개</Count>}
      </OrderNumber>
    </GiftStatus>
  );
}
