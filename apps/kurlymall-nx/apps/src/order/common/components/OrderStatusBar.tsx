import styled from '@emotion/styled';
import { Typography } from '@thefarmersfront/kpds-react';
import { vars } from '@thefarmersfront/kpds-css';

import { ORDER_STATUS, OrderStatus } from '../constants/OrderStatus';
import { DeliveryGroup } from '../interface/DeliveryGroup';
import DeliveryCompletedImage from '../../order-detail/components/OrderDeliveryGroupList/DeliveryCompletedImage';

const Row = styled.div<{ hasDeliveryCompletedImageUrl: boolean }>`
  display: flex;
  margin-bottom: ${({ hasDeliveryCompletedImageUrl }) =>
    hasDeliveryCompletedImageUrl ? vars.spacing.$6 : vars.spacing.$16};
  justify-content: space-between;
`;

const ColoredText = styled(Typography)<{ orderStatus: OrderStatus }>`
  color: ${({ orderStatus }) =>
    orderStatus === ORDER_STATUS.취소접수 || orderStatus === ORDER_STATUS.취소완료
      ? vars.color.text.$secondary
      : vars.color.$purple800};

  &:first-of-type {
    margin-right: ${vars.spacing.$4};
  }

  &:nth-of-type(2) {
    margin-top: 3px;
  }
`;

const TextWrapper = styled.div<{ hasExtraMarginTop: boolean }>`
  display: inline-flex;
  margin-top: ${({ hasExtraMarginTop }) => hasExtraMarginTop && vars.spacing.$4};
`;

interface Props {
  orderStatus: DeliveryGroup['orderStatus'];
  deliveryMessage: DeliveryGroup['deliveryMessage'];
  deliveryCompletedImageUrl?: DeliveryGroup['deliveryCompletedImageUrl'];
  hasExtraMarginTop?: boolean;
}

const OrderStatusBar = ({
  orderStatus,
  deliveryMessage,
  deliveryCompletedImageUrl,
  hasExtraMarginTop = false,
}: Props) => {
  return (
    <Row hasDeliveryCompletedImageUrl={!!deliveryCompletedImageUrl}>
      <TextWrapper hasExtraMarginTop={hasExtraMarginTop}>
        <ColoredText variant={'$xxlargeSemibold'} orderStatus={orderStatus}>
          {orderStatus}
        </ColoredText>
        {deliveryMessage && (
          <ColoredText variant={'$largeRegular'} orderStatus={orderStatus}>
            {deliveryMessage}
          </ColoredText>
        )}
      </TextWrapper>
      {deliveryCompletedImageUrl && <DeliveryCompletedImage deliveryCompletedImageUrl={deliveryCompletedImageUrl} />}
    </Row>
  );
};

export default OrderStatusBar;
