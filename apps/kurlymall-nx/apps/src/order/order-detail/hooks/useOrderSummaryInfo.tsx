import { useClickCopyOrderNo } from '../../common/hooks/useClickCopyOrderNo';
import { OrderDetail } from '../interface/OrderDetail';
import getDateAndTime from '../utils/getDateAndTime';

interface Props {
  paymentCompletedAt: OrderDetail['paymentCompletedAt'];
}

const useOrderSummaryInfo = ({ paymentCompletedAt }: Props) => {
  const { date, time } = getDateAndTime(paymentCompletedAt);
  const { handleClickCopyOrderNo } = useClickCopyOrderNo();

  return {
    date,
    time,
    handleClickCopyOrderNo,
  };
};

export default useOrderSummaryInfo;
