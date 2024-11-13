import { format } from 'date-fns';

import useToggle from '../../checkout/shared/hooks/useToggle';
import { OrderDetail } from '../interface/OrderDetail';

const useOrderInfo = (paymentCompletedAt: OrderDetail['paymentCompletedAt']) => {
  const { isOpen, toggleWithAmplitude } = useToggle(true);

  const formattedPaymentCompletedAt = format(new Date(paymentCompletedAt), 'yyyy.MM.dd HH:mm:ss');

  return {
    isOpen,
    toggleWithAmplitude,
    formattedPaymentCompletedAt,
  };
};

export default useOrderInfo;
