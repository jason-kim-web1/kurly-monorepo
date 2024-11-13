import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../../shared/store';
import { selectCardInstantPoint } from '../reducers/checkout-payment.slice';

export default function usePlccPoint() {
  const dispatch = useDispatch();
  const { selectedPlccPoint, isPLCCExisted } = useAppSelector(({ checkoutPayment }) => ({
    selectedPlccPoint: checkoutPayment.selectedPlccPoint,
    isPLCCExisted: checkoutPayment.isPLCCExisted,
  }));

  const handlePointCheckbox = () => {
    dispatch(selectCardInstantPoint());
  };

  return {
    isPLCCExisted,
    selectedPlccPoint,
    handlePointCheckbox,
  };
}
