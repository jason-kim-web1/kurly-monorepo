import { useSelfOrderCancel } from '../../common/hooks/useSelfOrderCancel';
import { ACTION_BUTTON_TEXT, ActionButtonText, ORDER_ACTION_BUTTONS } from '../constants/OrderActionButtonList';
import { useWriteRiview } from '../../common/hooks/useWriteReview';
import { OrderStatus } from '../../common/constants/OrderStatus';

interface Props {
  groupOrderNo: number;
  orderNos?: number[];
}

export const getButtonList = ({ orderStatus }: { orderStatus: OrderStatus }) => {
  return ORDER_ACTION_BUTTONS.filter(({ status }) => status === orderStatus);
};

export function useOrderActionButtons({ groupOrderNo, orderNos }: Props) {
  const { cancelOrderBySelf, isCancelLoading } = useSelfOrderCancel({ groupOrderNo, orderNos });
  const { writeReview } = useWriteRiview();

  const handleClickButton = async (text: ActionButtonText) => {
    switch (text) {
      case ACTION_BUTTON_TEXT.주문취소:
        return cancelOrderBySelf();
      case ACTION_BUTTON_TEXT.후기작성:
        return writeReview();
    }
  };

  return {
    isActionLoading: isCancelLoading,
    handleClickButton,
  };
}
