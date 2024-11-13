import useToggle from '../../checkout/shared/hooks/useToggle';
import { OrderDetail } from '../interface/OrderDetail';
import useOrderDetailQuery from '../queries/useOrderDetailQuery';
import { getPaymentMethodText } from '../utils/getPaymentMethodText';
import useShowRefundQRCode from './useShowRefundQRCode';

interface Props {
  groupOrderNo: OrderDetail['groupOrderNo'];
  payment: OrderDetail['payment'];
}

const usePaymentInfo = ({ groupOrderNo, payment }: Props) => {
  const { isOpen, toggleWithAmplitude } = useToggle(true);
  const { openQRCodeModal, isQRPickupCompleted } = useShowRefundQRCode({ groupOrderNo });
  const { data } = useOrderDetailQuery(groupOrderNo);
  const { totalUsedFreePoint, totalUsedPaidPoint, paymentGatewayId, paymentMethod, paymentGatewayIdDisplayName } =
    payment;

  const totalUsedPoint = totalUsedFreePoint + totalUsedPaidPoint;
  const paymentMethodText = getPaymentMethodText({ paymentGatewayId, paymentMethod, paymentGatewayIdDisplayName });
  const isAllOrdersCanceled = data?.deliveryGroups?.every(({ orderStatus }) => orderStatus === '취소완료') ?? false;

  return {
    isOpen,
    toggleWithAmplitude,
    payment,
    totalUsedPoint,
    paymentMethodText,
    isAllOrdersCanceled,
    shouldShowRefundGuideButton: isQRPickupCompleted,
    handleClickRefundGuideButton: openQRCodeModal,
  };
};

export default usePaymentInfo;
