import QRCodeAlert from '../components/PickupInfo/QRCodeAlert';
import { usePickupRefundQRQuery } from '../queries/usePickupRefundQRQuery';
import RefundQRCodeErrorAlert from '../components/PaymentInfo/RefundQRCodeErrorAlert';
import useOrderDetailQuery from '../queries/useOrderDetailQuery';
import { PICKUP_STRATEGY } from '../../common/constants/PickupOrder';
import { PICKUP_STATUS } from '../../common/constants/PickupStatus';

interface Props {
  groupOrderNo: number;
}

export default function useShowRefundQRCode({ groupOrderNo }: Props) {
  const { data: orderDetail, refetch: refetchOrderDetail } = useOrderDetailQuery(groupOrderNo);

  const orderNo = orderDetail?.deliveryGroups?.[0]?.orderNos[0] ?? 0;

  const isQRPickupCompleted =
    orderDetail?.pickupOrderMeta?.pickupStrategy === PICKUP_STRATEGY.QR &&
    orderDetail?.pickupOrderMeta?.pickupStatus === PICKUP_STATUS.COMPLETED;

  const { data } = usePickupRefundQRQuery({ orderNo, isQRPickupCompleted });

  const openQRCodeModal = async () => {
    if (!data || !data.qrImage || !data.qrImageType) {
      await RefundQRCodeErrorAlert();
      refetchOrderDetail();
      return;
    }

    const { qrImage, qrImageType } = data;

    await QRCodeAlert({
      text: '환불 시, 상품을 픽업한 매장\n직원에게 QR코드를 보여주세요',
      qrImage,
      qrImageType,
    });
    refetchOrderDetail();
  };

  return {
    openQRCodeModal,
    isQRPickupCompleted,
  };
}
