import { isUndefined } from 'lodash';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { vars } from '@thefarmersfront/kpds-css';

import AdditionalInfo from './AdditionalInfo';
import CancelAllOrders from './CancelAllOrders';
import DeliveryInfo from './DeliveryInfo';
import OrderDeliveryGroupList from './OrderDeliveryGroupList/OrderDeliveryGroupList';
import OrderInfo from './OrderInfo';
import OrderSummaryInfo from './OrderSummaryInfo';
import PaymentInfo from './PaymentInfo/PaymentInfo';
import Progress from '../../../shared/icons/kpds/progress';
import PickupInfo from './PickupInfo/PickupInfo';
import useOrderDetailQuery from '../queries/useOrderDetailQuery';
import { isNotNull } from '../../../shared/utils/typeGuard';
import JoinOrderInfo from './JoinOrderInfo';
import { isPC } from '../../../../util/window/getDevice';
import COLOR from '../../../shared/constant/colorset';
import Divider from '../../common/components/Divider';

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${isPC
    ? css`
        height: 700px;
        background-color: ${vars.color.$white};
        border-radius: ${vars.radius.$16};
        margin-top: ${vars.spacing.$16};
      `
    : css`
        height: calc(100vh - 44px);
      `}
`;

const HeaderWrapper = styled.div<{ isLoading: boolean }>`
  padding: ${({ isLoading }) => (isLoading ? '25px 20px 16px 20px' : '25px 20px 0 20px')};
  background-color: ${COLOR.kurlyWhite};
  border-radius: ${({ isLoading }) =>
    isLoading ? `${vars.radius.$16}` : `${vars.radius.$16} ${vars.radius.$16} 0 0`}; ;
`;

const Title = styled.div`
  padding-bottom: 20px;
  color: ${COLOR.kurlyGray800};
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
`;

const ContentWrapper = styled.div`
  ${!isPC &&
  css`
    padding: ${vars.spacing.$16} ${vars.spacing.$16} calc(24px + env(safe-area-inset-bottom)) ${vars.spacing.$16};
    background-color: ${vars.color.background.$background2};
  `};
`;

const ContentHeader = ({ isLoading = false }: { isLoading?: boolean }) => (
  <HeaderWrapper isLoading={isLoading}>
    <Title>주문 내역 상세</Title>
    <Divider width="100%" height="2px" color={COLOR.kurlyGray800} />
  </HeaderWrapper>
);

interface Props {
  groupOrderNo: number;
}

const OrderDetail = ({ groupOrderNo }: Props) => {
  const { data, isLoading } = useOrderDetailQuery(groupOrderNo);

  if (isUndefined(data) || isLoading) {
    if (isPC) {
      return (
        <>
          <ContentWrapper>
            <ContentHeader isLoading={true} />
          </ContentWrapper>
          <LoadingWrapper>
            <Progress type="overlay" />
          </LoadingWrapper>
        </>
      );
    }
    return (
      <LoadingWrapper>
        <Progress type="overlay" />
      </LoadingWrapper>
    );
  }

  const {
    paymentCompletedAt,
    receiver,
    deliveryGroups,
    payment,
    receipt,
    ordererName,
    isSelfCancelable,
    pickupOrderMeta,
    joinOrderMeta,
  } = data;

  return (
    <ContentWrapper>
      {isPC && <ContentHeader />}
      <OrderSummaryInfo
        groupOrderNo={groupOrderNo}
        paymentCompletedAt={paymentCompletedAt}
        address={receiver.address}
      />
      <OrderDeliveryGroupList groupOrderNo={groupOrderNo} deliveryGroups={deliveryGroups} />
      {!isPC && isNotNull(pickupOrderMeta) && (
        <PickupInfo groupOrderNo={groupOrderNo} pickupOrderMeta={pickupOrderMeta} />
      )}
      {isNotNull(joinOrderMeta) && <JoinOrderInfo joinOrderMeta={joinOrderMeta} />}
      <PaymentInfo groupOrderNo={groupOrderNo} payment={payment} receipt={receipt} />
      <OrderInfo groupOrderNo={groupOrderNo} paymentCompletedAt={paymentCompletedAt} ordererName={ordererName} />
      <DeliveryInfo receiver={receiver} />
      <AdditionalInfo deliveryMessageTimeType={receiver.deliveryMessageTimeType} />
      <CancelAllOrders groupOrderNo={groupOrderNo} isSelfCancelable={isSelfCancelable} />
    </ContentWrapper>
  );
};

export default OrderDetail;
