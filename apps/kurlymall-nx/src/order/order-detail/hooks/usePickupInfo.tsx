import { SweetAlertResult } from 'sweetalert2';

import useToggle from '../../checkout/shared/hooks/useToggle';
import getPickupDate from '../../checkout/shared/utils/getPickupDate';
import { PickupOrderMeta } from '../../common/interface/PickupOrderMeta';
import getSelectedPickupPlaceText from '../../shared/shared/utils/getSelectedPickupPlaceText';
import { OrderDetail } from '../interface/OrderDetail';
import usePickupCompleteMutation from '../queries/usePickupCompleteMutation';
import useShowQRCode from './useShowQRCode';
import { PickupCompleteAlert } from '../../../shared/components/Alert/PickupCompleteAlert';
import useOrderDetailQuery from '../queries/useOrderDetailQuery';
import { PICKUP_STRATEGY } from '../../common/constants/PickupOrder';

interface Props {
  groupOrderNo: OrderDetail['groupOrderNo'];
  pickupOrderMeta: PickupOrderMeta;
}

const usePickupInfo = ({ groupOrderNo, pickupOrderMeta }: Props) => {
  const { qrImage, qrImageType, startDate, endDate, pickupStrategy } = pickupOrderMeta;

  const { isOpen, toggleWithAmplitude } = useToggle(true);
  const { isLoading: isLoadingToCompletePickup, mutate } = usePickupCompleteMutation(groupOrderNo);
  const { isLoading: isLoadingToGetOrderDetail, data, refetch } = useOrderDetailQuery(groupOrderNo);

  const { showQRCode } = useShowQRCode({
    qrImage,
    qrImageType,
    callback: refetch,
    text: 'QR코드를\n매장 직원에게 보여주세요',
  });

  const pickupPlaceText = getSelectedPickupPlaceText({
    place: pickupOrderMeta,
    pickupDate: getPickupDate({
      startDate,
      endDate,
    }),
  });

  const completePickup = async () => {
    const productName = data?.deliveryGroups[0].dealProducts[0].dealProductName ?? '';
    const { isConfirmed }: SweetAlertResult = await PickupCompleteAlert({ productName });
    if (isConfirmed) {
      mutate();
    }
  };

  const handleClick = pickupStrategy === PICKUP_STRATEGY.COMMON ? completePickup : showQRCode;

  return {
    pickupPlaceText,
    isOpen,
    toggleWithAmplitude,
    isLoading: isLoadingToGetOrderDetail || isLoadingToCompletePickup,
    handleClick,
  };
};

export default usePickupInfo;
