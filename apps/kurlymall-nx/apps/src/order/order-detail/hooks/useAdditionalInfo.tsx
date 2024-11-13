import { DeliveryCompleteMessageTextMap } from '../../../shared/constant';
import useToggle from '../../checkout/shared/hooks/useToggle';
import { OrderDetail } from '../interface/OrderDetail';

const useAdditionalInfo = (deliveryMessageTimeType: OrderDetail['receiver']['deliveryMessageTimeType']) => {
  const { isOpen, toggleWithAmplitude } = useToggle(true);
  const deliveryMessageTimeText = DeliveryCompleteMessageTextMap[deliveryMessageTimeType];

  return {
    deliveryMessageTimeText,
    isOpen,
    toggleWithAmplitude,
  };
};

export default useAdditionalInfo;
