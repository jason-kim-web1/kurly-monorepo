import React from 'react';
import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Order } from '../interface/OrderList';
import { GruopOrderCancelButton } from './GroupOrderCancelButton';
import { OrderActionButtons } from './OrderActionButtons';
import GroupOrderHeader from './GroupOrderHeader';
import OrderItemContent from './OrderItemContent';
import OrderStatusBar from '../../common/components/OrderStatusBar';
import Divider from '../../common/components/Divider';

const GroupOrderWrapper = styled.div<{ isGroupSelfCancelable: boolean }>`
  padding: ${vars.spacing.$16} ${vars.spacing.$16} ${vars.spacing.$20};
  background-color: ${vars.color.background.$background1};
  border-radius: ${vars.radius.$16};

  + div {
    margin-top: ${vars.spacing.$16};
  }

  ${({ isGroupSelfCancelable }) =>
    isGroupSelfCancelable &&
    `
    padding-bottom: 0px;
  `}
`;

export default function GroupOrderItem({ order }: { order: Order }) {
  const { groupOrderNo, paymentCompletedAt, deliveryGroups, isSelfCancelable: isGroupSelfCancelable } = order;

  return (
    <GroupOrderWrapper isGroupSelfCancelable={isGroupSelfCancelable}>
      {/* 주문 날짜/번호 */}
      <GroupOrderHeader paymentCompletedAt={paymentCompletedAt} groupOrderNo={groupOrderNo} />
      {deliveryGroups.map(
        (
          {
            dealProducts,
            deliveryPolicy,
            partnerName,
            orderStatus,
            deliveryMessage,
            orderNos,
            isSelfCancelable,
            reviewStatusType,
          },
          index,
        ) => (
          <React.Fragment key={`${groupOrderNo}-${index}`}>
            <Divider
              height="1px"
              width="100%"
              margin={index === 0 ? `${vars.spacing.$16} 0 ${vars.spacing.$20} 0` : `${vars.spacing.$20} 0`}
            />
            {/* 주문 상태 */}
            <OrderStatusBar orderStatus={orderStatus} deliveryMessage={deliveryMessage} />
            {/* 주문 상품 목록 */}
            <OrderItemContent dealProducts={dealProducts} deliveryPolicy={deliveryPolicy} partnerName={partnerName} />
            {/* 배송 상태에 따른 주문취소/후기작성 버튼 */}
            <OrderActionButtons
              orderStatus={orderStatus}
              groupOrderNo={groupOrderNo}
              orderNos={orderNos}
              isSelfCancelable={isSelfCancelable}
              reviewStatusType={reviewStatusType}
            />
          </React.Fragment>
        ),
      )}
      {/* 전체 주문 취소 */}
      {isGroupSelfCancelable && <GruopOrderCancelButton groupOrderNo={groupOrderNo} />}
    </GroupOrderWrapper>
  );
}
