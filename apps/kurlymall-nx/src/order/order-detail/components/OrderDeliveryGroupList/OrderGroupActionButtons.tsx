import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Button } from '@thefarmersfront/kpds-react';
import { vars } from '@thefarmersfront/kpds-css';
import { isEmpty } from 'lodash';

import { OrderStatus } from '../../../common/constants/OrderStatus';
import { useSelfOrderCancel } from '../../../common/hooks/useSelfOrderCancel';
import { useWriteRiview } from '../../../common/hooks/useWriteReview';
import { DeliveryGroup, DeliveryPolicy } from '../../../common/interface/DeliveryGroup';
import Progress from '../../../../shared/icons/kpds/progress';
import { REVIEW_STATUS, ReviewStatus } from '../../../common/constants/ReviewStatus';
import DeliveryTrackingButton from './DeliveryTrackingButton';

const Wrapper = styled.div`
  display: flex;

  > button + button {
    margin-left: ${vars.spacing.$6};
  }
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

const ActionButton = ({
  children,
  onClick,
  type = 'secondary',
  disabled = false,
}: {
  children: ReactNode;
  onClick: VoidFunction;
  disabled?: boolean;
  type?: 'primary' | 'secondary';
}) => {
  return (
    <FullWidthButton
      _type={type}
      _style="fill"
      color="light"
      size="large"
      shape="square"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </FullWidthButton>
  );
};

interface Props {
  orderStatus: OrderStatus;
  groupOrderNo: number;
  orderNos: number[];
  deliveryPolicy: DeliveryPolicy;
  isSelfCancelable: boolean;
  reviewStatusType: ReviewStatus;
  invoices?: DeliveryGroup['invoices'];
}

// 주문그룹 기준의 액션 버튼
const OrderGroupActionButtons = ({
  orderStatus,
  groupOrderNo,
  orderNos,
  isSelfCancelable,
  reviewStatusType,
  invoices,
}: Props) => {
  const { cancelOrderBySelf, isCancelLoading } = useSelfOrderCancel({ groupOrderNo, orderNos });
  const { writeReview } = useWriteRiview();

  // 주문 그룹 기준의 배송조회 버튼 노출 여부
  const showDeliveryTrackingButton = !isEmpty(invoices);
  const showReviewButton = reviewStatusType === REVIEW_STATUS.WRITABLE;
  const hasButtonToShowWhenDeliveryCompleted = showDeliveryTrackingButton || showReviewButton;

  if (orderStatus === '주문완료' && isSelfCancelable) {
    return (
      <Wrapper>
        <ActionButton disabled={isCancelLoading} onClick={cancelOrderBySelf}>
          {isCancelLoading ? <Progress type="white" /> : '주문취소'}
        </ActionButton>
      </Wrapper>
    );
  }

  if (orderStatus === '배송중' && showDeliveryTrackingButton) {
    return (
      <Wrapper>
        <DeliveryTrackingButton invoices={invoices} />
      </Wrapper>
    );
  }

  if (orderStatus === '배송완료' && hasButtonToShowWhenDeliveryCompleted) {
    return (
      <Wrapper>
        {showDeliveryTrackingButton && <DeliveryTrackingButton invoices={invoices} />}
        {showReviewButton && (
          <ActionButton type="primary" onClick={writeReview}>
            후기작성
          </ActionButton>
        )}
      </Wrapper>
    );
  }

  return null;
};

export default OrderGroupActionButtons;
